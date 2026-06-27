import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "Cart",
  url: "/cart",
});

export default function CartPage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Your Cart</h1>
      <p className="mt-4 text-slate-600">Your cart is empty.</p>
    </Container>
  );
}
