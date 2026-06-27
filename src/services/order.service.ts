import createHttpError from 'http-errors';
import { OrderRepository } from '../repositories/order.repository';
import { ProductRepository } from '../repositories/product.repository';
import { ProductVariantRepository } from '../repositories/product-variant.repository';
import { generateOrderNumber } from '../utils/order';
import { getPagination } from '../utils/pagination';

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
      deletedAt: null,
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
    const order = await this.repository.findUnique({ id, deletedAt: null }, { items: true });
    if (!order) {
      throw createHttpError(404, 'Order not found');
    }
    return order;
  }

  async create(payload: Record<string, any>) {
    const orderPayload = payload as Record<string, unknown> & {
      items: Array<{ productId: string; variantId?: string; quantity: number }>;
      shippingTotal?: number;
      taxTotal?: number;
    };

    const items = await Promise.all(
      orderPayload.items.map(async (item) => {
        const product = await this.productRepository.findUnique({ id: item.productId, deletedAt: null });
        if (!product) {
          throw createHttpError(404, `Product not found: ${item.productId}`);
        }

        const variant = item.variantId
          ? ((await this.variantRepository.findUnique({ id: item.variantId, deletedAt: null })) as any)
          : null;
        const productRecord = product as any;

        const unitPrice = Number(variant?.price ?? productRecord.basePrice);

        return {
          productId: productRecord.id,
          variantId: variant?.id,
          productName: productRecord.name,
          sku: variant?.sku,
          quantity: item.quantity,
          unitPrice,
          total: unitPrice * item.quantity
        };
      })
    );

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const shippingTotal = Number(orderPayload.shippingTotal || 0);
    const taxTotal = Number(orderPayload.taxTotal || 0);
    const grandTotal = subtotal + shippingTotal + taxTotal;

    return this.repository.create(
      {
        ...orderPayload,
        orderNumber: generateOrderNumber(),
        subtotal,
        shippingTotal,
        taxTotal,
        grandTotal,
        items: {
          create: items
        }
      },
      { items: true }
    );
  }

  async update(id: string, payload: Record<string, unknown>) {
    await this.getById(id);
    return this.repository.update({ id }, payload, { items: true });
  }

  async remove(id: string) {
    await this.getById(id);
    return this.repository.update({ id }, { deletedAt: new Date() });
  }
}
