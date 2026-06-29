import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import { capitalize } from "@/lib/helpers";

import ProductBadge from "./ProductBadge";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({
  product,
  compact = false,
}: ProductCardProps) {
  const imageSrc =
    product.images[0]?.image ?? "/images/placeholder.svg";
  const skipImageOptimization =
    imageSrc.startsWith("http://") ||
    imageSrc.startsWith("https://") ||
    imageSrc.startsWith("/api/assets/");

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block h-full rounded-2xl border border-border bg-background p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-3"
    >
      <div
        className={
          compact
            ? "relative aspect-[5/3] overflow-hidden rounded-xl bg-section"
            : "relative aspect-[4/3] overflow-hidden rounded-xl bg-section"
        }
      >
        <ProductBadge
          isFeatured={product.isFeatured}
          isBestSeller={product.isBestSeller}
          discount={product.discount}
        />

        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          unoptimized={skipImageOptimization}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className={compact ? "px-1 pb-1 pt-3" : "px-1 pb-1 pt-4"}>
        <p className="text-[10px] font-bold uppercase tracking-[1.3px] text-text-light sm:text-[11px]">
          {product.category.name}
        </p>

        <h3
          className={
            compact
              ? "mt-1 line-clamp-1 text-sm font-bold text-text-primary"
              : "mt-1.5 text-base font-bold text-text-primary"
          }
        >
          {product.name}
        </h3>

        <div className={compact ? "mt-1.5" : "mt-2"}>
          <ProductRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        <div className={compact ? "mt-2" : "mt-3"}>
          <ProductPrice
            price={product.price}
            salePrice={product.salePrice}
            compact={compact}
          />
        </div>

        {!compact && product.shortDescription && (
          <p className="mt-3 line-clamp-2 text-xs leading-5 text-text-light">
            {capitalize(product.shortDescription)}
          </p>
        )}
      </div>
    </Link>
  );
}
