import { Router } from 'express';
import { UserRole } from '@prisma/client';
import type { OrderController } from '../controllers/order.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/async-handler';
import { idParamSchema } from '../validators/common.validator';
import { orderBodySchema, orderQuerySchema, orderUpdateSchema } from '../validators/order.validator';

export function createOrderRouter(controller: OrderController) {
  const router = Router();

  router.get(
    '/',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ query: orderQuerySchema }),
    asyncHandler(controller.list)
  );
  router.get(
    '/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ params: idParamSchema }),
    asyncHandler(controller.get)
  );
  router.post(
    '/',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validate({ body: orderBodySchema }),
    asyncHandler(controller.create)
  );
  router.put(
    '/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validate({ params: idParamSchema, body: orderUpdateSchema }),
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
