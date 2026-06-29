import { Product } from "@/types/product";

import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface Props {
  product: Product;
}

export default function ProductInfo({
  product,
}: Props) {
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
          price={product.price}
          salePrice={product.salePrice}
        />

      </div>

      <p className="mt-8 leading-8 text-text-secondary">

        {product.shortDescription}

      </p>

      <button className="mt-10 w-full rounded-xl bg-primary py-4 font-semibold text-text-white hover:bg-primary-hover">

        Add To Cart

      </button>

    </div>
  );
}
