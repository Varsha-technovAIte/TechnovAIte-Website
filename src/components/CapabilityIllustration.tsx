import { cn } from "./ui";

/** Original product-style illustrations, one per capability. Decorative. */
export function CapabilityIllustration({ slug, className }: { slug: string; className?: string }) {
  return (
    <div aria-hidden className={cn("relative overflow-hidden rounded-2xl bg-grid bg-mist p-6", className)}>
      {slug === "ai-digital-delivery-pods" && <Pods />}
      {slug === "nano-gcc-bot" && <Gcc />}
      {slug === "partner-led-specialist-services" && <Specialists />}
      {slug === "platform-enabled-advisory" && <Advisory />}
    </div>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-xl bg-paper p-4 shadow-card ring-1 ring-line", className)}>{children}</div>;
}

function Pods() {
  const pods = [
    { name: "AI Engineering Pod", roles: ["ML", "Data", "QA"], progress: 72 },
    { name: "Product Delivery Pod", roles: ["FE", "BE", "UX"], progress: 48 },
    { name: "Automation Pod", roles: ["RPA", "Ops"], progress: 30 },
  ];
  return (
    <div className="space-y-3">
      {pods.map((p, i) => (
        <Panel key={p.name} className={cn(i === 0 && "ring-brand/40")}>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">{p.name}</span>
            <span className="flex -space-x-1.5">
              {p.roles.map((r) => (
                <span
                  key={r}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[8.5px] font-semibold text-white ring-2 ring-paper"
                >
                  {r}
                </span>
              ))}
            </span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-mist">
            <div className="h-1.5 rounded-full bg-brand" style={{ width: `${p.progress}%` }} />
          </div>
        </Panel>
      ))}
    </div>
  );
}

function Gcc() {
  const phases = ["Build", "Operate", "Transfer"];
  return (
    <div className="space-y-3">
      <Panel>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">BOT pathway</p>
        <div className="mt-4 flex items-center">
          {phases.map((p, i) => (
            <div key={p} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                    i === 0 ? "bg-brand text-white" : i === 1 ? "bg-brand-soft text-brand-strong" : "bg-mist text-slate",
                  )}
                >
                  {i + 1}
                </span>
                <span className="text-[12px] font-medium text-ink">{p}</span>
              </div>
              {i < phases.length - 1 && <div className="mx-2 mb-6 h-px flex-1 border-t border-dashed border-ink/20" />}
            </div>
          ))}
        </div>
      </Panel>
      <Panel>
        <div className="flex items-end gap-2">
          {[28, 40, 52, 64, 78, 92].map((h, i) => (
            <div key={i} className="flex-1 rounded-md bg-navy/80" style={{ height: h, opacity: 0.35 + i * 0.12 }} />
          ))}
        </div>
        <p className="mt-3 text-[12px] text-slate">Capability scaled in line with your roadmap</p>
      </Panel>
    </div>
  );
}

function Specialists() {
  const domains = ["Cloud", "Cyber", "AI", "Transformation"];
  return (
    <div className="space-y-3">
      <Panel>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">Programme requirement</p>
        <p className="mt-1.5 text-[13px] font-semibold text-ink">Specialist expertise for a transformation programme</p>
      </Panel>
      <div className="grid grid-cols-2 gap-3">
        {domains.map((d, i) => (
          <Panel key={d} className={cn("flex items-center justify-between", i === 2 && "ring-brand/50")}>
            <span className="text-[13px] font-medium text-ink">{d}</span>
            <span className={cn("h-2 w-2 rounded-full", i === 2 ? "bg-brand" : "bg-navy/40")} />
          </Panel>
        ))}
      </div>
      <Panel className="flex items-center justify-between">
        <span className="text-[12px] text-slate">Partner alignment</span>
        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand-strong">Aligned</span>
      </Panel>
    </div>
  );
}

function Advisory() {
  const options = [
    { name: "Delivery Pod", fit: 82 },
    { name: "Nano-GCC", fit: 64 },
    { name: "Specialist partner", fit: 48 },
  ];
  return (
    <div className="space-y-3">
      <Panel>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">Model comparison</p>
        <div className="mt-3 space-y-3">
          {options.map((o, i) => (
            <div key={o.name}>
              <div className="flex justify-between text-[12px]">
                <span className="font-medium text-ink">{o.name}</span>
                <span className="text-slate">Illustrative</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-mist">
                <div
                  className={cn("h-1.5 rounded-full", i === 0 ? "bg-brand" : "bg-navy/50")}
                  style={{ width: `${o.fit}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-deep text-xs font-semibold text-white">✓</span>
        <span className="text-[13px] font-medium text-ink">Recommended next step: scoping conversation</span>
      </Panel>
    </div>
  );
}
