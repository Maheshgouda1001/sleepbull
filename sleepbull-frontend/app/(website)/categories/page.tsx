import { Metadata } from "next";

import CollectionCategorySection from "@/components/category/CollectionCategorySection";

import { getCategories } from "@/services/category.service";

import { generateSEO } from "@/config/seo";

export const metadata: Metadata = generateSEO({
  title: "Shop Categories",
  url: "/categories",
});

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <CollectionCategorySection
        categories={categories}
        collection="mattresses"
      />

      <CollectionCategorySection
        categories={categories}
        collection="pillows"
      />
    </>
  );
}