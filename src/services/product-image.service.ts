import createHttpError from 'http-errors';
import { ProductImageRepository } from '../repositories/product-image.repository';
import { ProductRepository } from '../repositories/product.repository';
import { parseBigIntId } from '../utils/id';
import type { StorageService } from '../storage/storage.interface';

export class ProductImageService {
  constructor(
    private readonly repository: ProductImageRepository,
    private readonly productRepository: ProductRepository,
    private readonly storageService: StorageService
  ) {}

  async upload(productId: string, file: Express.Multer.File | undefined, altText?: string) {
    const product = await this.productRepository.findUnique({
      id: parseBigIntId(productId),
      deletedAt: null
    });
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

    return this.repository.create({
      productId: parseBigIntId(productId),
      imagePath: stored.relativePath,
      altText,
      sortOrder: 999
    });
  }

  async remove(imageId: string) {
    const image = (await this.repository.findUnique({ id: parseBigIntId(imageId) })) as {
      imagePath?: string;
    } | null;

    if (!image) {
      throw createHttpError(404, 'Product image not found');
    }

    if (image.imagePath) {
      await this.storageService.deleteFile(image.imagePath);
    }

    return this.repository.delete({ id: parseBigIntId(imageId) });
  }
}
