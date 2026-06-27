import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class CategoryRepository extends BaseRepository {
  constructor() {
    super(prisma.category);
  }
}
