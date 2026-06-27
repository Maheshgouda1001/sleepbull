import type { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { sendSuccess } from '../utils/response';

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  list = async (_req: Request, res: Response) =>
    sendSuccess(res, 'Categories fetched successfully', await this.service.list());

  get = async (req: Request, res: Response) =>
    sendSuccess(res, 'Category fetched successfully', await this.service.getById(String(req.params.id)));

  create = async (req: Request, res: Response) =>
    sendSuccess(res, 'Category created successfully', await this.service.create(req.body), 201);

  update = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Category updated successfully',
      await this.service.update(String(req.params.id), req.body)
    );

  remove = async (req: Request, res: Response) =>
    sendSuccess(res, 'Category deleted successfully', await this.service.remove(String(req.params.id)));
}
