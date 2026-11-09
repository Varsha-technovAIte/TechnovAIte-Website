"use client";

import { useState } from "react";
import { processSteps } from "@/lib/site";
import { cn } from "./ui";



export function ProcessSteps({ dark }: { dark?: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <ol className="relative grid gap-4 lg:grid-cols-4">
      {/* connecting line (desktop) */}
      <div
        aria-hidden
        className={cn("absolute left-0 right-0 top-[27px] hidden h-px lg:block", dark ? "bg-white/15" : "bg-line")}
      />
      <div
        aria-hidden
        className="absolute left-0 top-[27px] hidden h-px bg-brand transition-all duration-500 lg:block"
        style={{ width: `${(active / 3) * 100 * 0.75 + 12.5}%` }}
      />
      {/* connecting line (mobile) */}
      <div aria-hidden className={cn("absolute bottom-6 left-[27px] top-6 w-px lg:hidden", dark ? "bg-white/15" : "bg-line")} />

      {processSteps.map((s, i) => {
        const on = i === active;
        return (
          <li key={s.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }} className="relative">
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className="flex w-full gap-5 text-left lg:flex-col lg:gap-6"
            >
              <span
                className={cn(
                  "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-1 transition-all duration-300",
                  on
                    ? "bg-brand text-white ring-brand shadow-[0_8px_24px_-8px_rgba(242,105,13,0.7)]"
                    : dark
                      ? "bg-navy-deep text-white ring-white/20"
                      : "bg-paper text-ink ring-line",
                )}
              >
                0{i + 1}
              </span>
              <span
                className={cn(
                  "block flex-1 rounded-2xl p-5 transition-all duration-300",
                  dark
                    ? on
                      ? "bg-white/[0.07] ring-1 ring-white/15"
                      : "ring-1 ring-transparent"
                    : on
                      ? "bg-paper shadow-card ring-1 ring-line"
                      : "ring-1 ring-transparent",
                )}
              >
                <span className={cn("block text-xl font-semibold tracking-tight", dark ? "text-white" : "text-ink")}>
                  {s.title}
                </span>
                <span className={cn("mt-2 block leading-relaxed", dark ? "text-white/65" : "text-slate")}>{s.copy}</span>
                <span className={cn("mt-4 flex flex-wrap gap-1.5 transition-opacity", on ? "opacity-100" : "opacity-50")}>
                  {s.detail.map((d) => (
                    <span
                      key={d}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs",
                        dark ? "bg-white/10 text-white/80" : "bg-mist text-slate",
                      )}
                    >
                      {d}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
