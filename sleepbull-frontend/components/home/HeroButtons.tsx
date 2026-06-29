import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">

      <Link
        href="/categories/mattresses"
        className="rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-text-white shadow-sm transition hover:bg-secondary-hover"
      >
        Shop Collection
      </Link>

      <Link
        href="/about"
        className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition hover:bg-section"
      >
        Learn More
      </Link>

    </div>
  );
}
