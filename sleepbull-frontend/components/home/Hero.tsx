import Container from "@/components/layout/Container";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-section via-background to-background">

      <Container className="max-w-[1560px]">

        <div className="grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(520px,1fr)] lg:gap-14 xl:py-16">

          <HeroContent />

          <HeroImage />

        </div>

      </Container>

    </section>
  );
}
