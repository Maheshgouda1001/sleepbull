import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class ProductImageRepository extends BaseRepository {
  constructor() {
    super(prisma.productImage);
  }
}
