import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class ProductVariantRepository extends BaseRepository {
  constructor() {
    super(prisma.productVariant);
  }
}
