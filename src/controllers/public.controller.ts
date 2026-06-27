import type { Request, Response } from 'express';
import { ContactService } from '../services/contact.service';
import { NewsletterService } from '../services/newsletter.service';
import { sendSuccess } from '../utils/response';

export class PublicController {
  constructor(
    private readonly contactService: ContactService,
    private readonly newsletterService: NewsletterService
  ) {}

  contact = async (req: Request, res: Response) =>
    sendSuccess(res, 'Enquiry submitted successfully', await this.contactService.create(req.body), 201);

  subscribe = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Newsletter subscription saved successfully',
      await this.newsletterService.subscribe(req.body.email),
      201
    );

  unsubscribe = async (req: Request, res: Response) =>
    sendSuccess(
      res,
      'Newsletter subscription updated successfully',
      await this.newsletterService.unsubscribe(req.body.email),
      200
    );
}
