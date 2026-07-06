"use client";

import Image from "next/image";

import { Product } from "@/types/product";

import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import ProductActions from "./ProductActions";

interface Props {
  product: Product;
  selectedProduct: Product;
  selectedVariantId: string;
  selectedFabricId: string;
  onVariantChange: (variantId: string) => void;
  onFabricChange: (fabricId: string) => void;
}

export default function ProductInfo({
  product,
  selectedProduct,
  selectedVariantId,
  selectedFabricId,
  onVariantChange,
  onFabricChange,
}: Props) {
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ??
    product.variants[0];
  const selectedFabric =
    product.fabrics.find((fabric) => fabric.id === selectedFabricId) ??
    product.fabrics[0];

  return (
    <div>

      <p className="text-text-light">

        {product.category.name}

      </p>

      <h1 className="mt-3 text-5xl font-bold">

        {product.name}

      </h1>

      <div className="mt-5">

        <ProductRating
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

      </div>

      <div className="mt-8">

        <ProductPrice
          price={selectedProduct.price}
          salePrice={selectedProduct.salePrice}
        />

      </div>

      <p className="mt-8 leading-8 text-text-secondary">

        {product.shortDescription}

      </p>

      {product.variants.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[1.4px] text-text-light">
            Size
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {product.variants.map((variant) => {
              const isSelected = variant.id === selectedVariant?.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => onVariantChange(variant.id)}
                  className={`min-h-14 rounded-xl border px-3 text-left transition ${
                    isSelected
                      ? "border-primary bg-primary text-text-white shadow-sm"
                      : "border-border bg-white text-text-primary hover:border-primary/50"
                  }`}
                >
                  <span className="block font-bold">{variant.size}</span>
                  {variant.firmness && (
                    <span
                      className={`block text-xs ${
                        isSelected ? "text-white/70" : "text-text-light"
                      }`}
                    >
                      {variant.firmness}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {product.fabrics.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[1.4px] text-text-light">
            Fabric
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {product.fabrics.map((fabric) => {
              const isSelected = fabric.id === selectedFabric?.id;

              return (
                <button
                  key={fabric.id}
                  type="button"
                  onClick={() => onFabricChange(fabric.id)}
                  className={`flex min-h-16 items-center gap-3 rounded-xl border px-3 text-left transition ${
                    isSelected
                      ? "border-secondary bg-secondary/15 text-primary"
                      : "border-border bg-white text-text-primary hover:border-secondary/60"
                  }`}
                >
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border bg-section">
                    <Image
                      src={fabric.thumbnail}
                      alt={fabric.name}
                      fill
                      sizes="36px"
                      unoptimized={fabric.thumbnail.startsWith("/api/assets/")}
                      className="object-cover"
                    />
                  </span>
                  <span className="block font-bold">{fabric.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <ProductActions product={selectedProduct} />

    </div>
  );
}
