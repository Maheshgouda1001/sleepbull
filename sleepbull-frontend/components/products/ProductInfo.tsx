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

      <p className="text-slate-500">

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

      <p className="mt-8 leading-8 text-slate-600">

        {product.shortDescription}

      </p>

      <button className="mt-10 w-full rounded-xl bg-slate-900 py-4 font-semibold text-white">

        Add To Cart

      </button>

    </div>
  );
}