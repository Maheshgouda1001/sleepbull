import Container from "@/components/layout/Container";
import ProductGrid from "./ProductGrid";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <h2 className="mb-10 text-3xl font-bold">You May Also Like</h2>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
