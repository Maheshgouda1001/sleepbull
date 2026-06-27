import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "Offers",
  url: "/offers",
});

export default function OffersPage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Special Offers</h1>
      <p className="mt-4 text-slate-600">New offers are coming soon.</p>
    </Container>
  );
}
