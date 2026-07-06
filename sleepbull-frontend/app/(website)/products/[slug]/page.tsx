import { Metadata } from "next";
import { notFound } from "next/navigation";

import { generateSEO } from "@/config/seo";

import {
  getProduct,
  getRelatedProducts,
} from "@/services/product.service";

import ProductDetailClient from "@/components/products/ProductDetailClient";
import ProductTabs from "@/components/products/ProductTabs";
import RelatedProducts from "@/components/products/RelatedProducts";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return generateSEO({
      title: "Product Not Found",
    });
  }

  return generateSEO({
    title: product.metaTitle || product.name,
    description:
      product.metaDescription ||
      product.shortDescription,
    url: `/products/${product.slug}`,
  });
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts =
    await getRelatedProducts(product.category.slug);

  return (
    <>
      <section className="py-16">

        <ProductDetailClient product={product} />

      </section>

      <ProductTabs
        product={product}
      />

      <RelatedProducts
        products={relatedProducts}
      />
    </>
  );
}
