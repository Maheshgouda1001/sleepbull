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
    <div className="flex h-full gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">

      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-text-white">

        <Icon size={20} />

      </div>

      <div>
        <h3 className="text-base font-semibold text-text-primary">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-text-light">
          {description}
        </p>
      </div>

    </div>
  );
}
