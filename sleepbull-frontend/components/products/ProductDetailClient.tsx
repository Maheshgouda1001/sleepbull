"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/types/product";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const defaultVariant =
    product.variants.find((variant) => variant.id === product.variantId) ??
    product.variants[0];
  const defaultFabric =
    product.coverImages.find((image) => image.isDefault)?.fabric ??
    product.fabrics[0];
  const [selectedVariantId, setSelectedVariantId] = useState(
    defaultVariant?.id ?? ""
  );
  const [selectedFabricId, setSelectedFabricId] = useState(
    defaultFabric?.id ?? ""
  );

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.id === selectedVariantId) ??
      defaultVariant,
    [defaultVariant, product.variants, selectedVariantId]
  );
  const selectedFabric = useMemo(
    () =>
      product.fabrics.find((fabric) => fabric.id === selectedFabricId) ??
      defaultFabric,
    [defaultFabric, product.fabrics, selectedFabricId]
  );
  const selectedCoverImage = useMemo(
    () =>
      selectedFabric
        ? product.coverImages.find(
            (image) => image.fabricId === selectedFabric.id
          )
        : undefined,
    [product.coverImages, selectedFabric]
  );
  const galleryImages = useMemo(() => product.images, [product.images]);
  const displayImages = useMemo(
    () =>
      selectedCoverImage
        ? [selectedCoverImage, ...galleryImages]
        : galleryImages,
    [galleryImages, selectedCoverImage]
  );

  const selectedProduct = useMemo(
    () => ({
      ...product,
      sku: selectedVariant?.sku ?? product.sku,
      variantId: selectedVariant?.id ?? product.variantId,
      fabricId: selectedFabric?.id,
      fabric: selectedFabric?.name,
      cartKey: [
        product.id,
        selectedVariant?.id ?? "default",
        selectedFabric?.id ?? "default",
      ].join(":"),
      price: selectedVariant?.price ?? product.price,
      salePrice: selectedVariant?.salePrice ?? product.salePrice,
      stock: selectedVariant?.stock ?? product.stock,
      size: selectedVariant?.size ?? product.size,
      images: displayImages,
    }),
    [displayImages, product, selectedFabric, selectedVariant]
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
      <ProductGallery product={selectedProduct} />

      <ProductInfo
        product={product}
        selectedProduct={selectedProduct}
        selectedVariantId={selectedVariant?.id ?? ""}
        selectedFabricId={selectedFabric?.id ?? ""}
        onVariantChange={setSelectedVariantId}
        onFabricChange={setSelectedFabricId}
      />
    </div>
  );
}
