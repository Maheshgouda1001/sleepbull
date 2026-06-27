import { Router } from 'express';
import { UserRole } from '@prisma/client';
import type { CategoryController } from '../controllers/category.controller';
import { asyncHandler } from '../utils/async-handler';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { validate } from '../middleware/validate';
import { categoryBodySchema } from '../validators/category.validator';
import { idParamSchema } from '../validators/common.validator';

export function createCategoryRouter(controller: CategoryController) {
  const router = Router();

  router.get('/', asyncHandler(controller.list));
  router.get('/:id', validate({ params: idParamSchema }), asyncHandler(controller.get));
  router.post(
    '/',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ body: categoryBodySchema }),
    asyncHandler(controller.create)
  );
  router.put(
    '/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ params: idParamSchema, body: categoryBodySchema.partial() }),
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
