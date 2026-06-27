import Link from "next/link";

import Container from "@/components/layout/Container";

export default function OfferBanner() {
  return (
    <section className="py-20">

      <Container>

        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-10 py-20 text-center text-white">

          <p className="uppercase tracking-[5px] text-slate-300">

            Limited Time Offer

          </p>

          <h2 className="mt-6 text-5xl font-bold">

            Save Up To 40%

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">

            Upgrade your sleep experience with exclusive
            launch offers across all premium collections.

          </p>

          <Link
            href="/offers"
            className="mt-10 inline-flex rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Shop Offers
          </Link>

        </div>

      </Container>
    </section>
  );
}