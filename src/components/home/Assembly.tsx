"use client";

import { processSteps } from "@/lib/site";
import { cn } from "@/components/ui";
import { useStep } from "./useStep";

const assembled = [
  ["Business challenge", "Objectives", "Delivery requirements"],
  ["Capability model", "Delivery option", "Partner shape"],
  ["Named partners", "Roles", "Engagement structure"],
  ["Coordination", "Governance", "A rhythm you can see"],
];

export function Assembly() {
  const step = useStep(processSteps.length, true, 2200);

  return (
    <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <ol className="space-y-2">
        {processSteps.map((item, i) => {
          const on = i === step;
          return (
            <li key={item.title}>
              <div
                className={cn(
                  "rounded-2xl px-4 py-4 transition-all duration-500 sm:px-5",
                  on ? "bg-paper shadow-card ring-1 ring-line" : "opacity-50",
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className={cn("text-xs font-semibold", on ? "text-brand-strong" : "text-slate")}>0{i + 1}</span>
                  <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                </div>
                <p className={cn("mt-1.5 pl-7 text-[15px] leading-relaxed text-slate", on ? "block" : "hidden sm:block")}>
                  {item.copy}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div aria-hidden className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_70px_-46px_rgba(22,50,90,0.55)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-sm font-medium">Engagement, assembling</p>
          <span className="text-xs font-medium text-slate">
            0{step + 1} / 0{processSteps.length}
          </span>
        </div>
        <div className="space-y-5 bg-mist p-5 sm:p-7">
          {processSteps.map((item, i) => {
            const on = i <= step;
            return (
              <div key={item.title} className={cn("transition-all duration-500", on ? "opacity-100" : "opacity-30")}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">{item.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {assembled[i].map((chip) => (
                    <span
                      key={chip}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm transition-colors duration-500",
                        on ? "bg-paper font-medium text-ink shadow-card ring-1 ring-line" : "bg-paper/60 text-slate",
                      )}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
