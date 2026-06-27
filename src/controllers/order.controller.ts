import type { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { sendSuccess } from '../utils/response';

export class OrderController {
  constructor(private readonly service: OrderService) {}

  list = async (req: Request, res: Response) =>
    sendSuccess(res, 'Orders fetched successfully', await this.service.list(req.query as Record<string, unknown>));

  get = async (req: Request, res: Response) =>
    sendSuccess(res, 'Order fetched successfully', await this.service.getById(String(req.params.id)));

  create = async (req: Request, res: Response) =>
    sendSuccess(res, 'Order created successfully', await this.service.create(req.body), 201);

  update = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Order updated successfully',
      await this.service.update(String(req.params.id), req.body)
    );

  remove = async (req: Request, res: Response) =>
    sendSuccess(res, 'Order deleted successfully', await this.service.remove(String(req.params.id)));
}
