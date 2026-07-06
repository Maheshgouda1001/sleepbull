import { ProductImageType } from '@prisma/client';

type ProductImageRecord = {
  id: bigint;
  imagePath: string;
  altText?: string | null;
  imageType: ProductImageType;
  sortOrder: number;
  fabricId?: bigint | null;
  fabric?: {
    id: bigint;
    name: string;
    slug: string;
    thumbnailPath: string;
    description?: string | null;
    sortOrder: number;
    isActive: boolean;
  } | null;
};

type ProductRecord = {
  images?: ProductImageRecord[];
  [key: string]: unknown;
};

export function serializeProductImages<T extends ProductRecord>(
  product: T,
  fabrics: Array<Record<string, unknown>> = []
) {
  const allImages = product.images ?? [];
  const coverImages = allImages
    .filter((image) => image.imageType === ProductImageType.COVER && image.fabric)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((image, index) => ({
      id: image.id,
      imagePath: image.imagePath,
      altText: image.altText,
      fabric: image.fabric,
      isDefault: index === 0
    }));

    const thumbnailImages = allImages
    .filter((image) => image.imageType === ProductImageType.THUMBNAIL && image.fabric)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((image, index) => ({
      id: image.id,
      imagePath: image.imagePath,
      altText: image.altText,
      fabric: image.fabric,
      isDefault: index === 0
    }));
  const images = allImages
    .filter(
      (image) =>
        image.imageType === ProductImageType.GALLERY ||
        image.imageType === ProductImageType.THUMBNAIL ||
        image.imageType === ProductImageType.ZOOM
    )
    .sort((left, right) => left.sortOrder - right.sortOrder);

  const { images: _images, ...rest } = product;
  return {
    ...rest,
    images,
    thumbnailImages,
    coverImages,
    fabrics
  };
}
