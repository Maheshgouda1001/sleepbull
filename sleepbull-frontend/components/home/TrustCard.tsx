import { LucideIcon } from "lucide-react";

interface TrustCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function TrustCard({
  title,
  description,
  icon: Icon,
}: TrustCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="mb-6 inline-flex rounded-2xl bg-slate-900 p-4 text-white">

        <Icon size={28} />

      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500">
        {description}
      </p>

    </div>
  );
}