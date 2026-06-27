import fs from 'fs/promises';
import path from 'path';
import { env } from '../config/env';
import type { StorageService, StoreFileInput, StoredFile } from './storage.interface';

export class LocalStorageService implements StorageService {
  private readonly uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);

  async storeFile(input: StoreFileInput): Promise<StoredFile> {
    const safeFolder = (input.folder || '').replace(/^\/+|\/+$/g, '');
    const folderPath = path.join(this.uploadDir, safeFolder);
    await fs.mkdir(folderPath, { recursive: true });

    const safeFilename = `${Date.now()}-${input.filename.replace(/\s+/g, '-').toLowerCase()}`;
    const absolutePath = path.join(folderPath, safeFilename);
    await fs.writeFile(absolutePath, input.buffer);

    const relativePath = path.posix.join('/uploads', safeFolder, safeFilename).replace(/\/+/g, '/');

    return {
      relativePath,
      publicUrl: relativePath
    };
  }

  async deleteFile(relativePath: string): Promise<void> {
    const normalized = relativePath.replace(/^\/uploads\/?/, '');
    const absolutePath = path.join(this.uploadDir, normalized);
    await fs.rm(absolutePath, { force: true });
  }
}
