"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { Arrow, Button, Eyebrow, cn } from "@/components/ui";

const needs = ["Launch an AI initiative", "Scale engineering", "Build offshore capability", "Access specialists"];

const thread = [
  { from: "you" as const, text: "We need an AI initiative moving this quarter — without standing up a whole new team." },
  { from: "us" as const, text: "A delivery pod and a specialist review, shaped around that outcome." },
  { from: "you" as const, text: "Can governance be part of the structure, not a follow-up?" },
  { from: "us" as const, text: "Yes. Roles and a coordination path are named before anyone starts building." },
];

const checks = ["Business outcome framed", "Capability model selected", "Partner roles aligned"];

export function Hero() {
  const [step, setStep] = useState(0);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(thread.length - 1);
      setReveal(1);
      return;
    }

    const stepTimer = window.setInterval(() => {
      setStep((value) => (value + 1) % (thread.length + 1));
    }, 1700);

    let frame = 0;
    const delay = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1300);
        setReveal(1 - Math.pow(1 - t, 3));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, 350);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, []);

  const shown = step === thread.length ? thread.length : step;

  return (
    <section className="relative border-b border-line bg-paper">
      <div className="grid grid-cols-1 grid-rows-1">
        <div
          aria-hidden
          className="pointer-events-none sticky top-[72px] z-0 col-start-1 row-start-1 h-[calc(100svh-72px)] self-start overflow-hidden"
        >
          <div className="absolute inset-0 bg-pinstripe" />
          <div className="hero-beam absolute top-0 left-[-70%] h-[150%] w-[240%]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
        </div>

        <div className="relative z-10 col-start-1 row-start-1">
          <div className="mx-auto max-w-4xl px-5 pb-6 pt-16 text-center sm:px-8 sm:pt-20">
            <Eyebrow className="justify-center">Technology capabilities, connected</Eyebrow>
            <h1 className="mt-6 text-balance text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem]">
              The right capabilities. <span className="text-ink/55">Connected for your success.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate sm:text-xl">
              Specialist technology expertise, flexible delivery models, and trusted partners — through one coordinated
              approach.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/capabilities" size="lg">
                Explore capabilities <Arrow />
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Let&apos;s talk
              </Button>
            </div>
          </div>

          <div className="relative mx-auto mt-16 w-[min(1040px,calc(100%-2rem))] pb-24 sm:mt-20 sm:pb-28">
            <Draggable label="Capability workspace" range={140} className="relative z-10">
              <ProductWindow shown={shown} activeNeed={Math.min(step, needs.length - 1)} />
            </Draggable>

            <Floating
              reveal={reveal}
              label="This week"
              shiftY="-50%"
              className="left-4 top-0 hidden w-[230px] lg:block"
              delay="0ms"
            >
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate">This week</p>
              <p className="mt-1.5 text-sm font-semibold tracking-tight">AI initiative, scoped</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate">
                Delivery pod, specialist review, and a governance path — one structure.
              </p>
            </Floating>

            <Floating
              reveal={reveal}
              label="Engagement structure"
              shiftY="-42%"
              className="right-4 top-2 hidden w-[248px] lg:block"
              delay="120ms"
              float="delayed"
            >
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand-strong">Structure</p>
              <ul className="mt-2.5 space-y-2">
                {checks.map((item, i) => {
                  const on = shown > i;
                  return (
                    <li key={item} className="flex items-center gap-2 text-[13px]">
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] transition-colors duration-500",
                          on ? "bg-brand text-white" : "bg-mist text-transparent ring-1 ring-line",
                        )}
                      >
                        ✓
                      </span>
                      <span className={cn(on ? "text-ink" : "text-slate")}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </Floating>

            <Floating
              reveal={reveal}
              label="Coordinating status"
              bare
              shiftX="-50%"
              className="bottom-10 left-1/2 w-max"
              delay="220ms"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-inverse px-3 py-1.5 text-[12px] font-medium text-on-inverse shadow-lift">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Coordinating · 4 models
              </span>
            </Floating>
          </div>
        </div>
      </div>
      <DomainMarquee />
    </section>
  );
}

let dragStack = 30;

function clamp(value: number, limit: number) {
  return Math.max(-limit, Math.min(limit, value));
}

/** Resist past the edge, then let go so the panel can spring back. */
function soften(value: number, limit: number) {
  const distance = Math.abs(value);
  if (distance <= limit) return value;
  return Math.sign(value) * (limit + (distance - limit) * 0.22);
}

function Draggable({
  children,
  className,
  style,
  label,
  shiftX = "0px",
  shiftY = "0px",
  range = 220,
  float = false,
  delay,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  label: string;
  shiftX?: string;
  shiftY?: string;
  range?: number;
  float?: "base" | "delayed" | false;
  delay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const pointer = useRef<{
    id: number;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    lx: number;
    ly: number;
    lt: number;
    vx: number;
    vy: number;
  } | null>(null);
  const frame = useRef(0);
  const shift = useRef({ x: shiftX, y: shiftY });
  const limit = useRef(range);
  const [dragging, setDragging] = useState(false);
  const [z, setZ] = useState<number>();

  shift.current = { x: shiftX, y: shiftY };
  limit.current = range;

  const place = (x: number, y: number, scale = 1) => {
    const el = ref.current;
    if (!el) return;
    const resting = shift.current;
    el.style.translate = `calc(${resting.x} + ${x}px) calc(${resting.y} + ${y}px)`;
    el.style.scale = scale === 1 ? "" : scale.toFixed(3);
  };

  useLayoutEffect(() => {
    place(pos.current.x, pos.current.y, 1);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const pauseFloat = (paused: boolean) => {
    const node = floatRef.current;
    if (node) node.style.animationPlayState = paused ? "paused" : "running";
  };

  const withinView = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return { x, y };
    const rect = el.getBoundingClientRect();
    const pad = 12;
    let left = rect.left + (x - pos.current.x);
    let top = rect.top + (y - pos.current.y);
    const minLeft = Math.min(pad, window.innerWidth - rect.width - pad);
    const maxLeft = Math.max(pad, window.innerWidth - rect.width - pad);
    left = Math.min(maxLeft, Math.max(minLeft, left));

    const stage = el.closest("section");
    if (stage) {
      const bounds = stage.getBoundingClientRect();
      const keep = Math.min(80, rect.height);
      const minTop = bounds.top - rect.height + keep;
      const maxTop = bounds.bottom - keep;
      if (maxTop > minTop) top = Math.min(maxTop, Math.max(minTop, top));
    }

    return {
      x: pos.current.x + (left - rect.left),
      y: pos.current.y + (top - rect.top),
    };
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || pointer.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    cancelAnimationFrame(frame.current);
    pauseFloat(true);
    pointer.current = {
      id: event.pointerId,
      sx: event.clientX,
      sy: event.clientY,
      ox: pos.current.x,
      oy: pos.current.y,
      lx: event.clientX,
      ly: event.clientY,
      lt: performance.now(),
      vx: 0,
      vy: 0,
    };
    setDragging(true);
    setZ(++dragStack);
    place(pos.current.x, pos.current.y, 1.02);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = pointer.current;
    if (!drag || drag.id !== event.pointerId) return;
    const now = performance.now();
    const dt = Math.max(16, now - drag.lt);
    drag.vx = ((event.clientX - drag.lx) / dt) * 16;
    drag.vy = ((event.clientY - drag.ly) / dt) * 16;
    drag.lx = event.clientX;
    drag.ly = event.clientY;
    drag.lt = now;
    const next = withinView(
      soften(drag.ox + (event.clientX - drag.sx), limit.current),
      soften(drag.oy + (event.clientY - drag.sy), limit.current),
    );
    pos.current = next;
    place(next.x, next.y, 1.02);
  };

  const finish = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = pointer.current;
    if (!drag || drag.id !== event.pointerId) return;
    pointer.current = null;
    setDragging(false);

    const stale = performance.now() - drag.lt > 48;
    const glideX = stale ? 0 : clamp(drag.vx * 9, 72);
    const glideY = stale ? 0 : clamp(drag.vy * 9, 72);
    const from = { ...pos.current };
    const target = withinView(
      clamp(from.x + glideX, limit.current),
      clamp(from.y + glideY, limit.current),
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const travel = Math.hypot(target.x - from.x, target.y - from.y);
    if (reduce || travel < 0.6) {
      pos.current = target;
      place(target.x, target.y, 1);
      pauseFloat(false);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 420);
      const eased = 1 - Math.pow(1 - t, 3);
      const x = from.x + (target.x - from.x) * eased;
      const y = from.y + (target.y - from.y) * eased;
      pos.current = { x, y };
      place(x, y, 1 + (1 - t) * 0.02);
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else pauseFloat(false);
    };
    frame.current = requestAnimationFrame(tick);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 36 : 16;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = delta[event.key];
    if (!move) return;
    event.preventDefault();
    cancelAnimationFrame(frame.current);
    const next = withinView(
      clamp(pos.current.x + move[0], limit.current),
      clamp(pos.current.y + move[1], limit.current),
    );
    pos.current = next;
    place(next.x, next.y, 1);
  };

  return (
    <div
      ref={ref}
      tabIndex={0}
      aria-label={`${label}. Drag to move, or use the arrow keys.`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finish}
      onPointerCancel={finish}
      onKeyDown={onKeyDown}
      className={cn(
        "touch-none select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
        dragging && "drop-shadow-[0_24px_44px_rgba(22,50,90,0.22)]",
        className,
      )}
      style={{ ...style, cursor: dragging ? "grabbing" : "grab", zIndex: z }}
    >
      <div
        ref={floatRef}
        className={cn(float === "base" && "animate-float", float === "delayed" && "animate-float-delayed")}
        style={delay ? { animationDelay: delay } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

function Floating({
  reveal,
  className,
  children,
  delay = "0ms",
  float = "base",
  bare = false,
  label,
  shiftX,
  shiftY,
}: {
  reveal: number;
  className?: string;
  children: ReactNode;
  delay?: string;
  float?: "base" | "delayed";
  bare?: boolean;
  label: string;
  shiftX?: string;
  shiftY?: string;
}) {
  return (
    <Draggable
      label={label}
      shiftX={shiftX}
      shiftY={shiftY}
      float={float}
      delay={delay}
      className={cn("absolute z-20", reveal < 0.98 && "pointer-events-none", className)}
      style={{
        opacity: reveal,
        filter: `blur(${(1 - reveal) * 8}px)`,
      }}
    >
      {bare ? children : <div className="rounded-2xl border border-line bg-paper p-3.5 shadow-lift">{children}</div>}
    </Draggable>
  );
}

function ProductWindow({ shown, activeNeed }: { shown: number; activeNeed: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-paper/75 p-1.5 shadow-[0_40px_90px_-46px_rgba(22,50,90,0.55)] ring-1 ring-ink/10 backdrop-blur-md">
      <div className="flex h-8 items-center gap-1.5 px-2">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 text-[11px] font-medium text-slate">Capability workspace</span>
      </div>
      <div className="grid h-[430px] overflow-hidden rounded-xl border border-line bg-paper sm:h-[460px] md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r border-line p-4 md:block">
          <p className="px-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">Business needs</p>
          <ul className="mt-3 space-y-1">
            {needs.map((need, i) => {
              const on = i === activeNeed;
              return (
                <li
                  key={need}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] transition-colors duration-500",
                    on ? "bg-mist font-medium text-ink" : "text-slate",
                  )}
                >
                  {need}
                  <span className={cn("h-1.5 w-1.5 rounded-full", on ? "bg-brand" : "bg-line")} />
                </li>
              );
            })}
          </ul>
        </aside>
        <div className="flex h-full flex-col bg-dots">
          <div className="flex items-center justify-between border-b border-line/80 bg-paper/80 px-4 py-2.5">
            <p className="text-sm font-medium">New engagement</p>
            <span className="text-[11px] font-medium text-slate">Live</span>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-3 overflow-hidden p-4 sm:p-5">
            {thread.slice(0, shown).map((message, i) => (
              <div key={message.text} className={cn("flex", message.from === "you" ? "justify-end" : "justify-start")}>
                <p
                  className={cn(
                    "max-w-[34rem] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-card",
                    message.from === "you" ? "rounded-br-md bg-inverse text-on-inverse" : "rounded-bl-md bg-paper text-ink ring-1 ring-line",
                  )}
                  style={{ animation: "hero-message 0.55s cubic-bezier(0.22,1,0.36,1) both", animationDelay: `${i * 40}ms` }}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {shown < thread.length && (
              <div className="flex justify-start">
                <span className="inline-flex gap-1 rounded-full bg-paper px-3 py-2 ring-1 ring-line">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-slate" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-slate [animation-delay:180ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-slate [animation-delay:360ms]" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="sr-only">
        A conversation that connects an AI initiative to a delivery pod, specialist review, and governance.
      </p>
    </div>
  );
}

const domains = [
  "AI & Data",
  "Cloud",
  "Cyber security",
  "Engineering",
  "Offshore delivery",
  "Advisory",
  "Automation",
  "Data platforms",
];

export function DomainMarquee() {
  const row = [...domains, ...domains];
  return (
    <div className="relative overflow-hidden border-t border-line bg-paper">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent" />
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-3 px-7 py-5 text-sm font-medium text-ink/80">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
