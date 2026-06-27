import { Router } from 'express';
import type { PublicController } from '../controllers/public.controller';
import { asyncHandler } from '../utils/async-handler';
import { validate } from '../middleware/validate';
import { contactBodySchema, newsletterBodySchema } from '../validators/public.validator';

export function createPublicRouter(controller: PublicController) {
  const router = Router();

  router.post('/contact', validate({ body: contactBodySchema }), asyncHandler(controller.contact));
  router.post('/newsletter', validate({ body: newsletterBodySchema }), asyncHandler(controller.subscribe));
  router.post(
    '/newsletter/unsubscribe',
    validate({ body: newsletterBodySchema }),
    asyncHandler(controller.unsubscribe)
  );

  return router;
}
