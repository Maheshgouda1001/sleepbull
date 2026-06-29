interface Props {
    children: React.ReactNode;
    className?: string;
  }
  
  export default function Card({
    children,
    className,
  }: Props) {
    return (
      <div
        className={`rounded-3xl border border-border bg-background shadow-sm transition hover:shadow-xl ${className}`}
      >
        {children}
      </div>
    );
  }
