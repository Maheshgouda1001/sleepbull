import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="max-w-2xl lg:pl-2">

      <span className="inline-flex max-w-full rounded-full bg-secondary px-3.5 py-2 text-[11px] font-bold uppercase tracking-[1.8px] text-text-white sm:px-4">

        India's Premium Sleep Brand

      </span>

      <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-text-primary sm:text-5xl xl:text-6xl">

        Sleep Better.

        <br />

        Wake Happier.

      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">

        Experience luxurious comfort with premium orthopedic
        mattresses designed to improve posture,
        reduce back pain and transform your sleep.

      </p>

      <HeroButtons />

      <HeroStats />

    </div>
  );
}
