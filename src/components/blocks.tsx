import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow, Button, Container, Eyebrow, cn } from "./ui";

export function PageHero({
  eyebrow,
  title,
  copy,
  children,
  crumbs,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  children?: ReactNode;
  crumbs?: { label: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <Container className="relative pb-20 pt-14 sm:pb-24 sm:pt-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]">
            {title}
          </h1>
          {copy && <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate sm:text-xl">{copy}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function CtaBanner({
  title = "Start with a conversation.",
  copy = "No pitch decks. No pressure. Just an honest conversation about what you need and whether this model fits.",
  primary = { label: "Let’s Talk", href: "/contact" },
  secondary = { label: "Explore Capabilities", href: "/capabilities" },
}: {
  title?: string;
  copy?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div
          data-reveal
          className="relative overflow-hidden rounded-[28px] bg-navy-deep px-7 py-14 text-white sm:px-14 sm:py-20"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-dark [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/25 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{copy}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={primary.href} size="lg">
                {primary.label} <Arrow />
              </Button>
              {secondary && (
                <Button href={secondary.href} size="lg" variant="light">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5 text-lg leading-relaxed text-slate [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_strong]:text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CheckList({ items, dark }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className={cn("flex gap-3 text-[16px] leading-relaxed", dark ? "text-white/80" : "text-ink")}>
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
            <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m2.5 6.2 2.2 2.2 4.8-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
