import { LocalStorageService } from './local-storage.service';
import type { StorageService } from './storage.interface';

export function createStorageService(): StorageService {
  return new LocalStorageService();
}
