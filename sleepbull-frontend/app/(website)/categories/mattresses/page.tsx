import { Metadata } from "next";

import ProductListing from "@/components/products/ProductListing";

import { getAllMattresses } from "@/services/product.service";
import { generateSEO } from "@/config/seo";

export const metadata: Metadata = generateSEO({
  title: "Shop Mattresses",
  description:
    "Browse premium comfort and orthopedic mattresses designed for better sleep.",
  url: "/categories/mattresses",
});

export default async function MattressesPage() {
  const products = await getAllMattresses();

  return (
    <ProductListing
      title="Mattresses"
      products={products}
    />
  );
}
