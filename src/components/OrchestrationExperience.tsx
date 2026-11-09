"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { businessNeeds, orchestrationNodes, type CapabilityKey } from "@/lib/site";
import { Icon, type IconName } from "./Icons";
import { Arrow, cn } from "./ui";

const nodeIcon: Record<CapabilityKey, IconName> = {
  pods: "pods",
  gcc: "gcc",
  specialist: "specialist",
  governance: "governance",
};

// SVG layout (viewBox 860 x 460): need → TechnovAIte → capabilities.
const NEED = { x: 24, y: 200, w: 210, h: 60 };
const HUB = { cx: 400, cy: 230, r: 74 };
const CAP_X = 572;
const CAP_W = 272;
const CAP_H = 56;
const capY = (i: number) => 52 + i * 96;

function curve(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

export function OrchestrationExperience() {
  const [selected, setSelected] = useState(0);
  const need = businessNeeds[selected];
  const active = new Set(need.capabilities);
  const groupId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = businessNeeds.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setSelected(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-lift">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-mist/70 px-5 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </div>
        <p className="text-xs font-medium text-slate">Capability Orchestration</p>
        <span className="flex items-center gap-1.5 text-xs text-slate">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand" aria-hidden /> Interactive
        </span>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* Need selector */}
        <div className="border-b border-line p-6 lg:border-b-0 lg:border-r">
          <p id={groupId} className="text-[15px] font-semibold text-ink">
            What are you trying to achieve?
          </p>
          <div role="radiogroup" aria-labelledby={groupId} className="mt-4 flex flex-col gap-2">
            {businessNeeds.map((n, i) => {
              const checked = i === selected;
              return (
                <button
                  key={n.slug}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium transition-all duration-200",
                    checked
                      ? "bg-inverse text-on-inverse shadow-card"
                      : "bg-mist text-ink hover:bg-line/60",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                      checked ? "border-brand bg-brand" : "border-ink/25 bg-paper",
                    )}
                  >
                    {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          {/* Desktop / tablet diagram */}
          <div className="hidden bg-grid px-4 pt-4 md:block">
            <svg
              viewBox="0 0 860 460"
              className="h-auto w-full"
              role="img"
              aria-label={`${need.label} connects through TechnovAIte to ${need.capabilities
                .map((k) => orchestrationNodes.find((n) => n.key === k)?.label)
                .join(", ")}.`}
            >
              <defs>
                <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f2690d" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#f2690d" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Need → hub */}
              <path
                d={curve(NEED.x + NEED.w, NEED.y + NEED.h / 2, HUB.cx - HUB.r, HUB.cy)}
                fill="none"
                stroke="#f2690d"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="animate-dash"
              />

              {/* Hub → capabilities */}
              {orchestrationNodes.map((node, i) => {
                const on = active.has(node.key);
                const y = capY(i) + CAP_H / 2;
                return (
                  <g key={node.key}>
                    <path
                      d={curve(HUB.cx + HUB.r, HUB.cy, CAP_X, y)}
                      fill="none"
                      stroke={on ? "#f2690d" : "#c9d0d8"}
                      strokeWidth={on ? 2 : 1.2}
                      strokeDasharray={on ? "6 6" : "3 5"}
                      className={cn("transition-all duration-500", on && "animate-dash")}
                      opacity={on ? 1 : 0.6}
                    />
                    {on && (
                      <circle cx={CAP_X} cy={y} r="4" fill="#f2690d">
                        <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Need node */}
              <g>
                <rect x={NEED.x} y={NEED.y} width={NEED.w} height={NEED.h} rx="14" fill="#1d2530" />
                <text x={NEED.x + 18} y={NEED.y + 23} fill="#f2690d" fontSize="10.5" fontWeight="600" letterSpacing="1.4">
                  BUSINESS NEED
                </text>
                <text x={NEED.x + 18} y={NEED.y + 43} fill="#ffffff" fontSize="14" fontWeight="600">
                  {need.label}
                </text>
              </g>

              {/* Hub */}
              <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r + 46} fill="url(#hubGlow)" />
              <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r + 14} fill="none" stroke="#f2690d" strokeOpacity="0.25" strokeDasharray="2 6" />
              <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill="#0c1a30" />
              <text x={HUB.cx} y={HUB.cy - 2} textAnchor="middle" fill="#fff" fontSize="18" fontFamily="Georgia, serif">
                technov
                <tspan fill="#f2690d" fontFamily="var(--font-inter), sans-serif" fontWeight="700">
                  AI
                </tspan>
                te
              </text>
              <text x={HUB.cx} y={HUB.cy + 20} textAnchor="middle" fill="#ffffff" fillOpacity="0.6" fontSize="10.5" letterSpacing="0.6">
                Capability Orchestration
              </text>

              {/* Capability nodes */}
              {orchestrationNodes.map((node, i) => {
                const on = active.has(node.key);
                const y = capY(i);
                return (
                  <g key={node.key} className="transition-opacity duration-500" opacity={on ? 1 : 0.4}>
                    <rect
                      x={CAP_X}
                      y={y}
                      width={CAP_W}
                      height={CAP_H}
                      rx="14"
                      fill="#ffffff"
                      stroke={on ? "#f2690d" : "#e3e7ec"}
                      strokeWidth={on ? 1.6 : 1}
                    />
                    <rect x={CAP_X + 12} y={y + 12} width="32" height="32" rx="9" fill={on ? "#fef1e7" : "#f3f5f6"} />
                    <circle cx={CAP_X + 28} cy={y + 28} r="5" fill={on ? "#f2690d" : "#c9d0d8"} />
                    <text x={CAP_X + 56} y={y + 33} fill="#1d2530" fontSize="13.5" fontWeight="600">
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Mobile: simplified card-and-connection view */}
          <div className="p-6 md:hidden">
            <div className="rounded-xl bg-inverse px-4 py-3 text-on-inverse">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">Business need</p>
              <p className="mt-1 text-sm font-semibold">{need.label}</p>
            </div>
            <div className="ml-6 h-5 border-l-2 border-dashed border-brand" aria-hidden />
            <div className="rounded-xl bg-navy-deep px-4 py-3 text-white">
              <p className="font-serif text-lg leading-none">
                technov<span className="font-sans font-bold text-brand">AI</span>te
              </p>
              <p className="mt-1 text-xs text-white/60">Capability Orchestration</p>
            </div>
            <div className="ml-6 h-5 border-l-2 border-dashed border-brand" aria-hidden />
            <ul className="space-y-2">
              {orchestrationNodes.map((node) => {
                const on = active.has(node.key);
                return (
                  <li
                    key={node.key}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-300",
                      on ? "border-brand bg-paper text-ink" : "border-line bg-mist text-slate opacity-60",
                    )}
                  >
                    <Icon name={nodeIcon[node.key]} className={on ? "text-brand" : "text-slate"} />
                    {node.label}
                    <span className="sr-only">{on ? "(relevant)" : "(not required)"}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contextual explanation */}
          <div
            aria-live="polite"
            className="grid gap-5 border-t border-line p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">How it connects</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">{need.explanation}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-strong">Expected outcome</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">{need.outcome}</p>
            </div>
            <Link
              href={`/contact?need=${need.slug}`}
              className="group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
            >
              {need.cta} <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
