import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class ContactEnquiryRepository extends BaseRepository {
  constructor() {
    super(prisma.contactEnquiry);
  }
}