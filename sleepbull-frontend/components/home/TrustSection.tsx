import Container from "@/components/layout/Container";

import TrustCard from "./TrustCard";
import { trustData } from "./trustData";

export default function TrustSection() {
  return (
    <section className="py-24">

      <Container>

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">

            Why Choose SleepBull

          </span>

          <h2 className="mt-4 text-4xl font-bold lg:text-5xl">

            Designed for Better Sleep,
            Built for Better Living.

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Every SleepBull mattress is engineered using premium
            materials, advanced sleep technology and expert craftsmanship
            to deliver exceptional comfort night after night.

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

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