import type { Response } from 'express';

function serializeBigInt(value: unknown): unknown {
  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map(serializeBigInt);
  }

  if (value instanceof Date) {
    return value;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, serializeBigInt(entry)])
    );
  }

  return value;
}

export function sendSuccess<T>(res: Response, message: string, data: T, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data: serializeBigInt(data)
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
