import createHttpError from 'http-errors';
import { OrderRepository } from '../repositories/order.repository';
import { ProductRepository } from '../repositories/product.repository';
import { ProductVariantRepository } from '../repositories/product-variant.repository';
import { generateOrderNumber } from '../utils/order';
import { getPagination } from '../utils/pagination';
import { parseBigIntId, parseOptionalBigIntId } from '../utils/id';
import { prisma } from '../config/prisma';

function generateReturnRequestNumber() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `RET-${stamp}-${random}`;
}

export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly variantRepository: ProductVariantRepository
  ) {}

  async list(query: Record<string, unknown>) {
    const { page, limit, skip } = getPagination(Number(query.page || 1), Number(query.limit || 10));
    const status = query.status ? String(query.status) : undefined;
    const paymentStatus = query.paymentStatus ? String(query.paymentStatus) : undefined;

    const where = {
      ...(status ? { status } : {}),
      ...(paymentStatus ? { paymentStatus } : {})
    };

    const [items, total] = await Promise.all([
      this.repository.findMany({
        where,
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      this.repository.count(where)
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getById(id: string) {
    const order = await this.repository.findUnique({ id: parseBigIntId(id) }, { items: true });
    if (!order) {
      throw createHttpError(404, 'Order not found');
    }
    return order;
  }

  async listForCustomer(email: string) {
    return this.repository.findMany({
      where: { customerEmail: { equals: email, mode: 'insensitive' } },
      include: {
        items: {
          include: {
            returnItems: {
              include: {
                returnRequest: true
              }
            }
          }
        },
        returns: {
          include: { items: true },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(payload: Record<string, any>) {
    const orderPayload = payload as Record<string, unknown> & {
      items: Array<{ productId: string; variantId?: string; fabricId?: string; quantity: number }>;
      shippingTotal?: number;
      taxTotal?: number;
    };

    const items = await Promise.all(
      orderPayload.items.map(async (item) => {
        const product = await this.productRepository.findUnique(
          {
            id: parseBigIntId(item.productId),
            deletedAt: null,
            isActive: true
          },
          {
            variants: {
              where: { isActive: true },
              orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }]
            },
            images: {
              include: { fabric: true },
              orderBy: [{ sortOrder: 'asc' }]
            }
          }
        );
        if (!product) {
          throw createHttpError(404, `Product not found: ${item.productId}`);
        }

        const variant = item.variantId
          ? ((await this.variantRepository.findUnique({
              id: parseBigIntId(item.variantId),
              isActive: true
            })) as any)
          : (product as any).variants?.[0] ?? null;
        const productRecord = product as any;
        const fabricId = parseOptionalBigIntId(item.fabricId);

        if (variant && variant.productId !== productRecord.id) {
          throw createHttpError(422, `Variant does not belong to product: ${item.productId}`);
        }

        const selectedCoverImage = fabricId
          ? productRecord.images?.find(
              (image: any) => image.imageType === 'COVER' && image.fabricId === fabricId
            )
          : undefined;
        if (fabricId && !selectedCoverImage) {
          throw createHttpError(422, `Selected fabric is not available for ${productRecord.name}`);
        }

        const fallbackImage = productRecord.images?.find(
          (image: any) => image.imageType !== 'COVER'
        );
        const productImage = selectedCoverImage?.imagePath ?? fallbackImage?.imagePath;
        const fabric = selectedCoverImage?.fabric;

        if (variant && Number(variant.stock) < item.quantity) {
          throw createHttpError(422, `Only ${variant.stock} item(s) available for ${productRecord.name}`);
        }

        const unitPrice = Number(variant?.price ?? productRecord.basePrice);

        return {
          productId: productRecord.id,
          variantId: variant?.id,
          fabricId,
          productName: productRecord.name,
          variantName: variant?.size,
          fabricName: fabric?.name,
          sku: variant?.sku,
          quantity: item.quantity,
          productImage,
          unitPrice,
          total: unitPrice * item.quantity
        };
      })
    );

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const grandTotal = subtotal;

    return this.repository.create(
      {
        customerName: orderPayload.customerName,
        customerEmail: orderPayload.customerEmail,
        orderNumber: generateOrderNumber(),
        subtotal,
        grandTotal,
        status: orderPayload.status,
        paymentStatus: orderPayload.paymentStatus,
        items: {
          create: items
        }
      },
      {
        items: {
          include: {
            product: {
              include: {
                images: { orderBy: { sortOrder: 'asc' } }
              }
            }
          }
        }
      }
    );
  }

  checkout(payload: Record<string, any>) {
    return this.create({
      ...payload,
      status: 'PENDING',
      paymentStatus: 'PENDING'
    });
  }

  async createReturnRequest(email: string, payload: Record<string, any>) {
    const orderId = parseBigIntId(payload.orderId);
    const order = (await this.repository.findUnique(
      {
        id: orderId,
        customerEmail: { equals: email, mode: 'insensitive' }
      },
      { items: true }
    )) as any;

    if (!order) {
      throw createHttpError(404, 'Order not found');
    }

    const requestedItems = payload.items as Array<{
      orderItemId: string;
      quantity: number;
      reason?: string;
      condition?: string;
      images?: unknown;
    }>;

    const items = requestedItems.map((item) => {
      const orderItemId = parseBigIntId(item.orderItemId);
      const orderItem = order.items.find((existing: any) => existing.id === orderItemId);

      if (!orderItem) {
        throw createHttpError(422, 'Return item does not belong to this order');
      }

      if (item.quantity > orderItem.quantity) {
        throw createHttpError(422, `Return quantity cannot exceed ordered quantity for ${orderItem.productName}`);
      }

      const unitPrice = Number(orderItem.unitPrice);

      return {
        orderItemId,
        quantity: item.quantity,
        reason: item.reason,
        condition: item.condition,
        images: item.images,
        refundAmount: unitPrice * item.quantity
      };
    });

    const refundAmount = items.reduce((sum, item) => sum + item.refundAmount, 0);

    return prisma.returnRequest.create({
      data: {
        orderId,
        requestNumber: generateReturnRequestNumber(),
        reason: payload.reason,
        customerRemarks: payload.customerRemarks,
        refundAmount,
        items: {
          create: items
        }
      },
      include: {
        items: {
          include: {
            orderItem: true
          }
        },
        order: true
      }
    });
  }

  async update(id: string, payload: Record<string, unknown>) {
    await this.getById(id);
    return this.repository.update({ id: parseBigIntId(id) }, payload, { items: true });
  }

  async remove(id: string) {
    await this.getById(id);
    return this.repository.delete({ id: parseBigIntId(id) });
  }
}
