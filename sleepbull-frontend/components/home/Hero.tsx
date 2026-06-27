import Container from "@/components/layout/Container";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">

      <Container>

        <div className="grid min-h-[720px] items-center gap-16 lg:grid-cols-2">

          <HeroContent />

          <HeroImage />

        </div>

      </Container>

    </section>
  );
}