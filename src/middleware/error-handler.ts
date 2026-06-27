import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { logger } from '../config/logger';
import { sendError } from '../utils/response';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error({ err: error }, 'Unhandled request error');

  if (error instanceof ZodError) {
    return sendError(
      res,
      'Validation failed',
      error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      })),
      422
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return sendError(res, 'Database request failed', [error.message], 400);
  }

  const statusCode = 'statusCode' in error && typeof error.statusCode === 'number' ? error.statusCode : 500;

  return sendError(
    res,
    statusCode === 500 ? 'Internal server error' : error.message,
    statusCode === 500 ? [] : [error.message],
    statusCode
  );
}
