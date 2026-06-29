import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative w-full">

      <Image
        src="/images/hero-mattress.png"
        alt="SleepBull Premium Mattress"
        width={900}
        height={700}
        priority
        sizes="(max-width: 1024px) 100vw, 54vw"
        className="relative z-10 ml-auto w-full max-w-[760px] rounded-3xl shadow-2xl ring-1 ring-border"
      />

    </div>
  );
}
