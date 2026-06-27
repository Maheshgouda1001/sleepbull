import { z } from 'zod';
import { paginationQuerySchema } from './common.validator';

const specificationSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
  sortOrder: z.number().int().nonnegative().optional()
});

const variantSchema = z.object({
  sku: z.string().min(2).max(120),
  size: z.string().min(1),
  firmness: z.string().optional(),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional()
});

export const productBodySchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(2).max(180),
  slug: z.string().min(2).max(200).optional(),
  shortDescription: z.string().max(500).optional(),
  description: z.string().optional(),
  basePrice: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  variants: z.array(variantSchema).optional(),
  specifications: z.array(specificationSchema).optional()
});

export const productQuerySchema = paginationQuerySchema.extend({
  categoryId: z.string().uuid().optional(),
  isActive: z
    .union([z.literal('true'), z.literal('false')])
    .optional()
});

export const variantBodySchema = variantSchema.extend({
  productId: z.string().uuid().optional()
});

export const imageReorderSchema = z.object({
  imageIds: z.array(z.string().uuid()).min(1)
});
