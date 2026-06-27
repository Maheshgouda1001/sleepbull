import { Product } from "@/types/product";
import Container from "@/components/layout/Container";

interface Props {
  product: Product;
}

export default function ProductTabs({ product }: Props) {
  return (
    <section className="border-t bg-slate-50 py-16">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">Product Details</h2>

          <p className="mt-6 leading-8 text-slate-600">
            {product.description || product.shortDescription}
          </p>

          {product.specifications.length > 0 && (
            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {product.specifications.map((spec) => (
                <div
                  key={`${spec.title}-${spec.value}`}
                  className="rounded-2xl border bg-white p-4"
                >
                  <dt className="text-sm font-medium text-slate-500">
                    {spec.title}
                  </dt>
                  <dd className="mt-1 font-semibold text-slate-900">
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
