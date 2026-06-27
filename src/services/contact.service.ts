import { ContactEnquiryRepository } from '../repositories/contact-enquiry.repository';

export class ContactService {
  constructor(private readonly repository: ContactEnquiryRepository) {}

  create(payload: Record<string, unknown>) {
    return this.repository.create(payload);
  }
}
