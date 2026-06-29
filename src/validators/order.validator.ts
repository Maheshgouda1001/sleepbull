import { z } from 'zod';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { bigintIdSchema, paginationQuerySchema } from './common.validator';

const addressSchema = z.object({
  line1: z.string().min(2),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2)
});

const orderItemSchema = z.object({
  productId: bigintIdSchema,
  variantId: bigintIdSchema.optional(),
  quantity: z.number().int().positive()
});

export const orderBodySchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  shippingTotal: z.number().nonnegative().optional(),
  taxTotal: z.number().nonnegative().optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1)
});

export const orderUpdateSchema = z.object({
  customerName: z.string().min(2).optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  shippingAddress: addressSchema.optional(),
  billingAddress: addressSchema.optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  notes: z.string().optional()
});

export const orderQuerySchema = paginationQuerySchema.extend({
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional()
});
