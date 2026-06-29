import Link from "next/link";

import Container from "@/components/layout/Container";

export default function OfferBanner() {
  return (
    <section className="py-14">

      <Container>

        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-hover to-primary px-6 py-10 text-center text-text-white sm:px-10">

          <p className="text-xs font-bold uppercase tracking-[4px] text-text-white/75">

            Limited Time Offer

          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">

            Save Up To 40%

          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-text-white/75">

            Upgrade your sleep experience with exclusive
            launch offers across all premium collections.

          </p>

          <Link
            href="/offers"
            className="mt-6 inline-flex rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-text-white transition hover:bg-secondary-hover"
          >
            Shop Offers
          </Link>

        </div>

      </Container>
    </section>
  );
}
