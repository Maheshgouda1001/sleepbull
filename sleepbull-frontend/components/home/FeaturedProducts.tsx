import Link from "next/link";

import Container from "@/components/layout/Container";

import ProductGrid from "@/components/products/ProductGrid";

import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function FeaturedProducts({
  products,
}: Props) {
  return (
    <section className="py-28 bg-slate-50">

      <Container>

        <div className="mb-14 flex items-end justify-between">

          <div>

            <span className="font-semibold uppercase tracking-[4px] text-slate-500">

              Featured Collection

            </span>

            <h2 className="mt-4 text-5xl font-bold">

              Best Selling Mattresses

            </h2>

          </div>

          <Link
            href="/categories/mattresses"
            className="hidden lg:block font-medium hover:underline"
          >
            View All →
          </Link>

        </div>

        <ProductGrid
          products={products}
        />

      </Container>
    </section>
  );
}