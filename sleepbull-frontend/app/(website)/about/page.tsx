import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";

export const metadata = generateSEO({
  title: "About Us",
  description:
    "Learn about SleepBull, our mission to deliver premium mattresses and sleep solutions designed for exceptional comfort, support, and healthier sleep.",
  url: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900">
            About SleepBull
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            At SleepBull, we believe that quality sleep is the foundation of a
            healthier and happier life. Our mission is to create thoughtfully
            designed mattresses and sleep essentials that combine comfort,
            durability, and innovation, helping every customer wake up refreshed
            every morning.
          </p>
        </div>

        <section className="mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Our Story
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              SleepBull was founded with a simple vision—to redefine the way
              people experience sleep. We noticed that finding the right
              mattress often meant compromising between comfort, support, and
              affordability. Our goal is to eliminate that compromise by
              offering premium sleep products designed for every type of sleeper.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Every SleepBull mattress is developed using carefully selected
              materials and modern sleep technology to provide optimal spinal
              support, pressure relief, breathability, and long-lasting
              performance.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Why Choose SleepBull?
            </h2>

            <ul className="mt-6 space-y-4 text-slate-600">
              <li>✔ Premium quality materials</li>
              <li>✔ Ergonomic support for healthier sleep</li>
              <li>✔ Breathable and temperature-friendly fabrics</li>
              <li>✔ Durable construction with long product life</li>
              <li>✔ Multiple mattress options for every sleeping style</li>
              <li>✔ Trusted customer support before and after purchase</li>
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-semibold text-slate-900">
            Our Mission
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Our mission is to make premium sleep accessible by delivering
            products that blend innovation, comfort, and reliability. We are
            committed to helping our customers improve their overall well-being
            through better sleep.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-slate-900">
            Our Vision
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            To become one of India&apos;s most trusted sleep solution brands by
            continuously innovating and providing exceptional products that
            enhance the quality of life for every household.
          </p>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-100 p-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Sleep Better. Live Better.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
            Whether you&apos;re looking for a natural latex mattress, an orthopedic
            solution, a responsive HR foam mattress, or premium pillows,
            SleepBull is committed to providing products that help you enjoy
            restful nights and energetic mornings.
          </p>
        </section>
      </div>
    </Container>
  );
}