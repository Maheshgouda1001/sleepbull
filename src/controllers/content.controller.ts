import type { Request, Response } from 'express';
import { ContentService } from '../services/content.service';
import { sendSuccess } from '../utils/response';

export class ContentController {
  constructor(private readonly service: ContentService, private readonly label: string) {}

  list = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      `${this.label} fetched successfully`,
      await this.service.list(req.query as Record<string, unknown>)
    );

  get = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      `${this.label.slice(0, -1)} fetched successfully`,
      await this.service.getByIdentifier(String(req.params.idOrSlug))
    );

  create = async (req: Request, res: Response) =>
    sendSuccess(res, `${this.label.slice(0, -1)} created successfully`, await this.service.create(req.body), 201);

  update = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      `${this.label.slice(0, -1)} updated successfully`,
      await this.service.update(String(req.params.id), req.body)
    );

  remove = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      `${this.label.slice(0, -1)} deleted successfully`,
      await this.service.remove(String(req.params.id))
    );
}
