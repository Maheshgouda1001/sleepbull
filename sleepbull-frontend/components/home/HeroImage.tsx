import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative">

      <div className="absolute -left-16 -top-10 h-56 w-56 rounded-full bg-blue-100 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-100 blur-3xl" />

      <Image
        src="/images/hero-mattress.png"
        alt="SleepBull Premium Mattress"
        width={900}
        height={700}
        priority
        className="relative z-10"
      />

    </div>
  );
}