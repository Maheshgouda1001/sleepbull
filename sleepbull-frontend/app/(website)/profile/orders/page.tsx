import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "My Orders",
  url: "/profile/orders",
});

export default function OrdersPage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">My Orders</h1>
      <p className="mt-4 text-slate-600">You have no orders yet.</p>
    </Container>
  );
}
