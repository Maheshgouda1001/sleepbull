import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "Wishlist",
  url: "/wishlist",
});

export default function WishlistPage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Wishlist</h1>
      <p className="mt-4 text-slate-600">Your wishlist is empty.</p>
    </Container>
  );
}
