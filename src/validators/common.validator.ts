import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce.bigint().or(z.string().regex(/^\d+$/).transform(BigInt))
});

export const slugOrIdParamSchema = z.object({
  slugOrId: z.string().min(1)
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

export const bigintIdSchema = z.coerce.bigint().or(
  z.string().regex(/^\d+$/).transform((value) => BigInt(value))
);
