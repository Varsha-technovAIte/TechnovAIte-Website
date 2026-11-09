import { SolvrrMark } from "./Logo";
import { cn } from "./ui";

/** Conceptual Solvrr™ interface. Clearly labelled as a platform concept — not live functionality. */
export function SolvrrConcept({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <div aria-hidden className="overflow-hidden rounded-3xl border border-white/10 bg-[#0f2240] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <SolvrrMark dark className="text-base" />
          <span className="rounded-full bg-brand/15 px-2.5 py-1 text-[11px] font-medium text-brand ring-1 ring-brand/30">
            Platform concept
          </span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            {/* Challenge input */}
            <div className="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/10">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">Business challenge</p>
              <p className="mt-2 text-[13.5px] text-white">
                We need to modernise our data platform while launching our first AI use case.
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse-soft bg-brand" />
              </p>
            </div>
            {/* Capability exploration */}
            <div className="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/10">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">Capabilities explored</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Data platforms", "AI engineering", "Governance", "Cloud", "Change"].map((c, i) => (
                  <span
                    key={c}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11.5px]",
                      i < 3 ? "bg-brand/20 text-white ring-1 ring-brand/40" : "bg-white/5 text-white/60",
                    )}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Option comparison */}
          <div className="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/10">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">Option comparison</p>
            <div className="mt-3 space-y-3">
              {[
                ["Delivery pod", 78],
                ["Specialist partner", 61],
                ["Nano-GCC", 40],
              ].map(([n, w], i) => (
                <div key={n as string}>
                  <div className="flex justify-between text-[12px] text-white/80">
                    <span>{n}</span>
                    <span className="text-white/40">Confidence</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                    <div className={cn("h-1.5 rounded-full", i === 0 ? "bg-brand" : "bg-white/40")} style={{ width: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Execution pathway */}
        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">Execution pathway</p>
          <div className="mt-3 flex items-center gap-2 text-[12px]">
            {["Discover", "Decide", "Connect", "Execute"].map((s, i, a) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1",
                    i < 2 ? "bg-brand text-white" : i === 2 ? "bg-white/15 text-white" : "bg-white/5 text-white/50",
                  )}
                >
                  {s}
                </span>
                {i < a.length - 1 && <span className="h-px flex-1 border-t border-dashed border-white/25" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-white/50">
        Illustrative concept of the Solvrr™ platform vision. Features shown are not yet generally available.
      </figcaption>
    </figure>
  );
}
