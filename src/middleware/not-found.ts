import type { Request, Response } from 'express';
import { sendError } from '../utils/response';

export function notFoundHandler(_req: Request, res: Response) {
  return sendError(res, 'Route not found', [], 404);
}
