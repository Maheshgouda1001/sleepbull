import createHttpError from 'http-errors';
import { ProductRepository } from '../repositories/product.repository';
import { ProductVariantRepository } from '../repositories/product-variant.repository';
import { ProductImageRepository } from '../repositories/product-image.repository';
import { getPagination } from '../utils/pagination';
import { parseBigIntId, parseOptionalBigIntId } from '../utils/id';
import { toSlug } from '../utils/slug';

const productIncludes = {
  category: true,
  images: { orderBy: { sortOrder: 'asc' as const } },
  variants: { where: { isActive: true }, orderBy: { createdAt: 'asc' as const } },
  specifications: { orderBy: { sortOrder: 'asc' as const } }
};

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly variantRepository: ProductVariantRepository,
    private readonly imageRepository: ProductImageRepository
  ) {}

  async list(query: Record<string, unknown>) {
    const { page, limit, skip } = getPagination(Number(query.page || 1), Number(query.limit || 10));
    const search = String(query.search || '').trim();
    const categoryId = parseOptionalBigIntId(query.categoryId);
    const isActive =
      typeof query.isActive === 'string' ? query.isActive === 'true' : query.isActive ?? undefined;
    const sortBy = String(query.sortBy || 'createdAt');
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

    const where: Record<string, unknown> = {
      deletedAt: null,
      ...(categoryId !== undefined ? { categoryId } : {}),
      ...(typeof isActive === 'boolean' ? { isActive } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { slug: { contains: search, mode: 'insensitive' } },
              { shortDescription: { contains: search, mode: 'insensitive' } }
            ]
          }
        : {})
    };

    const [items, total] = await Promise.all([
      this.repository.findMany({
        where,
        include: productIncludes,
        orderBy: { [sortBy]: sortOrder },
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

  async getByIdOrSlug(identifier: string) {
    const numericId = /^\d+$/.test(identifier) ? parseBigIntId(identifier) : undefined;

    const product = await this.repository.findUnique(
      {
        deletedAt: null,
        OR: [...(numericId !== undefined ? [{ id: numericId }] : []), { slug: identifier }]
      },
      productIncludes
    );

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    return product;
  }

  create(payload: Record<string, unknown>) {
    const productPayload = payload as Record<string, unknown> & {
      variants?: Array<Record<string, unknown>>;
      specifications?: Array<Record<string, unknown>>;
      name: string;
      slug?: string;
    };
    const { variants = [], specifications = [], ...rest } = productPayload;

    return this.repository.create(
      {
        ...rest,
        slug: rest.slug || toSlug(String(rest.name)),
        variants: variants.length ? { create: variants } : undefined,
        specifications: specifications.length ? { create: specifications } : undefined
      },
      {
        category: true,
        variants: true,
        specifications: true
      }
    );
  }

  async update(id: string, payload: Record<string, unknown>) {
    await this.getByIdOrSlug(id);

    const productPayload = payload as Record<string, unknown> & { name?: string; slug?: string };

    return this.repository.update(
      { id: parseBigIntId(id) },
      {
        ...productPayload,
        ...(productPayload.name && !productPayload.slug
          ? { slug: toSlug(String(productPayload.name)) }
          : {})
      },
      productIncludes
    );
  }

  async remove(id: string) {
    await this.getByIdOrSlug(id);
    return this.repository.update(
      { id: parseBigIntId(id) },
      { deletedAt: new Date(), isActive: false }
    );
  }

  async createVariant(productId: string, payload: Record<string, unknown>) {
    await this.getByIdOrSlug(productId);
    return this.variantRepository.create({
      ...payload,
      productId: parseBigIntId(productId)
    });
  }

  async updateVariant(id: string, payload: Record<string, unknown>) {
    const variant = await this.variantRepository.findUnique({
      id: parseBigIntId(id),
      isActive: true
    });
    if (!variant) {
      throw createHttpError(404, 'Product variant not found');
    }
    return this.variantRepository.update({ id: parseBigIntId(id) }, payload);
  }

  async deleteVariant(id: string) {
    const variant = await this.variantRepository.findUnique({
      id: parseBigIntId(id),
      isActive: true
    });
    if (!variant) {
      throw createHttpError(404, 'Product variant not found');
    }
    return this.variantRepository.update(
      { id: parseBigIntId(id) },
      { isActive: false }
    );
  }

  async reorderImages(productId: string, imageIds: string[]) {
    await this.getByIdOrSlug(productId);

    await Promise.all(
      imageIds.map((imageId, index) =>
        this.imageRepository.update({ id: parseBigIntId(imageId) }, { sortOrder: index + 1 })
      )
    );

    return this.repository.findUnique(
      { id: parseBigIntId(productId), deletedAt: null },
      {
        images: { orderBy: { sortOrder: 'asc' } }
      }
    );
  }
}
