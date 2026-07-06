import { generateSEO } from "@/config/seo";
import CartClient from "@/components/cart/CartClient";

export const metadata = generateSEO({
  title: "Cart",
  url: "/cart",
});

export default function CartPage() {
  return <CartClient />;
}
