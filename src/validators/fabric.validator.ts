import { z } from 'zod';
import { bigintIdSchema } from './common.validator';

export const fabricQuerySchema = z.object({
  categoryTypeId: bigintIdSchema
});

export const fabricBodySchema = z.object({
  categoryTypeId: bigintIdSchema,
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(160).optional(),
  thumbnailPath: z.string().min(1).max(500),
  description: z.string().max(1000).optional(),
  sortOrder: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional()
});
