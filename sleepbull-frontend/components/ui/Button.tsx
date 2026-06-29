import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  disabled,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300",

    {
      "bg-primary text-text-white hover:bg-primary-hover":
        variant === "primary",

      "bg-secondary text-text-white hover:bg-secondary-hover":
        variant === "secondary",

      "border border-border text-text-primary hover:bg-section":
        variant === "outline",

      "px-4 py-2 text-sm":
        size === "sm",

      "px-6 py-3":
        size === "md",

      "px-8 py-4 text-lg":
        size === "lg",
    },

    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
