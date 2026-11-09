"use client";

import { useEffect, useState } from "react";
import { businessNeeds, orchestrationNodes } from "@/lib/site";
import { cn } from "./ui";

/** Self-playing preview of the Capability Orchestration Experience. Decorative. */
export function HeroVisual() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % businessNeeds.length), 3200);
    return () => clearInterval(t);
  }, [paused]);

  const need = businessNeeds[i];
  const active = new Set(need.capabilities);

  return (
    <div
      aria-hidden
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-3xl border border-line bg-paper p-2 shadow-lift"
    >
      <div className="rounded-[20px] bg-grid bg-mist/60 p-5 sm:p-8">
        <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          {/* Needs */}
          <div className="space-y-2">
            <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">Business needs</p>
            {businessNeeds.map((n) => {
              const on = n.slug === need.slug;
              return (
                <div
                  key={n.slug}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-500",
                    on ? "bg-inverse text-on-inverse shadow-card" : "bg-paper text-slate ring-1 ring-line",
                  )}
                >
                  {n.label}
                  <span className={cn("h-1.5 w-1.5 rounded-full", on ? "bg-brand" : "bg-line")} />
                </div>
              );
            })}
          </div>

          {/* Hub */}
          <div className="relative mx-auto flex items-center justify-center py-2">
            <div className="absolute h-44 w-44 rounded-full bg-brand/10 blur-2xl" />
            <div className="absolute h-36 w-36 animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-brand/35" />
            <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-navy-deep text-center text-white shadow-lift">
              <span className="font-serif text-[15px] leading-none">
                technov<span className="font-sans font-bold text-brand">AI</span>te
              </span>
              <span className="mt-1.5 px-3 text-[9px] leading-tight text-white/60">Capability Orchestration</span>
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-2">
            <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">Capabilities</p>
            {orchestrationNodes.map((node) => {
              const on = active.has(node.key);
              return (
                <div
                  key={node.key}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl bg-paper px-3.5 py-2.5 text-[13px] font-medium ring-1 transition-all duration-500",
                    on ? "text-ink ring-brand/60 shadow-card" : "text-slate/70 ring-line",
                  )}
                >
                  <span className={cn("h-2 w-2 rounded-full transition-colors", on ? "bg-brand" : "bg-line")} />
                  {node.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 rounded-xl bg-paper px-4 py-3 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-strong">Outcome</span>
          <span key={need.slug} className="text-[13px] text-ink">
            {need.outcome}
          </span>
        </div>
      </div>
    </div>
  );
}
