import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class OrderRepository extends BaseRepository {
  constructor() {
    super(prisma.order);
  }
}
