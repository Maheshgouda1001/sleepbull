import { fetcher, safeFetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import { isCategoryInCollection, mapProduct } from "@/lib/mappers";
import type {
  ApiPaginatedProducts,
  ApiProduct,
} from "@/lib/api-types";
import type { Product } from "@/types/product";
import type { CollectionSlug } from "@/config/collections";
import { getCategories, getCategoryBySlug } from "./category.service";

interface ProductQuery {
  categoryId?: string;
  isActive?: boolean;
  limit?: number;
  page?: number;
  search?: string;
}

/** GET /api/products */
async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  const params = new URLSearchParams();

  if (query.categoryId) params.set("categoryId", query.categoryId);
  if (query.isActive !== undefined) {
    params.set("isActive", String(query.isActive));
  }
  if (query.limit) params.set("limit", String(query.limit));
  if (query.page) params.set("page", String(query.page));
  if (query.search) params.set("search", query.search);

  const path = params.toString()
    ? `${ENDPOINTS.PRODUCTS}?${params.toString()}`
    : ENDPOINTS.PRODUCTS;

  const response = await safeFetcher<ApiPaginatedProducts>(path, {
    items: [],
    meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });
  return response.items.map(mapProduct);
}

async function getProductsByCollection(
  collection: CollectionSlug
): Promise<Product[]> {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ isActive: true, limit: 50 }),
  ]);
  const categoryIds = new Set(
    categories
      .filter(
        (category) =>
          category.isActive && isCategoryInCollection(category, collection)
      )
      .map((category) => category.id)
  );

  return products.filter((product) => categoryIds.has(product.category.id));
}

/** GET /api/products?isFeatured via filter on list */
export async function getFeaturedProducts(
  limit = 4
): Promise<Product[]> {
  const products = await getProductsByCollection("mattresses");

  const featured = products.filter((product) => product.isFeatured);
  return (featured.length ? featured : products).slice(0, limit);
}

export async function getFeaturedPillows(limit = 4): Promise<Product[]> {
  const products = await getProductsByCollection("pillows");
  return products.slice(0, limit);
}

/** GET /api/products — mattress collection */
export async function getAllMattresses(): Promise<Product[]> {
  return getProductsByCollection("mattresses");
}

/** GET /api/products — pillow collection */
export async function getAllPillows(): Promise<Product[]> {
  return getProductsByCollection("pillows");
}

/** GET /api/products?categoryId=... */
export async function getProductsByCategory(
  slug: string
): Promise<Product[]> {
  if (slug === "mattresses") {
    return getAllMattresses();
  }

  if (slug === "pillows") {
    return getAllPillows();
  }

  if (slug === "accessories") {
    return getProductsByCollection("accessories");
  }

  const category = await getCategoryBySlug(slug);
  if (!category) return [];

  return getProducts({
    categoryId: category.id,
    isActive: true,
    limit: 50,
  });
}

/** GET /api/products/:slug */
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await fetcher<ApiProduct>(
      ENDPOINTS.PRODUCT_BY_SLUG(slug)
    );
    return mapProduct(product);
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  categorySlug: string
): Promise<Product[]> {
  const products = await getProductsByCategory(categorySlug);
  return products.slice(0, 4);
}

/** GET /api/products?search=... */
export async function searchProducts(
  query: string,
  limit = 24
): Promise<Product[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return getProducts({
    search: trimmed,
    isActive: true,
    limit,
  });
}
