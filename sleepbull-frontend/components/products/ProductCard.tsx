import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import { capitalize } from "@/lib/helpers";

import ProductBadge from "./ProductBadge";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const imageSrc =
    product.images[0]?.image ?? "/images/placeholder.svg";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
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
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {product.category.name}
        </p>

        <h3 className="mt-2 text-xl font-bold text-slate-900">
          {product.name}
        </h3>

        <div className="mt-3">
          <ProductRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        <div className="mt-4">
          <ProductPrice
            price={product.price}
            salePrice={product.salePrice}
          />
        </div>

        {product.shortDescription && (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
            {capitalize(product.shortDescription)}
          </p>
        )}
      </div>
    </Link>
  );
}
