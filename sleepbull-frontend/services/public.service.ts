import { poster } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import type {
  ContactEnquiry,
  ContactPayload,
  NewsletterPayload,
  NewsletterSubscription,
} from "@/types/public";

export async function submitContact(
  payload: ContactPayload
): Promise<ContactEnquiry> {
  return poster<ContactEnquiry>(ENDPOINTS.CONTACT, payload);
}

export async function subscribeNewsletter(
  payload: NewsletterPayload
): Promise<NewsletterSubscription> {
  return poster<NewsletterSubscription>(
    ENDPOINTS.NEWSLETTER,
    payload
  );
}

export async function unsubscribeNewsletter(
  payload: NewsletterPayload
): Promise<NewsletterSubscription> {
  return poster<NewsletterSubscription>(
    ENDPOINTS.NEWSLETTER_UNSUBSCRIBE,
    payload
  );
}
