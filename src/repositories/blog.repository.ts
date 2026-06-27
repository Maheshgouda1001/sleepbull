import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class BlogRepository extends BaseRepository {
  constructor() {
    super(prisma.blog);
  }
}
