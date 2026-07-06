import Link from "next/link";

import Container from "@/components/layout/Container";
import { Category } from "@/types/category";
import { COLLECTIONS, type CollectionSlug } from "@/config/collections";
import { isCategoryInCollection } from "@/lib/mappers";

import CategoryGrid from "./CategoryGrid";

interface Props {
  categories: Category[];
  collection: CollectionSlug;
  viewAllHref?: string;
}

export default function CollectionCategorySection({
  categories,
  collection,
  viewAllHref,
}: Props) {
  const collectionCategories = categories
    .filter(
      (category) => category.isActive && isCategoryInCollection(category, collection)
    )
    .sort((left, right) => left.sortOrder - right.sortOrder);

  if (collectionCategories.length === 0) {
    return null;
  }

  const meta = COLLECTIONS[collection];

  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:mb-9 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[3px] text-text-light">
              Shop Collection
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              {meta.title}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
              {meta.description}
            </p>
          </div>

          <Link
            href={viewAllHref ?? meta.href}
            className="text-sm font-semibold text-primary hover:text-primary-hover"
          >
            View all {meta.title.toLowerCase()}
          </Link>
        </div>

        <CategoryGrid categories={collectionCategories} />
      </Container>
    </section>
  );
}
