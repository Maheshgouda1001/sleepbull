import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">

      <Link
        href="/categories/mattresses"
        className="rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-black"
      >
        Shop Collection
      </Link>

      <Link
        href="/about"
        className="rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-100"
      >
        Learn More
      </Link>

    </div>
  );
}
