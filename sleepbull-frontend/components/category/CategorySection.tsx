import Link from "next/link";

import Container from "@/components/layout/Container";
import { Category } from "@/types/category";

import CategoryGrid from "./CategoryGrid";

interface Props {
  categories: Category[];
}

export default function CategorySection({
  categories,
}: Props) {
  const featuredCategories = categories
    .filter((category) => category.isActive)
    .slice(0, 8);

  return (
    <section className="py-12 sm:py-14 lg:py-16">

      <Container>

        <div className="mb-8 flex flex-col gap-4 sm:mb-9 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[3px] text-text-light">
              Shop Collection
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              Find Your Perfect Sleep
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
              Explore our thoughtfully designed sleep
              products crafted for every comfort level,
              sleeping style and lifestyle.
            </p>
          </div>

          <Link
            href="/categories"
            className="text-sm font-semibold text-primary hover:text-primary-hover"
          >
            View all collections
          </Link>

        </div>

        <CategoryGrid
          categories={featuredCategories}
        />

      </Container>

    </section>
  );
}
