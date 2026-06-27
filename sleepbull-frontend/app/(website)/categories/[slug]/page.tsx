import { Metadata } from "next";

import ProductListing from "@/components/products/ProductListing";

import { getProductsByCategory } from "@/services/product.service";

import { capitalize } from "@/lib/helpers";
import { generateSEO } from "@/config/seo";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  return generateSEO({
    title: capitalize(slug.replace(/-/g, " ")),
    url: `/categories/${slug}`,
  });
}

export default async function CategoryDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const products =
    await getProductsByCategory(slug);

  return (
    <ProductListing
      products={products}
      title={capitalize(slug.replace(/-/g, " "))}
    />
  );
}