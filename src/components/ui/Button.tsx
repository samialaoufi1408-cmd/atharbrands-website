import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outlineLight" | "light" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-medium leading-none transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-offwhite hover:bg-gold-deep shadow-[0_14px_40px_-18px_rgba(120,109,141,0.75)] hover:shadow-[0_18px_50px_-16px_rgba(120,109,141,0.9)]",
  outline: "border border-ink/25 text-ink hover:border-gold hover:text-gold",
  outlineLight: "border border-gold/45 text-gold hover:border-gold hover:bg-gold/10",
  light: "bg-ink text-offwhite hover:bg-ink/90",
  ghost: "text-ink/80 hover:text-gold",
  whatsapp: "bg-[#1FA855] text-white hover:bg-[#1c9a4e]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (typeof props.href === "string") {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
