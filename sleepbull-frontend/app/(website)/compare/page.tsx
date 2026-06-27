import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "Compare",
  url: "/compare",
});

export default function ComparePage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Compare Products</h1>
      <p className="mt-4 text-slate-600">Product comparison is coming soon.</p>
    </Container>
  );
}
