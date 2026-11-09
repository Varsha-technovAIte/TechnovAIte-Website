import { CtaBanner, PageHero } from "@/components/blocks";
import { Arrow, Button, Container, Section, SectionHeader } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Our Approach",
  "How TechnovAIte structures and coordinates partner-led capability models — from business need through orchestration to outcome.",
  "/company/approach",
);

const layers = [
  {
    label: "Business need",
    items: ["Scale digital delivery", "Access specialist expertise", "Build offshore capability"],
  },
  {
    label: "TechnovAIte orchestration layer",
    items: ["Capability structuring", "Partner alignment", "Governance & financial visibility"],
    highlight: true,
  },
  {
    label: "Partner capability",
    items: ["AI & Digital Delivery Pods", "Nano-GCC & BOT", "Partner-Led Specialist Services", "Platform-Enabled Advisory"],
  },
  {
    label: "Outcome",
    items: ["Predictable digital delivery", "Reduced operational risk", "Scalable capability"],
  },
];

const scenarios = [
  {
    title: "Scaling delivery",
    need: "Increase delivery capacity quickly",
    model: "AI & Digital Delivery Pods via curated partners",
    outcome: "Rapid scale without operational overhead",
  },
  {
    title: "Building offshore capability",
    need: "Offshore delivery without structural complexity",
    model: "Nano-GCC or BOT setup via partner ecosystem",
    outcome: "Structured offshore capability with governance",
  },
  {
    title: "Accessing specialist expertise",
    need: "Niche expertise for transformation programmes",
    model: "Partner-led specialist services aligned to the programme",
    outcome: "High-quality expertise without vendor fragmentation",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title="A more connected way to deliver technology outcomes."
        copy="TechnovAIte connects organisations with curated partner-led capabilities through structured governance and orchestration."
        crumbs={[{ label: "Company", href: "/company/about" }, { label: "Our Approach", href: "/company/approach" }]}
      />

      <Section>
        <Container>
          <SectionHeader eyebrow="How the model works" title="Four layers. One coordinated path to outcomes." />
          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {layers.map((l, i) => (
              <div
                key={l.label}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className={
                  l.highlight
                    ? "rounded-2xl bg-navy-deep p-6 text-white shadow-lift"
                    : "rounded-2xl border border-line bg-paper p-6"
                }
              >
                <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${l.highlight ? "text-brand" : "text-slate"}`}>
                  {String(i + 1).padStart(2, "0")} · {l.label}
                </p>
                <ul className="mt-5 space-y-2">
                  {l.items.map((it) => (
                    <li
                      key={it}
                      className={`rounded-lg px-3 py-2 text-sm font-medium ${l.highlight ? "bg-white/10" : "bg-mist"}`}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-slate" data-reveal>
            TechnovAIte structures the model, aligns trusted partners, and enables predictable delivery pathways.
            Execution is delivered through selected partner organisations.
          </p>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeader eyebrow="Use case scenarios" title="What the approach looks like in practice." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {scenarios.map((s) => (
              <div key={s.title} data-reveal className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <dl className="mt-6 space-y-4 text-[15px]">
                  {(
                    [
                      ["Need", s.need],
                      ["Model", s.model],
                      ["Outcome", s.outcome],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-strong">{k}</dt>
                      <dd className="mt-1 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/company/how-we-work" variant="secondary">
              See how we work <Arrow />
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
