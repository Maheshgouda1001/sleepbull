import { NewsletterRepository } from '../repositories/newsletter.repository';

export class NewsletterService {
  constructor(private readonly repository: NewsletterRepository) {}

  async subscribe(email: string) {
    const existing = (await this.repository.findUnique({ email })) as any;

    if (existing) {
      return this.repository.update(
        { id: existing.id },
        { isSubscribed: true, unsubscribedAt: null, updatedAt: new Date() }
      );
    }

    return this.repository.create({ email });
  }

  async unsubscribe(email: string) {
    const existing = (await this.repository.findUnique({ email })) as any;
    if (!existing) {
      return null;
    }

    return this.repository.update({ id: existing.id }, { isSubscribed: false, unsubscribedAt: new Date() });
  }
}
