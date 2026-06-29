import Container from "@/components/layout/Container";

import TrustCard from "./TrustCard";
import { trustData } from "./trustData";

export default function TrustSection() {
  return (
    <section className="py-12 sm:py-14 lg:py-16">

      <Container>

        <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-10">

          <span className="text-xs font-bold uppercase tracking-[3px] text-text-light">

            Why Choose SleepBull

          </span>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">

            Designed for Better Sleep,
            Built for Better Living.

          </h2>

          <p className="mt-4 text-base leading-7 text-text-secondary">

            Every SleepBull mattress is engineered using premium
            materials, advanced sleep technology and expert craftsmanship
            to deliver exceptional comfort night after night.

          </p>

        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">

          {trustData.map((item) => (
            <TrustCard
              key={item.title}
              {...item}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}
