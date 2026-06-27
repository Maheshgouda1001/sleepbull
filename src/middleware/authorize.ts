import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '@prisma/client';
import createHttpError from 'http-errors';

export function authorize(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createHttpError(401, 'Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(createHttpError(403, 'You do not have permission to perform this action'));
    }

    next();
  };
}
