import { Router } from 'express';
import { UserRole } from '@prisma/client';
import type { FabricController } from '../controllers/fabric.controller';
import { asyncHandler } from '../utils/async-handler';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { validate } from '../middleware/validate';
import { idParamSchema } from '../validators/common.validator';
import { fabricBodySchema, fabricQuerySchema } from '../validators/fabric.validator';

export function createFabricRouter(controller: FabricController) {
  const router = Router();

  router.get('/', validate({ query: fabricQuerySchema }), asyncHandler(controller.list));
  router.get('/:id', validate({ params: idParamSchema }), asyncHandler(controller.get));
  router.post(
    '/',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ body: fabricBodySchema }),
    asyncHandler(controller.create)
  );
  router.put(
    '/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ params: idParamSchema, body: fabricBodySchema.partial() }),
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
