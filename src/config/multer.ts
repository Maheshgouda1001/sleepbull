import multer from 'multer';
import path from 'path';
import createHttpError from 'http-errors';
import { env } from './env';

const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.has(ext)) {
      cb(createHttpError(400, 'Only JPG, PNG, and WebP files are allowed'));
      return;
    }
    cb(null, true);
  }
});
