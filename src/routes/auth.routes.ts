import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { validate } from '../middleware/validate';
import { loginSchema, changePasswordSchema } from '../validators/auth.validator';
import { authenticate } from '../middleware/authenticate';
import type { AuthController } from '../controllers/auth.controller';

export function createAuthRouter(controller: AuthController) {
  const router = Router();

  router.post('/login', validate({ body: loginSchema }), asyncHandler(controller.login));
  router.post('/logout', authenticate, asyncHandler(controller.logout));
  router.get('/profile', authenticate, asyncHandler(controller.profile));
  router.post(
    '/change-password',
    authenticate,
    validate({ body: changePasswordSchema }),
    asyncHandler(controller.changePassword)
  );

  return router;
}
