import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const Button = ({ href, children, variant = "primary", className = "" }: ButtonProps) => {
  const baseClass =
    "inline-flex w-full items-center justify-center gap-2 rounded-sm border px-6 py-2.5 text-sm font-semibold transition-all duration-180 sm:w-auto";
  const variantClass =
    variant === "primary"
      ? "border-primary bg-primary text-primary-foreground hover:bg-accent-secondary"
      : "border-(--border) text-foreground hover:border-muted-foreground hover:bg-accent";

  return (
    <Link href={href} className={`${baseClass} ${variantClass} ${className}`.trim()}>
      {children}
    </Link>
  );
};

export default Button;
