import { safeFetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import { resolveAssetUrl } from "@/lib/mappers";
import type { ApiTestimonial } from "@/lib/api-types";

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  rating: number;
  image?: string;
}

function mapTestimonial(item: ApiTestimonial): Testimonial {
  return {
    id: String(item.id),
    name: item.name,
    role: item.role ?? undefined,
    quote: item.quote,
    rating: item.rating,
    image: item.imagePath
      ? resolveAssetUrl(item.imagePath)
      : undefined,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await safeFetcher(
    `${ENDPOINTS.TESTIMONIALS}?limit=20`,
    {
      items: [] as ApiTestimonial[],
      meta: { page: 1, limit: 20, total: 0, totalPages: 0 },
    }
  );

  return response.items.map(mapTestimonial);
}
