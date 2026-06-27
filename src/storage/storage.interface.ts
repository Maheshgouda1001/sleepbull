export type StoreFileInput = {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  folder?: string;
};

export type StoredFile = {
  relativePath: string;
  publicUrl: string;
};

export interface StorageService {
  storeFile(input: StoreFileInput): Promise<StoredFile>;
  deleteFile(relativePath: string): Promise<void>;
}
