"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, type NavGroup } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Arrow, Button, cn } from "./ui";

function isActive(group: NavGroup, pathname: string) {
  return group.items.some((i) => i.href.split("#")[0] === pathname) || pathname.startsWith(group.href);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [drawerTop, setDrawerTop] = useState(72);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    // The drawer opens below the header, which sits lower while the announcement bar is visible.
    const place = () => setDrawerTop(headerRef.current?.getBoundingClientRect().bottom ?? 72);
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [mobileOpen]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-xl transition-shadow duration-300",
          (scrolled || mobileOpen) && "shadow-[0_10px_30px_-24px_rgba(29,37,48,0.5)]",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-inverse focus:px-4 focus:py-2 focus:text-sm focus:text-on-inverse"
        >
          Skip to content
        </a>
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="shrink-0" aria-label="TechnovAIte home">
            <Logo />
          </Link>

          <nav ref={navRef} aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((group) => {
                const expanded = open === group.label;
                const active = isActive(group, pathname);
                return (
                  <li
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => openMenu(group.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`menu-${group.label}`}
                      onClick={() => setOpen(expanded ? null : group.label)}
                      className={cn(
                        "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors",
                        expanded || active ? "text-ink" : "text-slate hover:text-ink",
                      )}
                    >
                      {group.label}
                      <Chevron open={expanded} />
                      {active && (
                        <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-brand" />
                      )}
                    </button>
                    <div
                      id={`menu-${group.label}`}
                      className={cn(
                        "absolute left-1/2 top-full pt-3 transition-all duration-200",
                        group.mega ? "-translate-x-[30%]" : "-translate-x-1/2",
                        expanded ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                      )}
                    >
                      <div
                        className={cn(
                          "overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-lift",
                          group.mega ? "w-[640px]" : "w-64",
                        )}
                      >
                        {group.mega ? (
                          <div className="grid grid-cols-[1fr_200px] gap-2">
                            <ul className="grid grid-cols-2 gap-1">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="block rounded-xl p-3 transition-colors hover:bg-mist"
                                  >
                                    <span className="block text-sm font-semibold text-ink">{item.label}</span>
                                    {item.description && (
                                      <span className="mt-1 block text-[13px] leading-snug text-slate">
                                        {item.description}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href="/contact"
                              className="group flex flex-col justify-between rounded-xl bg-navy-deep p-4 text-white"
                            >
                              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                                Start here
                              </span>
                              <span>
                                <span className="block text-[15px] font-semibold leading-snug">
                                  Not sure which capability fits?
                                </span>
                                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/75 group-hover:text-white">
                                  Let&apos;s talk <Arrow />
                                </span>
                              </span>
                            </Link>
                          </div>
                        ) : (
                          <ul>
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button href="/contact" className="max-sm:!hidden">
              Let&apos;s Talk
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-line lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                {mobileOpen ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer. Rendered outside <header>: the header's backdrop-filter would otherwise
          become the containing block for this fixed element and clip it to the header's height. */}
      <div
        id="mobile-nav"
        style={{ top: drawerTop }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-paper px-5 pb-10 transition-all duration-300 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-line border-b border-line">
            {nav.map((group) => {
              const expanded = mobileSection === group.label;
              return (
                <li key={group.label}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileSection(expanded ? null : group.label)}
                    className="flex w-full items-center justify-between py-4 text-lg font-semibold"
                  >
                    {group.label}
                    <Chevron open={expanded} />
                  </button>
                  <ul className={cn("grid gap-1 pb-4", !expanded && "hidden")}>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-slate hover:bg-mist hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <Button href="/contact" size="lg" className="mt-6 w-full" onClick={() => setMobileOpen(false)}>
            Let&apos;s Talk <Arrow />
          </Button>
        </nav>
      </div>
    </>
  );
}
