import ProductSkeleton from "@/components/products/ProductSkeleton";

export default function Loading() {
  return (
    <div className="grid gap-8 p-10 md:grid-cols-2 lg:grid-cols-4">

      {Array.from({ length: 8 }).map(
        (_, index) => (
          <ProductSkeleton key={index} />
        )
      )}

    </div>
  );
}