import createHttpError from 'http-errors';
import { CategoryRepository } from '../repositories/category.repository';
import { parseBigIntId } from '../utils/id';
import { toSlug } from '../utils/slug';

export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  list() {
    return this.repository.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }]
    });
  }

  async getById(id: string) {
    const category = await this.repository.findUnique({
      id: parseBigIntId(id),
      deletedAt: null
    });
    if (!category) {
      throw createHttpError(404, 'Category not found');
    }
    return category;
  }

  create(payload: Record<string, unknown>) {
    return this.repository.create({
      ...payload,
      slug: payload.slug || toSlug(String(payload.name))
    });
  }

  async update(id: string, payload: Record<string, unknown>) {
    await this.getById(id);
    return this.repository.update(
      { id: parseBigIntId(id) },
      {
        ...payload,
        ...(payload.name && !payload.slug ? { slug: toSlug(String(payload.name)) } : {})
      }
    );
  }

  async remove(id: string) {
    await this.getById(id);
    return this.repository.update(
      { id: parseBigIntId(id) },
      { deletedAt: new Date(), isActive: false }
    );
  }
}
