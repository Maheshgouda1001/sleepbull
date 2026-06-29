import type { ApiCategory, ApiNumber, ApiProduct } from "./api-types";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

function toNumber(value: ApiNumber | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);

  if (Array.isArray(value.d) && value.d.length > 0) {
    const digits = value.d.join("");
    const exponent = value.e ?? digits.length - 1;
    const sign = value.s === -1 ? -1 : 1;
    return sign * Number(`${digits[0]}.${digits.slice(1) || "0"}e${exponent}`);
  }

  return 0;
}

export function resolveAssetUrl(path?: string | null): string {
  if (!path) return "/images/placeholder.svg";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const normalized = path.replace(/^\/+/, "");

  if (normalized.startsWith("uploads/")) {
    return `/api/assets/${normalized}`;
  }

  if (normalized.startsWith("public/")) {
    return `/api/assets/${normalized}`;
  }

  if (normalized.startsWith("images/products/")) {
    return `/api/assets/public/${normalized}`;
  }

  if (normalized.startsWith("images/")) {
    const [, folderOrFile, ...rest] = normalized.split("/");
    const imagePath =
      rest.length > 0
        ? normalized
        : `images/products/${folderOrFile}`;

    return `/api/assets/public/${imagePath}`;
  }

  return `/api/assets/${normalized}`;
}

export function mapCategory(category: ApiCategory): Category {
  return {
    id: String(category.id),
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
    id: String(product.id),
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
      id: String(image.id),
      image: resolveAssetUrl(image.imagePath ?? image.path),
      alt: image.altText ?? undefined,
      sortOrder: image.sortOrder,
    })),
    specifications: product.specifications.map((spec) => ({
      title: spec.key,
      value: spec.value,
    })),
    reviews: [],
    isFeatured: product.isFeatured,
    isBestSeller: product.isBestSeller,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}
