import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }

  findByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
        deletedAt: null
      }
    });
  }
}
