import { z } from 'zod';

export const categoryBodySchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(160).optional(),
  description: z.string().max(1000).optional(),
  imagePath: z.string().max(255).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().nonnegative().optional()
});
