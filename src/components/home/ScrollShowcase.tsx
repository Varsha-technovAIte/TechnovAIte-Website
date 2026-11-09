"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Arrow, cn } from "@/components/ui";
import Link from "next/link";
import { useStep } from "./useStep";

type Chapter = {
  nav: string;
  lead: string;
  rest: string;
  body: string;
  href: string;
  cta: string;
  scene: "ai" | "scale" | "offshore" | "specialist" | "transform";
};

const chapters: Chapter[] = [
  {
    nav: "Launch an AI initiative",
    lead: "Move an AI initiative.",
    rest: "Expertise, delivery capacity, and coordination in one structure.",
    body: "Bring suitable AI expertise, a delivery pod, and a governance path together so the work can leave the slide deck.",
    href: "/contact?need=ai-initiative",
    cta: "Discuss your AI initiative",
    scene: "ai",
  },
  {
    nav: "Scale engineering",
    lead: "Scale the team you need.",
    rest: "Flexible delivery models that grow with the roadmap.",
    body: "Add capacity through a pod or a right-sized operating model, without standing up every capability inside the business first.",
    href: "/capabilities/ai-digital-delivery-pods",
    cta: "Explore delivery models",
    scene: "scale",
  },
  {
    nav: "Build offshore capability",
    lead: "Build offshore, properly.",
    rest: "A right-sized centre, with governance from the first day.",
    body: "Nano-GCC and Build-Operate-Transfer models structure offshore capability through the partner ecosystem, with a path you can own over time.",
    href: "/capabilities/nano-gcc-bot",
    cta: "Explore Nano-GCC",
    scene: "offshore",
  },
  {
    nav: "Access specialists",
    lead: "The specialist, not the shortlist.",
    rest: "Curated partners, each with a role and a reason to be there.",
    body: "Cloud, cyber, AI, and transformation expertise, aligned to the programme rather than added to a vendor list.",
    href: "/capabilities/partner-led-specialist-services",
    cta: "Find the right capability",
    scene: "specialist",
  },
  {
    nav: "Accelerate transformation",
    lead: "Transformation, without the vendor pile.",
    rest: "One coordinated structure across every capability the programme needs.",
    body: "Delivery capacity and specialist expertise move together, so progress does not depend on managing a crowd of providers.",
    href: "/contact?need=digital-transformation",
    cta: "Discuss your transformation",
    scene: "transform",
  },
];

export function ScrollShowcase() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // The chapter whose top has reached the upper third of the screen is the one being read.
      const line = window.innerHeight * 0.38;
      let next = 0;
      itemRefs.current.forEach((node, index) => {
        if (node && node.getBoundingClientRect().top <= line) next = index;
      });
      setActive((current) => (current === next ? current : next));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const go = (index: number) => {
    setActive(index);
    itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="mt-16 lg:mt-20">
      <div className="sticky top-[72px] z-30 -mx-5 border-b border-line bg-paper/90 backdrop-blur-xl lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chapters.map((chapter, i) => (
            <button
              key={chapter.nav}
              type="button"
              onClick={() => go(i)}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                i === active ? "bg-inverse text-on-inverse" : "bg-mist text-slate",
              )}
            >
              {chapter.nav}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <div className="hidden lg:block">
          <nav aria-label="Capability motions" className="sticky top-32">
            <div className="relative">
              <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-line" />
              <span
                aria-hidden
                className="absolute left-0 top-3 h-5 w-[2px] bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateY(${active * 44}px)` }}
              />
              <ul>
                {chapters.map((chapter, i) => (
                  <li key={chapter.nav}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={i === active ? "true" : undefined}
                      className={cn(
                        "flex h-11 w-full items-center pl-5 text-left text-[15px] tracking-[-0.01em] transition-colors duration-300",
                        i === active ? "font-medium text-ink" : "text-slate hover:text-ink",
                      )}
                    >
                      {chapter.nav}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div>
          {chapters.map((chapter, i) => (
            <article
              key={chapter.nav}
              data-index={i}
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
              className="flex min-h-[88svh] flex-col justify-center py-16 sm:min-h-[100svh]"
            >
              <h3 className="max-w-3xl text-balance text-[2rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-5xl">
                <span className="text-ink">{chapter.lead}</span>{" "}
                <span className="text-ink/55">{chapter.rest}</span>
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">{chapter.body}</p>
              <Link
                href={chapter.href}
                className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-brand-strong"
              >
                {chapter.cta} <Arrow />
              </Link>
              <div className="mt-8">
                <Scene kind={chapter.scene} playing={active === i} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_70px_-46px_rgba(22,50,90,0.6)]">
      <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 text-xs font-medium text-slate">{label}</span>
      </div>
      <div className="relative h-[320px] overflow-hidden bg-mist bg-dots sm:h-[360px]">{children}</div>
    </div>
  );
}

function Scene({ kind, playing }: { kind: Chapter["scene"]; playing: boolean }) {
  if (kind === "ai") return <AiScene playing={playing} />;
  if (kind === "scale") return <ScaleScene playing={playing} />;
  if (kind === "offshore") return <OffshoreScene playing={playing} />;
  if (kind === "specialist") return <SpecialistScene playing={playing} />;
  return <TransformScene playing={playing} />;
}

function AiScene({ playing }: { playing: boolean }) {
  const step = useStep(4, playing, 1500);
  const nodes = ["Brief", "Delivery pod", "Specialist", "Governance"];
  return (
    <Frame label="AI initiative">
      <div className="flex h-full flex-col justify-center px-5 sm:px-10">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {nodes.map((node, i) => {
            const on = i <= step;
            return (
              <div key={node} className="relative text-center">
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-[58%] top-5 hidden h-px w-[84%] sm:block",
                      i < step ? "bg-brand" : "bg-line",
                    )}
                  />
                )}
                <div
                  className={cn(
                    "relative mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ring-1 transition-all duration-500",
                    on ? "bg-inverse text-on-inverse ring-ink" : "bg-paper text-slate ring-line",
                  )}
                >
                  0{i + 1}
                </div>
                <p className={cn("mt-3 text-[12px] font-medium sm:text-sm", on ? "text-ink" : "text-slate")}>{node}</p>
              </div>
            );
          })}
        </div>
        <div className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-line bg-paper p-4 shadow-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">Working note</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            {step === 0 && "Frame the outcome, the constraint, and what “done” needs to look like."}
            {step === 1 && "A delivery pod is sized to the initiative — not a standing team you have to invent."}
            {step === 2 && "Specialist review covers the parts the pod should not guess at."}
            {step === 3 && "Governance is named before anyone starts building."}
          </p>
        </div>
      </div>
    </Frame>
  );
}

function ScaleScene({ playing }: { playing: boolean }) {
  const step = useStep(4, playing, 1400);
  const rows = [
    { label: "AI & digital pod", meta: "Cross-functional", width: "78%" },
    { label: "Engineering capacity", meta: "Flexible", width: "62%" },
    { label: "Advisory overlay", meta: "Light", width: "36%" },
  ];
  return (
    <Frame label="Delivery capacity">
      <div className="flex h-full flex-col justify-center gap-3 px-5 sm:px-8">
        {rows.map((row, i) => {
          const on = i <= step;
          return (
            <div
              key={row.label}
              className={cn(
                "rounded-2xl border bg-paper px-4 py-3.5 shadow-card transition-all duration-500",
                on ? "border-line" : "border-transparent opacity-50",
              )}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{row.label}</span>
                <span className="text-slate">{row.meta}</span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-mist">
                <div
                  className="h-full rounded-full bg-brand transition-all duration-700"
                  style={{ width: on ? row.width : "8%" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

function OffshoreScene({ playing }: { playing: boolean }) {
  const step = useStep(3, playing, 1600);
  const phases = [
    { title: "Build", copy: "Stand up a right-sized centre around a defined scope." },
    { title: "Operate", copy: "Run delivery with governance and a clear operating rhythm." },
    { title: "Transfer", copy: "A path to owning the capability, when you want it." },
  ];
  return (
    <Frame label="Nano-GCC & BOT">
      <div className="grid h-full grid-cols-3 gap-2 p-4 sm:gap-3 sm:p-6">
        {phases.map((phase, i) => {
          const on = i === step;
          const done = i < step;
          return (
            <div
              key={phase.title}
              className={cn(
                "flex flex-col rounded-2xl border bg-paper p-3 transition-all duration-500 sm:p-4",
                on ? "border-brand/40 shadow-card" : "border-line",
                !on && !done && "opacity-60",
              )}
            >
              <span className={cn("text-[11px] font-semibold uppercase tracking-[0.14em]", on ? "text-brand-strong" : "text-slate")}>
                0{i + 1}
              </span>
              <p className="mt-3 text-sm font-semibold sm:text-base">{phase.title}</p>
              <p className="mt-2 hidden text-[13px] leading-relaxed text-slate sm:block">{phase.copy}</p>
              <span className={cn("mt-auto pt-4 text-[11px] font-medium", done || on ? "text-ink" : "text-slate")}>
                {done ? "Set" : on ? "In focus" : "Next"}
              </span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

function SpecialistScene({ playing }: { playing: boolean }) {
  const step = useStep(4, playing, 1300);
  const rows = ["Cloud", "Cyber security", "AI engineering", "Transformation"];
  return (
    <Frame label="Specialist match">
      <div className="mx-auto flex h-full max-w-lg flex-col justify-center px-4 sm:px-6">
        <div className="rounded-2xl border border-line bg-paper shadow-card">
          <div className="border-b border-line px-4 py-3 text-sm text-slate">Domains for this programme</div>
          <ul>
            {rows.map((row, i) => {
              const on = i <= step;
              return (
                <li key={row} className="flex items-center justify-between border-b border-line px-4 py-3 last:border-b-0">
                  <span className={cn("text-sm font-medium", on ? "text-ink" : "text-slate")}>{row}</span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-500",
                      on ? "bg-brand-soft text-brand-strong" : "bg-mist text-slate",
                    )}
                  >
                    {on ? "Aligned" : "Open"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

function TransformScene({ playing }: { playing: boolean }) {
  const step = useStep(3, playing, 1600);
  const columns = [
    { title: "Structure", cards: ["Outcome", "Model"] },
    { title: "Connect", cards: ["Partners", "Roles"] },
    { title: "Coordinate", cards: ["Governance", "Rhythm"] },
  ];
  return (
    <Frame label="Programme board">
      <div className="grid h-full grid-cols-3 gap-2 p-4 sm:gap-3 sm:p-6">
        {columns.map((column, i) => (
          <div key={column.title} className="rounded-2xl bg-paper/80 p-2.5 ring-1 ring-line sm:p-3">
            <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">{column.title}</p>
            <div className="mt-2 space-y-2">
              {column.cards.map((card) => (
                <div
                  key={card}
                  className={cn(
                    "rounded-xl px-3 py-3 text-sm font-medium shadow-card ring-1 transition-all duration-500",
                    i <= step ? "bg-paper text-ink ring-line" : "bg-mist text-slate ring-transparent",
                  )}
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
