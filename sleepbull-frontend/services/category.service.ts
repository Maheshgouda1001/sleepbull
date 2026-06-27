import { fetcher, safeFetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import { mapCategory } from "@/lib/mappers";
import type { ApiCategory } from "@/lib/api-types";
import type { Category } from "@/types/category";

/** GET /api/categories */
export async function getCategories(): Promise<Category[]> {
  const categories = await safeFetcher<ApiCategory[]>(
    ENDPOINTS.CATEGORIES,
    []
  );
  return categories.map(mapCategory);
}

/** GET /api/categories/:id */
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const category = await fetcher<ApiCategory>(
      ENDPOINTS.CATEGORY_BY_ID(id)
    );
    return mapCategory(category);
  } catch {
    return null;
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}
