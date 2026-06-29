"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductGallery({
  product,
}: Props) {
  const images = useMemo(
    () =>
      product.images.length > 0
        ? product.images
        : [
            {
              id: "placeholder",
              image: "/images/placeholder.svg",
              alt: product.name,
              sortOrder: 0,
            },
          ],
    [product.images, product.name]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const shouldSkipOptimization = (src: string) =>
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/api/assets/");

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[88px_minmax(0,1fr)]">
      <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:max-h-[620px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:pr-1">
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${image.alt ?? product.name}`}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-background p-1 transition ${
                isActive
                  ? "border-secondary ring-2 ring-secondary/30"
                  : "border-border hover:border-primary"
              }`}
            >
              <Image
                src={image.image}
                alt={image.alt ?? product.name}
                fill
                sizes="80px"
                unoptimized={shouldSkipOptimization(image.image)}
                className="rounded-lg object-cover"
              />
            </button>
          );
        })}
      </div>

      <div className="order-1 lg:order-2">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-section p-3 shadow-sm">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-background">
            <Image
              src={activeImage.image}
              alt={activeImage.alt ?? product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized={shouldSkipOptimization(activeImage.image)}
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous product image"
                className="absolute left-5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-primary shadow transition hover:bg-background"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next product image"
                className="absolute right-5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-primary shadow transition hover:bg-background"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-5 right-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-text-white">
                {activeIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
