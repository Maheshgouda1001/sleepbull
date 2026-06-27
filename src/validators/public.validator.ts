import { z } from 'zod';

export const contactBodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10)
});

export const newsletterBodySchema = z.object({
  email: z.string().email()
});
