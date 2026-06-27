import Link from "next/link";

import Container from "@/components/layout/Container";

const categories = [
  {
    name: "Mattresses",
    slug: "mattresses",
    image: "/images/categories/mattress.jpg",
  },
  {
    name: "Pillows",
    slug: "pillows",
    image: "/images/categories/pillow.jpg",
  },
  {
    name: "Bed Frames",
    slug: "bed-frames",
    image: "/images/categories/bed.jpg",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "/images/categories/accessories.jpg",
  },
];

export default function CategorySection() {
  return (
    <section className="py-24">

      <Container>

        <div className="mb-12 text-center">

          <h2 className="text-4xl font-bold">
            Shop By Category
          </h2>

          <p className="mt-4 text-slate-500">
            Everything you need for a better sleep.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (

            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-3xl border bg-white p-8 transition hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="mb-8 h-48 rounded-2xl bg-slate-100" />

              <h3 className="text-xl font-semibold">
                {category.name}
              </h3>

            </Link>

          ))}

        </div>

      </Container>

    </section>
  );
}