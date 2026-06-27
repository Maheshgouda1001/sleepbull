import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class ProductRepository extends BaseRepository {
  constructor() {
    super(prisma.product);
  }
}
