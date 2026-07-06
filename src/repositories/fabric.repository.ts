import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class FabricRepository extends BaseRepository {
  constructor() {
    super(prisma.fabric);
  }
}
