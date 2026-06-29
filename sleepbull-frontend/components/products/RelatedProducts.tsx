import Container from "@/components/layout/Container";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <Container>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          You May Also Like
        </h2>

        <div className="max-h-[560px] space-y-4 overflow-y-auto pr-1 sm:max-h-none sm:space-y-0 sm:overflow-visible sm:pr-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                compact
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
