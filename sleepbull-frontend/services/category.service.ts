import { fetcher, safeFetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import { isCategoryInCollection, mapCategory } from "@/lib/mappers";
import type { ApiCategory } from "@/lib/api-types";
import type { Category } from "@/types/category";
import type { CollectionSlug } from "@/config/collections";

/** GET /api/categories */
export async function getCategories(): Promise<Category[]> {
  const categories = await safeFetcher<ApiCategory[]>(
    ENDPOINTS.CATEGORIES,
    []
  );
  return categories.map(mapCategory);
}

export async function getCategoriesByCollection(
  collection: CollectionSlug
): Promise<Category[]> {
  const categories = await getCategories();
  return categories
    .filter(
      (category) => category.isActive && isCategoryInCollection(category, collection)
    )
    .sort((left, right) => left.sortOrder - right.sortOrder);
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
