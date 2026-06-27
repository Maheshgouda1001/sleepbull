import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodTypeAny } from 'zod';
import { sendError } from '../utils/response';

type ValidationSchemas = {
  body?: ZodTypeAny;
  params?: AnyZodObject;
  query?: AnyZodObject;
};

export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Array<{ field: string; message: string }> = [];

    for (const [key, schema] of Object.entries(schemas) as Array<[keyof ValidationSchemas, ZodTypeAny]>) {
      if (!schema) {
        continue;
      }

      const result = schema.safeParse(req[key]);

      if (!result.success) {
        for (const issue of result.error.issues) {
          errors.push({
            field: `${key}.${issue.path.join('.')}`,
            message: issue.message
          });
        }
      } else {
        (req as unknown as Record<string, unknown>)[key] = result.data;
      }
    }

    if (errors.length > 0) {
      return sendError(res, 'Validation failed', errors, 422);
    }

    next();
  };
}
