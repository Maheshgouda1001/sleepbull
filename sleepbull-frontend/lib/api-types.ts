export interface ApiCategory {
  id: string;
  categoryTypeId?: string;
  name: string;
  slug: string;
  description?: string | null;
  imagePath?: string | null;
  bannerPath?: string | null;
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
  imageType?: "COVER" | "GALLERY" | "THUMBNAIL" | "ZOOM";
  fabricId?: string | null;
  fabric?: ApiFabric | null;
  sortOrder: number;
}

export interface ApiFabric {
  id: string;
  name: string;
  slug: string;
  thumbnailPath: string;
  description?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface ApiProductCoverImage {
  id: string;
  imagePath: string;
  altText?: string | null;
  fabricId?: string | null;
  isDefault: boolean;
  fabric: ApiFabric;
}

export interface ApiCategoryType {
  id: string;
  name: string;
  slug: string;
}

export interface ApiCategoryWithType extends ApiCategory {
  categoryTypeId?: string;
  categoryType?: ApiCategoryType;
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
  lengthCm?: number | null;
  widthCm?: number | null;
  heightInch?: number | null;
  price: ApiNumber;
  compareAtPrice?: ApiNumber | null;
  stock: number;
  isDefault?: boolean;
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
  category: ApiCategoryWithType;
  images: ApiProductImage[];
  variants: ApiProductVariant[];
  fabrics?: ApiFabric[];
  coverImages?: ApiProductCoverImage[];
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
