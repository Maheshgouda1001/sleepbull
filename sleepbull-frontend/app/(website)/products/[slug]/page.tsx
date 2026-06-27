import { Metadata } from "next";
import { notFound } from "next/navigation";

import { generateSEO } from "@/config/seo";

import {
  getProduct,
  getRelatedProducts,
} from "@/services/product.service";

import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
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

        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">

          <ProductGallery
            product={product}
          />

          <ProductInfo
            product={product}
          />

        </div>

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