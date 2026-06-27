import Container from "@/components/layout/Container";

import { Category } from "@/types/category";

import CategoryGrid from "./CategoryGrid";

interface Props {
  categories: Category[];
}

export default function CategorySection({
  categories,
}: Props) {
  return (
    <section className="py-28">

      <Container>

        <div className="mb-20 text-center">

          <span className="font-semibold uppercase tracking-[4px] text-slate-500">

            Shop Collection

          </span>

          <h2 className="mt-5 text-5xl font-bold">

            Find Your Perfect Sleep

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">

            Explore our thoughtfully designed sleep
            products crafted for every comfort level,
            sleeping style and lifestyle.

          </p>

        </div>

        <CategoryGrid
          categories={categories}
        />

      </Container>

    </section>
  );
}