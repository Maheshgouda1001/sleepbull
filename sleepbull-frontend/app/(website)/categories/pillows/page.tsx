import { Metadata } from "next";

import ProductListing from "@/components/products/ProductListing";

import { getAllPillows } from "@/services/product.service";
import { generateSEO } from "@/config/seo";

export const metadata: Metadata = generateSEO({
  title: "Shop Pillows",
  description:
    "Browse memory foam, latex, and fiber pillows designed for neck support and better sleep.",
  url: "/categories/pillows",
});

export default async function PillowsPage() {
  const products = await getAllPillows();

  return (
    <ProductListing
      title="Pillows"
      products={products}
    />
  );
}
