"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { SolvrrLabel, SolvrrMark } from "@/components/Logo";
import { Arrow, cn } from "@/components/ui";

const tabs = [
  {
    id: "structure",
    label: "Structure",
    title: "Four models. One orchestration.",
    copy: "Delivery pods, Nano-GCC, specialist services, and advisory — selected for the initiative, not stacked by habit.",
    href: "/capabilities",
    cta: "Explore capabilities",
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    title: "Specialists, already in orbit.",
    copy: "Curated partner domains sit around the outcome, so expertise is connected instead of scattered across providers.",
    href: "/company/partners",
    cta: "See the ecosystem",
  },
  {
    id: "solvrr",
    label: "Solvrr™",
    title: "Discover. Decide. Connect.",
    copy: "Solvrr™ is the platform vision for clearer capability decisions. These pillars describe where it is heading — not every feature is live.",
    href: "/solvrr",
    cta: "Explore Solvrr™",
  },
] as const;

export function SignalBoard() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("structure");
  const current = tabs.find((item) => item.id === tab) ?? tabs[0];
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // ARIA tabs pattern: arrows move and select, Home/End jump to the ends.
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = tabs.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-12">
      <div role="tablist" aria-label="How the model connects" className="flex flex-wrap gap-2">
        {tabs.map((item, i) => {
          const on = item.id === tab;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${baseId}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                on ? "bg-inverse text-on-inverse" : "bg-mist text-slate hover:text-ink",
              )}
            >
              <SolvrrLabel text={item.label} />
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="mt-6 grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-mist p-5 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10"
      >
        <div>
          <h3 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{current.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-slate">{current.copy}</p>
          <Link href={current.href} className="group mt-6 inline-flex items-center gap-2 font-medium hover:text-brand-strong">
            {current.cta} <Arrow />
          </Link>
        </div>
        <div className="min-h-[280px]">
          {tab === "structure" && <StructurePanel />}
          {tab === "ecosystem" && <EcosystemPanel />}
          {tab === "solvrr" && <SolvrrPanel />}
        </div>
      </div>
    </div>
  );
}

function StructurePanel() {
  const models = ["Delivery pods", "Nano-GCC & BOT", "Specialist services", "Advisory"];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {models.map((model, i) => (
        <div key={model} className="rounded-2xl bg-paper p-5 shadow-card ring-1 ring-line">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-strong">0{i + 1}</p>
          <p className="mt-3 text-lg font-semibold tracking-tight">{model}</p>
          <div className="mt-4 h-px bg-line" />
          <p className="mt-3 text-sm text-slate">Aligned to the outcome</p>
        </div>
      ))}
    </div>
  );
}

function EcosystemPanel() {
  const ring = ["AI & Data", "Cloud", "Cyber", "Engineering", "Offshore", "Advisory"];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy-deep text-center text-white shadow-lift">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">Your</span>
        <span className="text-sm font-semibold">Outcome</span>
      </div>
      {ring.map((label, i) => {
        const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 40;
        const y = 50 + Math.sin(angle) * 40;
        return (
          <span
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-paper px-3 py-1.5 text-xs font-medium shadow-card ring-1 ring-line"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {label}
          </span>
        );
      })}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="50" cy="50" r="32" fill="none" stroke="#e3e7ec" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}

function SolvrrPanel() {
  const pillars = [
    ["Discover", "Explore capabilities and possible pathways."],
    ["Decide", "Bring clarity to the capability decision."],
    ["Connect", "A more structured path toward execution."],
  ];
  return (
    <div className="grid gap-3">
      <SolvrrMark className="mb-1 h-10 justify-self-start text-ink" />
      {pillars.map(([title, copy], i) => (
        <div key={title} className="flex gap-4 rounded-2xl bg-paper p-4 shadow-card ring-1 ring-line">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-deep text-xs font-semibold text-white">
            0{i + 1}
          </span>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-slate">{copy}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
