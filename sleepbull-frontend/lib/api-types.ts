export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imagePath?: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProductImage {
  id: string;
  imagePath: string;
  path?: string;
  altText?: string | null;
  sortOrder: number;
}

export interface ApiDecimal {
  s?: number;
  e?: number;
  d?: number[];
}

export type ApiNumber = string | number | ApiDecimal;

export interface ApiProductVariant {
  id: string;
  sku: string;
  size: string;
  firmness?: string | null;
  price: ApiNumber;
  compareAtPrice?: ApiNumber | null;
  stock: number;
  isActive: boolean;
}

export interface ApiProductSpecification {
  id: string;
  key: string;
  value: string;
  sortOrder: number;
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  basePrice: ApiNumber;
  compareAtPrice?: ApiNumber | null;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  category: ApiCategory;
  images: ApiProductImage[];
  variants: ApiProductVariant[];
  specifications: ApiProductSpecification[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiPaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiPaginated<T> {
  items: T[];
  meta: ApiPaginatedMeta;
}

export interface ApiPaginatedProducts extends ApiPaginated<ApiProduct> {}

export interface ApiFaq {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface ApiBlog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiTestimonial {
  id: string;
  name: string;
  role?: string | null;
  quote: string;
  rating: number;
  imagePath?: string | null;
}
