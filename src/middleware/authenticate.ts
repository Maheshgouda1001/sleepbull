import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '@prisma/client';
import createHttpError from 'http-errors';
import { env } from '../config/env';
import { verifyAccessToken } from '../utils/jwt';

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.replace('Bearer ', '')
    : undefined;
  const token = req.cookies?.[env.COOKIE_NAME] || bearerToken;

  if (!token) {
    return next(createHttpError(401, 'Authentication required'));
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role as UserRole
    };
    next();
  } catch {
    next(createHttpError(401, 'Invalid or expired token'));
  }
}
