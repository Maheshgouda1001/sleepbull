import { prisma } from '../config/prisma';
import { BaseRepository } from './base.repository';

export class TestimonialRepository extends BaseRepository {
  constructor() {
    super(prisma.testimonial);
  }
}
