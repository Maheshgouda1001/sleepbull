import type { ApiCategory, ApiFabric, ApiNumber, ApiProduct } from "./api-types";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://api.sleepbull.com";

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

import type { CollectionSlug } from "@/config/collections";
import { CATEGORY_TYPE_IDS } from "@/config/collections";

export function mapCategory(category: ApiCategory): Category {
  const categoryTypeId = category.categoryTypeId
    ? String(category.categoryTypeId)
    : undefined;

  return {
    id: String(category.id),
    categoryTypeId,
    name: category.name,
    slug: category.slug,
    description: category.description ?? undefined,
    image: category.imagePath
      ? resolveAssetUrl(category.imagePath)
      : undefined,
    isFeatured:
      category.slug.includes("mattress") || category.slug.includes("pillow"),
    isActive: category.isActive,
    sortOrder: category.sortOrder,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export function isCategoryInCollection(
  category: Category,
  collection: CollectionSlug
): boolean {
  return category.categoryTypeId === CATEGORY_TYPE_IDS[collection];
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

function mapFabric(fabric: ApiFabric) {
  return {
    id: String(fabric.id),
    name: fabric.name,
    slug: fabric.slug,
    thumbnail: resolveAssetUrl(fabric.thumbnailPath),
    description: fabric.description ?? undefined,
  };
}

export function mapProduct(product: ApiProduct): Product {
  const basePrice = toNumber(product.basePrice);
  const compareAtPrice = toNumber(product.compareAtPrice);
  const variants = product.variants.map((variant) => {
    const variantPrice = toNumber(variant.price);
    const variantCompareAtPrice = toNumber(variant.compareAtPrice);
    const salePrice = variantPrice;

    return {
      id: String(variant.id),
      sku: variant.sku,
      size: variant.size,
      firmness: variant.firmness ?? undefined,
      lengthCm: variant.lengthCm ?? undefined,
      widthCm: variant.widthCm ?? undefined,
      heightInch: variant.heightInch ?? undefined,
      price:
        variantCompareAtPrice > variantPrice
          ? variantCompareAtPrice
          : variantPrice,
      compareAtPrice:
        variantCompareAtPrice > 0 ? variantCompareAtPrice : undefined,
      salePrice,
      stock: variant.stock,
      isDefault: Boolean(variant.isDefault),
    };
  });
  const primaryVariant =
    variants.find((variant) => variant.isDefault) ?? variants[0];
  const variantPrice = primaryVariant
    ? primaryVariant.salePrice
    : basePrice;

  const price =
    compareAtPrice > variantPrice ? compareAtPrice : variantPrice;
  const salePrice =
    compareAtPrice > variantPrice ? variantPrice : basePrice;

  const discount =
    price > salePrice
      ? Math.round(((price - salePrice) / price) * 100)
      : 0;
  const rawCoverImages =
    product.coverImages ??
    product.images
      .filter((image) => image.imageType === "COVER" && image.fabric)
      .map((image, index) => ({
        id: image.id,
        imagePath: image.imagePath,
        altText: image.altText,
        fabricId: image.fabricId,
        fabric: image.fabric!,
        isDefault: index === 0,
      }));
  const coverImages = rawCoverImages.map((coverImage, index) => ({
    id: String(coverImage.id),
    image: resolveAssetUrl(coverImage.imagePath),
    alt: coverImage.altText ?? `${product.name} ${coverImage.fabric.name}`,
    sortOrder: index + 1,
    fabricId: String(coverImage.fabricId ?? coverImage.fabric.id),
    fabric: mapFabric(coverImage.fabric),
    isDefault: coverImage.isDefault ?? index === 0,
  }));
  const rawThubnailImages =
    product.coverImages ??
    product.images
      .filter((image) => image.imageType === "THUMBNAIL" && image.fabric)
      .map((image, index) => ({
        id: image.id,
        imagePath: image.imagePath,
        altText: image.altText,
        fabricId: image.fabricId,
        fabric: image.fabric!,
        isDefault: index === 0,
      }));  
  const thumbnailImages = rawThubnailImages.map((coverImage, index) => ({
    id: String(coverImage.id),
    image: resolveAssetUrl(coverImage.imagePath),
    alt: coverImage.altText ?? `${product.name} ${coverImage.fabric.name}`,
    sortOrder: index + 1,
    fabricId: String(coverImage.fabricId ?? coverImage.fabric.id),
    fabric: mapFabric(coverImage.fabric),
    isDefault: coverImage.isDefault ?? index === 0,
  }));
  const fabrics = (product.fabrics ?? []).map(mapFabric);
  const images = product.images
    .filter((image) => image.imageType !== "COVER")
    .filter((image) => image.imageType !== "THUMBNAIL")
    .map((image) => ({
      id: String(image.id),
      image: resolveAssetUrl(image.imagePath ?? image.path),
      alt: image.altText ?? undefined,
      sortOrder: image.sortOrder,
    }));

  return {
    id: String(product.id),
    name: product.name,
    slug: product.slug,
    sku: primaryVariant?.sku ?? product.slug,
    variantId: primaryVariant?.id,
    shortDescription: product.shortDescription ?? "",
    description: product.description ?? "",
    category: mapCategory(product.category),
    brand: "SleepBull",
    price,
    salePrice,
    discount,
    stock: variants.reduce((total, variant) => total + variant.stock, 0),
    rating: 4.8,
    reviewCount: 0,
    thickness: specValue(product.specifications, "Height"),
    size: primaryVariant?.size ?? "",
    warranty: specValue(product.specifications, "Warranty"),
    images,
    variants,
    fabrics,
    coverImages,
    thumbnailImages,
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
