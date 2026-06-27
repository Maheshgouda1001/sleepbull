import { Router } from 'express';
import { UserRole } from '@prisma/client';
import type { ContentController } from '../controllers/content.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/async-handler';
import { idParamSchema, slugOrIdParamSchema } from '../validators/common.validator';

export function createContentRouter(controller: ContentController, bodySchema: any) {
  const router = Router();

  router.get('/', asyncHandler(controller.list));
  router.get('/:idOrSlug', validate({ params: slugOrIdParamSchema }), asyncHandler(controller.get));
  router.post(
    '/',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ body: bodySchema }),
    asyncHandler(controller.create)
  );
  router.put(
    '/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ params: idParamSchema, body: bodySchema.partial() }),
    asyncHandler(controller.update)
  );
  router.delete(
    '/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validate({ params: idParamSchema }),
    asyncHandler(controller.remove)
  );

  return router;
}
