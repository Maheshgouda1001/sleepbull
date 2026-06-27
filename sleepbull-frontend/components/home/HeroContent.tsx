import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div>

      <span className="inline-flex rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-700">

        India's Premium Sleep Brand

      </span>

      <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900 lg:text-7xl">

        Sleep Better.

        <br />

        Wake Happier.

      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">

        Experience luxurious comfort with premium orthopedic
        mattresses designed to improve posture,
        reduce back pain and transform your sleep.

      </p>

      <HeroButtons />

      <HeroStats />

    </div>
  );
}