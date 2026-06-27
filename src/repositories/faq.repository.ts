import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class FaqRepository extends BaseRepository {
  constructor() {
    super(prisma.fAQ);
  }
}
