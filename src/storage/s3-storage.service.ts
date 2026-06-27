import type { StorageService, StoreFileInput, StoredFile } from './storage.interface';

export class S3StorageService implements StorageService {
  async storeFile(_input: StoreFileInput): Promise<StoredFile> {
    throw new Error('S3 storage is not implemented yet. Swap this service in during Phase 2.');
  }

  async deleteFile(_relativePath: string): Promise<void> {
    throw new Error('S3 storage is not implemented yet. Swap this service in during Phase 2.');
  }
}
