import type { ApiCategory, ApiProduct } from "./api-types";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return typeof value === "number" ? value : Number(value);
}

export function resolveAssetUrl(path?: string | null): string {
  if (!path) return "/images/placeholder.svg";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function mapCategory(category: ApiCategory): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? undefined,
    image: category.imagePath
      ? resolveAssetUrl(category.imagePath)
      : undefined,
    isFeatured: category.slug.includes("mattress"),
    isActive: category.isActive,
    sortOrder: category.sortOrder,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

function specValue(
  specifications: ApiProduct["specifications"],
  key: string
): string {
  return (
    specifications.find(
      (spec) => spec.key.toLowerCase() === key.toLowerCase()
    )?.value ?? ""
  );
}

export function mapProduct(product: ApiProduct): Product {
  const basePrice = toNumber(product.basePrice);
  const compareAtPrice = toNumber(product.compareAtPrice);
  const primaryVariant = product.variants[0];
  const variantPrice = primaryVariant
    ? toNumber(primaryVariant.price)
    : basePrice;

  const price =
    compareAtPrice > variantPrice ? compareAtPrice : variantPrice;
  const salePrice =
    compareAtPrice > variantPrice ? variantPrice : basePrice;

  const discount =
    price > salePrice
      ? Math.round(((price - salePrice) / price) * 100)
      : 0;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: primaryVariant?.sku ?? product.slug,
    shortDescription: product.shortDescription ?? "",
    description: product.description ?? "",
    category: mapCategory(product.category),
    brand: "SleepBull",
    price,
    salePrice,
    discount,
    stock: product.variants.reduce((total, variant) => total + variant.stock, 0),
    rating: 4.8,
    reviewCount: 0,
    thickness: specValue(product.specifications, "Height"),
    size: primaryVariant?.size ?? "",
    warranty: specValue(product.specifications, "Warranty"),
    images: product.images.map((image) => ({
      id: image.id,
      image: resolveAssetUrl(image.path),
      alt: image.altText ?? undefined,
      sortOrder: image.sortOrder,
    })),
    specifications: product.specifications.map((spec) => ({
      title: spec.key,
      value: spec.value,
    })),
    reviews: [],
    isFeatured: product.isFeatured,
    isBestSeller: product.isFeatured,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}
