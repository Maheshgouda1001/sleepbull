import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "Checkout",
  url: "/checkout",
});

export default function CheckoutPage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Checkout</h1>
      <p className="mt-4 text-slate-600">Checkout is coming soon.</p>
    </Container>
  );
}
