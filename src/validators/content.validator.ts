import { z } from 'zod';
import { paginationQuerySchema } from './common.validator';

export const blogBodySchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  isPublished: z.boolean().optional(),
  publishedAt: z.string().datetime().optional()
});

export const faqBodySchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().nonnegative().optional()
});

export const testimonialBodySchema = z.object({
  name: z.string().min(2),
  role: z.string().optional(),
  quote: z.string().min(5),
  rating: z.number().int().min(1).max(5).optional(),
  imagePath: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().nonnegative().optional()
});

export const publicContentQuerySchema = paginationQuerySchema;
