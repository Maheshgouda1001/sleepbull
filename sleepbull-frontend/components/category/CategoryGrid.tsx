import { Category } from "@/types/category";

import CategoryCard from "./CategoryCard";

interface Props {
  categories: Category[];
}

export default function CategoryGrid({
  categories,
}: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}

    </div>
  );
}