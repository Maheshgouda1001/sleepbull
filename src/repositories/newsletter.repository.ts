import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class NewsletterRepository extends BaseRepository {
  constructor() {
    super(prisma.newsletter);
  }
}
