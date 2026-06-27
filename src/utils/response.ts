import type { Response } from 'express';

export function sendSuccess<T>(res: Response, message: string, data: T, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

export function sendError(
  res: Response,
  message: string,
  errors: Array<Record<string, unknown> | string> = [],
  statusCode = 400
) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
}
