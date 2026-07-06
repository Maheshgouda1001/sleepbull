import { generateSEO } from "@/config/seo";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata = generateSEO({
  title: "Checkout",
  url: "/checkout",
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
