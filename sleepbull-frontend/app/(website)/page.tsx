import Hero from "@/components/home/Hero";
import CollectionCategorySection from "@/components/category/CollectionCategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import OfferBanner from "@/components/home/OfferBanner";
import WhyChooseSleepBull from "@/components/home/WhyChooseSleepBull";
import TrustSection from "@/components/home/TrustSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

import { generateSEO } from "@/config/seo";
import { getCategories } from "@/services/category.service";
import {
  getFeaturedPillows,
  getFeaturedProducts,
} from "@/services/product.service";
import { getTestimonials } from "@/services/testimonial.service";

export const metadata = generateSEO({
  title: "Premium Mattresses & Pillows for Better Sleep",
  url: "/",
});

export default async function HomePage() {
  const [categories, featuredProducts, featuredPillows, testimonials] =
    await Promise.all([
      getCategories(),
      getFeaturedProducts(4),
      getFeaturedPillows(4),
      getTestimonials(),
    ]);

  const apiConnected =
    categories.length > 0 ||
    featuredProducts.length > 0 ||
    featuredPillows.length > 0;

  return (
    <>
      {!apiConnected && (
        <div className="bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
          Could not load data from the backend. Make sure{" "}
          <code className="rounded bg-amber-100 px-1">
            http://localhost:4000
          </code>{" "}
          is running, then refresh this page.
        </div>
      )}

      <Hero />

      <TrustSection />

      <CollectionCategorySection
        categories={categories}
        collection="mattresses"
      />

      <FeaturedProducts products={featuredProducts} />

      <CollectionCategorySection
        categories={categories}
        collection="pillows"
      />

      <FeaturedProducts
        products={featuredPillows}
        title="Best Selling Pillows"
        viewAllHref="/categories/pillows"
      />

      <TestimonialsSection testimonials={testimonials} />

      <OfferBanner />

      <WhyChooseSleepBull />
    </>
  );
}
