import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  tone = "light",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "light" | "mist" | "dark";
}) {
  const tones = {
    light: "bg-paper text-ink",
    mist: "bg-mist text-ink",
    dark: "bg-navy-deep text-white",
  };
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]",
        dark ? "text-brand" : "text-brand-strong",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
  dark,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div data-reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "mt-4 text-balance text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {copy && (
        <p className={cn("mt-5 text-pretty text-lg leading-relaxed", dark ? "text-white/70" : "text-slate")}>{copy}</p>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function Button({ href, variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-strong shadow-[0_6px_20px_-8px_rgba(242,105,13,0.6)]",
    secondary: "bg-paper text-ink ring-1 ring-line hover:ring-ink/30 dark:bg-mist",
    ghost: "text-ink hover:text-brand-strong",
    light: "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15",
  };
  const sizes = { md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-[15px]" };
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        variant !== "ghost" && sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn("h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      data-reveal
      className={cn(
        "rounded-2xl border border-line bg-paper p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatusBadge({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "muted" | "dark" }) {
  const tones = {
    brand: "bg-brand-soft text-brand-strong ring-brand/20",
    muted: "bg-mist text-slate ring-line",
    dark: "bg-white/10 text-white/80 ring-white/15",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1", tones[tone])}>
      {children}
    </span>
  );
}

/** Clean placeholder for content that is not yet verified or published. */
export function ComingSoon({ title, copy, cta }: { title: string; copy: ReactNode; cta?: { label: string; href: string } }) {
  return (
    <div
      data-reveal
      className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-ink/15 bg-mist/60 p-8 sm:p-10"
    >
      <StatusBadge tone="muted">
        <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand" /> Coming soon
      </StatusBadge>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="max-w-xl text-slate">{copy}</p>
      {cta && (
        <Button href={cta.href} variant="secondary">
          {cta.label} <Arrow />
        </Button>
      )}
    </div>
  );
}
