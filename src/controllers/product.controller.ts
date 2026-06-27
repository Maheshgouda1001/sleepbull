import type { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ProductImageService } from '../services/product-image.service';
import { sendSuccess } from '../utils/response';

export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly imageService: ProductImageService
  ) {}

  list = async (req: Request, res: Response) =>
    sendSuccess(res, 'Products fetched successfully', await this.service.list(req.query as Record<string, unknown>));

  get = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Product fetched successfully',
      await this.service.getByIdOrSlug(String(req.params.slugOrId))
    );

  create = async (req: Request, res: Response) =>
    sendSuccess(res, 'Product created successfully', await this.service.create(req.body), 201);

  update = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Product updated successfully',
      await this.service.update(String(req.params.id), req.body)
    );

  remove = async (req: Request, res: Response) =>
    sendSuccess(res, 'Product deleted successfully', await this.service.remove(String(req.params.id)));

  createVariant = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Product variant created successfully',
      await this.service.createVariant(String(req.params.productId), req.body),
      201
    );

  updateVariant = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Product variant updated successfully',
      await this.service.updateVariant(String(req.params.id), req.body)
    );

  deleteVariant = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Product variant deleted successfully',
      await this.service.deleteVariant(String(req.params.id))
    );

  uploadImage = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Product image uploaded successfully',
      await this.imageService.upload(String(req.params.productId), req.file, req.body.altText),
      201
    );

  deleteImage = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Product image deleted successfully',
      await this.imageService.remove(String(req.params.id))
    );

  reorderImages = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Product images reordered successfully',
      await this.service.reorderImages(String(req.params.productId), req.body.imageIds)
    );
}
