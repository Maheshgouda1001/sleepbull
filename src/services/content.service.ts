import createHttpError from 'http-errors';
import { getPagination } from '../utils/pagination';
import { toSlug } from '../utils/slug';

type ContentRepository = {
  findMany(input: Record<string, unknown>): Promise<unknown>;
  count(input: Record<string, unknown>): Promise<number>;
  findUnique(where: Record<string, unknown>): Promise<any>;
  create(payload: Record<string, unknown>): Promise<unknown>;
  update(where: Record<string, unknown>, payload: Record<string, unknown>): Promise<unknown>;
};

export class ContentService {
  constructor(
    private readonly repository: ContentRepository,
    private readonly options?: { slug?: boolean }
  ) {}

  async list(query?: Record<string, unknown>) {
    const page = Number(query?.page || 1);
    const limit = Number(query?.limit || 10);
    const { skip } = getPagination(page, limit);

    const where = {
      deletedAt: null
    };

    const [items, total] = await Promise.all([
      this.repository.findMany({
        where,
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

  async getByIdentifier(identifier: string) {
    const item = await this.repository.findUnique({
      deletedAt: null,
      ...(this.options?.slug ? { OR: [{ id: identifier }, { slug: identifier }] } : { id: identifier })
    });

    if (!item) {
      throw createHttpError(404, 'Resource not found');
    }

    return item;
  }

  async getById(id: string) {
    return this.getByIdentifier(id);
  }

  create(payload: Record<string, unknown>) {
    return this.repository.create({
      ...payload,
      ...(this.options?.slug && payload.title && !payload.slug ? { slug: toSlug(String(payload.title)) } : {})
    });
  }

  async update(id: string, payload: Record<string, unknown>) {
    await this.getById(id);
    return this.repository.update(
      { id },
      {
        ...payload,
        ...(this.options?.slug && payload.title && !payload.slug
          ? { slug: toSlug(String(payload.title)) }
          : {})
      }
    );
  }

  async remove(id: string) {
    await this.getById(id);
    return this.repository.update({ id }, { deletedAt: new Date() });
  }
}
