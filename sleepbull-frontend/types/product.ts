import { Category } from "./category";

export interface ProductImage {
    id: string;
    image: string;
    alt?: string;
    sortOrder: number;
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