import { Metadata } from "next";

import CategorySection from "@/components/category/CategorySection";

import { getCategories } from "@/services/category.service";

import { generateSEO } from "@/config/seo";

export const metadata: Metadata = generateSEO({
  title: "Shop Categories",
  url: "/categories",
});

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <CategorySection
      categories={categories}
    />
  );
}