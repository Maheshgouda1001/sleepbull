interface BadgeProps {
    children: React.ReactNode;
    color?:
      | "primary"
      | "success"
      | "danger"
      | "warning";
  }
  
  export default function Badge({
    children,
    color = "primary",
  }: BadgeProps) {
    const colors = {
      primary:
        "bg-primary text-text-white",
  
      success:
        "bg-green-600 text-white",
  
      warning:
        "bg-yellow-500 text-white",
  
      danger:
        "bg-red-600 text-white",
    };
  
    return (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors[color]}`}
      >
        {children}
      </span>
    );
  }
