interface Props {
    subtitle?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
  }
  
  export default function SectionHeading({
    subtitle,
    title,
    description,
    align = "center",
  }: Props) {
    return (
      <div
        className={`mb-16 ${
          align === "center"
            ? "text-center"
            : "text-left"
        }`}
      >
        {subtitle && (
          <p className="font-semibold uppercase tracking-[4px] text-slate-500">
            {subtitle}
          </p>
        )}
  
        <h2 className="mt-4 text-5xl font-bold">
          {title}
        </h2>
  
        {description && (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500">
            {description}
          </p>
        )}
      </div>
    );
  }