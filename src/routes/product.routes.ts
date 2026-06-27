import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import type { ProductController } from '../controllers/product.controller';
import { upload } from '../config/multer';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/async-handler';
import { idParamSchema, slugOrIdParamSchema } from '../validators/common.validator';
import {
  imageReorderSchema,
  productBodySchema,
  productQuerySchema,
  variantBodySchema
} from '../validators/product.validator';

export function createProductRouter(controller: ProductController) {
  const router = Router();

  router.get('/', validate({ query: productQuerySchema }), asyncHandler(controller.list));
  router.get('/:slugOrId', validate({ params: slugOrIdParamSchema }), asyncHandler(controller.get));
  router.post(
    '/',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ body: productBodySchema }),
    asyncHandler(controller.create)
  );
  router.put(
    '/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ params: idParamSchema, body: productBodySchema.partial() }),
    asyncHandler(controller.update)
  );
  router.delete(
    '/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validate({ params: idParamSchema }),
    asyncHandler(controller.remove)
  );

  router.post(
    '/:productId/variants',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ body: variantBodySchema, params: zUuidParam('productId') }),
    asyncHandler(controller.createVariant)
  );
  router.put(
    '/variants/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ params: idParamSchema, body: variantBodySchema.partial() }),
    asyncHandler(controller.updateVariant)
  );
  router.delete(
    '/variants/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validate({ params: idParamSchema }),
    asyncHandler(controller.deleteVariant)
  );

  router.post(
    '/:productId/images',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ params: zUuidParam('productId') }),
    upload.single('image'),
    asyncHandler(controller.uploadImage)
  );
  router.delete(
    '/images/:id',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validate({ params: idParamSchema }),
    asyncHandler(controller.deleteImage)
  );
  router.post(
    '/:productId/images/reorder',
    authenticate,
    authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR),
    validate({ params: zUuidParam('productId'), body: imageReorderSchema }),
    asyncHandler(controller.reorderImages)
  );

  return router;
}

function zUuidParam(key: string) {
  return z.object({ [key]: z.string().uuid() });
}
