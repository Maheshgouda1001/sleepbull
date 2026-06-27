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
      className="group block overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden">

        <Image
          src={
            category.image ||
            "/images/category-placeholder.svg"
          }
          alt={category.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Content */}

        <div className="absolute bottom-0 left-0 right-0 p-8">

          <h3 className="text-3xl font-bold text-white">

            {category.name}

          </h3>

          <p className="mt-2 text-white/80">

            Discover Collection

          </p>

        </div>

      </div>

    </Link>
  );
}