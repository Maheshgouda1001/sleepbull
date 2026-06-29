import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block h-full rounded-2xl border border-border bg-background p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-section">

        <Image
          src={
            category?.image ||
            "/images/category-placeholder.svg"
          }
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />

        {/* Content */}

        <div className="absolute bottom-0 left-0 right-0 p-4">

          <h3 className="text-lg font-bold leading-tight text-white">

            {category.name}

          </h3>

          <p className="mt-1 text-xs font-medium text-white/80">

            Discover Collection

          </p>

        </div>

      </div>

    </Link>
  );
}
