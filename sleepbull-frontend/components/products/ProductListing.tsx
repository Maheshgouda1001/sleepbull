import Container from "@/components/layout/Container";

import ProductGrid from "./ProductGrid";

import SectionHeading from "@/components/ui/SectionHeading";

import { Product } from "@/types/product";

interface Props {
  title: string;
  products: Product[];
}

export default function ProductListing({
  title,
  products,
}: Props) {
  return (
    <section className="py-20">

      <Container>

        <SectionHeading
          title={title}
          subtitle="Collection"
        />

        <ProductGrid
          products={products}
        />

      </Container>

    </section>
  );
}