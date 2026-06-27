import ProductListing from "@/components/products/ProductListing";
import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";
import { searchProducts } from "@/services/product.service";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;

  return generateSEO({
    title: q ? `Search: ${q}` : "Search",
    url: q ? `/search?q=${encodeURIComponent(q)}` : "/search",
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const products = query ? await searchProducts(query) : [];

  if (query) {
    return (
      <ProductListing
        title={`Results for "${query}"`}
        products={products}
      />
    );
  }

  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Search</h1>
      <p className="mt-4 text-slate-600">
        Use the search bar in the header to find mattresses.
      </p>
    </Container>
  );
}
