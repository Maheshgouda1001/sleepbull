import createHttpError from 'http-errors';
import { FabricRepository } from '../repositories/fabric.repository';
import { parseBigIntId } from '../utils/id';
import { toSlug } from '../utils/slug';

export class FabricService {
  constructor(private readonly repository: FabricRepository) {}

  listByCategoryType(categoryTypeId: string) {
    return this.repository.findMany({
      where: {
        categoryTypeId: parseBigIntId(categoryTypeId),
        isActive: true
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
    });
  }

  async getById(id: string) {
    const fabric = await this.repository.findUnique({
      id: parseBigIntId(id),
      isActive: true
    });

    if (!fabric) {
      throw createHttpError(404, 'Fabric not found');
    }

    return fabric;
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
    return this.repository.update({ id: parseBigIntId(id) }, { isActive: false });
  }
}
