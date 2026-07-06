import { Category } from "./category";

export interface ProductImage {
    id: string;
    image: string;
    alt?: string;
    sortOrder: number;
  }

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  firmness?: string;
  lengthCm?: number;
  widthCm?: number;
  heightInch?: number;
  price: number;
  compareAtPrice?: number;
  salePrice: number;
  stock: number;
  isDefault: boolean;
}

export interface ProductFabric {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  description?: string;
}

export interface ProductCoverImage extends ProductImage {
  fabricId: string;
  fabric: ProductFabric;
  isDefault: boolean;
}

export interface ProductThumbnailImage extends ProductImage {
  fabricId: string;
  fabric: ProductFabric;
  isDefault: boolean;
}

export interface ProductSpecification {
  title: string;

  value: string;
}

export interface ProductReview {
  id: string;

  customerName: string;

  rating: number;

  review: string;

  createdAt: string;
}

export interface Product {
  id: string;

  name: string;

  slug: string;

  sku: string;

  variantId?: string;

  fabricId?: string;

  fabric?: string;

  cartKey?: string;

  shortDescription: string;

  description: string;

  category: Category;

  brand: string;

  price: number;

  salePrice: number;

  discount: number;

  stock: number;

  rating: number;

  reviewCount: number;

  thickness: string;

  size: string;

  warranty: string;

  images: ProductImage[];

  variants: ProductVariant[];

  fabrics: ProductFabric[];

  coverImages: ProductCoverImage[];

  thumbnailImages: ProductThumbnailImage[];

  specifications: ProductSpecification[];

  reviews: ProductReview[];

  isFeatured: boolean;

  isBestSeller: boolean;

  isActive: boolean;

  metaTitle?: string;

  metaDescription?: string;

  createdAt: string;

  updatedAt: string;
}
