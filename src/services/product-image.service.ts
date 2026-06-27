import createHttpError from 'http-errors';
import { ProductImageRepository } from '../repositories/product-image.repository';
import { ProductRepository } from '../repositories/product.repository';
import type { StorageService } from '../storage/storage.interface';

export class ProductImageService {
  constructor(
    private readonly repository: ProductImageRepository,
    private readonly productRepository: ProductRepository,
    private readonly storageService: StorageService
  ) {}

  async upload(productId: string, file: Express.Multer.File | undefined, altText?: string) {
    const product = await this.productRepository.findUnique({ id: productId, deletedAt: null });
    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    if (!file) {
      throw createHttpError(400, 'Image file is required');
    }

    const stored = await this.storageService.storeFile({
      buffer: file.buffer,
      filename: file.originalname,
      mimeType: file.mimetype,
      folder: 'products'
    });

    const image = await this.repository.create({
      productId,
      path: stored.relativePath,
      altText,
      sortOrder: 999
    });

    return image;
  }

  async remove(imageId: string) {
    const image = (await this.repository.findUnique({ id: imageId, deletedAt: null })) as any;
    if (!image) {
      throw createHttpError(404, 'Product image not found');
    }

    await this.storageService.deleteFile(image.path);
    return this.repository.update({ id: imageId }, { deletedAt: new Date() });
  }
}
