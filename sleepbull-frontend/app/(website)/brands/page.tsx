import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "Brands",
  url: "/brands",
});

export default function BrandsPage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Our Brands</h1>
      <p className="mt-4 text-slate-600">Brand listings are coming soon.</p>
    </Container>
  );
}
