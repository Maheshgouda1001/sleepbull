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
    <section className="bg-section py-16">
      <Container>
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-text-light">
            Customer Stories
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
            Loved by Sleepers Across India
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-secondary text-secondary"
                  />
                ))}
              </div>

              <p className="text-sm leading-7 text-text-secondary">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-6">
                <p className="font-semibold">{item.name}</p>
                {item.role && (
                  <p className="text-sm text-text-light">{item.role}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
