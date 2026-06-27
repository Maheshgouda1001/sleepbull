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
    <section className="py-28">

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <div>

            <span className="uppercase tracking-[4px] text-slate-500">

              Why SleepBull

            </span>

            <h2 className="mt-5 text-5xl font-bold">

              Designed For Better Sleep

            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">

              Every SleepBull mattress is crafted
              with premium materials to ensure
              superior comfort, healthy posture,
              and uninterrupted sleep.

            </p>

            <div className="mt-10 grid gap-5">

              {features.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <div className="h-3 w-3 rounded-full bg-green-500" />

                  <span>{item}</span>

                </div>

              ))}

            </div>

          </div>

          <div className="aspect-square rounded-[40px] bg-slate-200" />

        </div>

      </Container>
    </section>
  );
}