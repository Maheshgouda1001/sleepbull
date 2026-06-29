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
    <section className="bg-section py-12 sm:py-14 lg:py-16">

      <Container>

        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-9">

          <div>

            <span className="text-xs font-bold uppercase tracking-[3px] text-text-light">

              Featured Collection

            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">

              Best Selling Mattresses

            </h2>

          </div>

          <Link
            href="/categories/mattresses"
            className="hidden text-sm font-semibold text-primary hover:text-primary-hover lg:block"
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
