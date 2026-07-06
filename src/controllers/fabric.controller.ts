import type { Request, Response } from 'express';
import { FabricService } from '../services/fabric.service';
import { sendSuccess } from '../utils/response';

export class FabricController {
  constructor(private readonly service: FabricService) {}

  list = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Fabrics fetched successfully',
      await this.service.listByCategoryType(String(req.query.categoryTypeId))
    );

  get = async (req: Request, res: Response) =>
    sendSuccess(res, 'Fabric fetched successfully', await this.service.getById(String(req.params.id)));

  create = async (req: Request, res: Response) =>
    sendSuccess(res, 'Fabric created successfully', await this.service.create(req.body), 201);

  update = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Fabric updated successfully',
      await this.service.update(String(req.params.id), req.body)
    );

  remove = async (req: Request, res: Response) =>
    sendSuccess(res, 'Fabric deleted successfully', await this.service.remove(String(req.params.id)));
}
