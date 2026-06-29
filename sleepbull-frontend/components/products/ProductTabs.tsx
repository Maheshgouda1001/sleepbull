import { Product } from "@/types/product";
import Container from "@/components/layout/Container";

interface Props {
  product: Product;
}

export default function ProductTabs({ product }: Props) {
  return (
    <section className="border-t border-border bg-section py-16">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">Product Details</h2>

          <p className="mt-6 leading-8 text-text-secondary">
            {product.description || product.shortDescription}
          </p>

          {product.specifications.length > 0 && (
            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {product.specifications.map((spec) => (
                <div
                  key={`${spec.title}-${spec.value}`}
                  className="rounded-2xl border border-border bg-background p-4"
                >
                  <dt className="text-sm font-medium text-text-light">
                    {spec.title}
                  </dt>
                  <dd className="mt-1 font-semibold text-text-primary">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Container>
    </section>
  );
}
