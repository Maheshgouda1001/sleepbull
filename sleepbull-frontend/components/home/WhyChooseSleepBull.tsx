import { CheckCircle2 } from "lucide-react";

import Container from "@/components/layout/Container";

const features = [
  "Premium Memory Foam",
  "Orthopedic Back Support",
  "100 Nights Risk Free Trial",
  "Breathable Fabric",
  "Motion Isolation",
  "10 Years Warranty",
];

export default function WhyChooseSleepBull() {
  return (
    <section className="py-16">

      <Container>

        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">

          <div>

            <span className="text-xs font-bold uppercase tracking-[3px] text-text-light">

              Why SleepBull

            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">

              Designed For Better Sleep

            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">

              Every SleepBull mattress is crafted
              with premium materials to ensure
              superior comfort, healthy posture,
              and uninterrupted sleep.

            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              {features.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-medium text-text-primary"
                >

                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-secondary"
                  />

                  <span>{item}</span>

                </div>

              ))}

            </div>

          </div>

          <div className="rounded-3xl bg-primary p-6 text-text-white shadow-2xl lg:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["100", "Night trial"],
                ["10", "Year warranty"],
                ["0", "Delivery fee"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-text-white/15 bg-text-white/10 p-5"
                >
                  <p className="text-3xl font-bold">{value}</p>
                  <p className="mt-1 text-sm text-text-white/70">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-background p-5 text-text-primary">
              <p className="text-sm font-bold uppercase tracking-[2px] text-secondary">
                Built for daily comfort
              </p>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Premium foam layers, breathable quilting and resilient support
                work together to keep the mattress comfortable night after
                night.
              </p>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
