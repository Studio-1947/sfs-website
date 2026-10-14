import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const pillClasses: Record<"primary" | "dark" | "secondary", string> = {
  primary: "bg-brand-green text-white hover:bg-brand-green-dark",
  dark: "bg-brand-black text-white hover:bg-brand-ink dark:bg-white/10 dark:hover:bg-white/15",
  secondary:
    "border-2 border-brand-black bg-transparent text-brand-black hover:border-brand-green hover:text-brand-green dark:border-white/70 dark:text-white dark:hover:border-brand-green dark:hover:text-brand-green",
};

const circleClasses: Record<"primary" | "dark" | "secondary", string> = {
  primary: "bg-white text-brand-green",
  dark: "bg-brand-green text-white",
  secondary:
    "bg-brand-black text-white transition-colors group-hover:bg-brand-green dark:bg-white dark:text-brand-black",
};

const ghostClasses =
  "bg-transparent px-5 py-2.5 text-brand-black hover:text-brand-green dark:text-white dark:hover:text-brand-green";

function PillContent({ variant, children }: { variant: "primary" | "dark" | "secondary"; children: React.ReactNode }) {
  return (
    <>
      <span className="pl-6">{children}</span>
      <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${circleClasses[variant]}`}>
        <ArrowIcon className="h-4 w-4" />
      </span>
    </>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center rounded-full text-[15px] font-semibold transition-colors ${ghostClasses} ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 text-[15px] font-semibold transition-colors ${pillClasses[variant]} ${className}`}
    >
      <PillContent variant={variant}>{children}</PillContent>
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  if (variant === "ghost") {
    return (
      <button
        className={`inline-flex items-center rounded-full text-[15px] font-semibold transition-colors ${ghostClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={`group inline-flex items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 text-[15px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${pillClasses[variant]} ${className}`}
      {...props}
    >
      <PillContent variant={variant}>{children}</PillContent>
    </button>
  );
}
