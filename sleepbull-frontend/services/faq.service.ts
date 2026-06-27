import { safeFetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import type { ApiFaq } from "@/lib/api-types";

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder: number;
}

function mapFaq(faq: ApiFaq): Faq {
  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    category: faq.category ?? undefined,
    sortOrder: faq.sortOrder,
  };
}

export async function getFaqs(): Promise<Faq[]> {
  const response = await safeFetcher(
    `${ENDPOINTS.FAQS}?limit=50`,
    { items: [] as ApiFaq[], meta: { page: 1, limit: 50, total: 0, totalPages: 0 } }
  );

  return response.items
    .filter((faq) => faq.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(mapFaq);
}
