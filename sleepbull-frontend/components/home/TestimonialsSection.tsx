import { Star } from "lucide-react";

import Container from "@/components/layout/Container";
import { Testimonial } from "@/services/testimonial.service";

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: Props) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-slate-50 py-28">
      <Container>
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Customer Stories
          </span>
          <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
            Loved by Sleepers Across India
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-white p-8"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="leading-8 text-slate-600">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-6">
                <p className="font-semibold">{item.name}</p>
                {item.role && (
                  <p className="text-sm text-slate-500">{item.role}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
