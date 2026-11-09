import { Icon, type IconName } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { SolvrrMark } from "@/components/Logo";
import { SolvrrConcept } from "@/components/SolvrrConcept";
import { Arrow, Button, Container, Eyebrow, Section, SectionHeader, StatusBadge, cn } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Solvrr™ — Clarity for better technology decisions",
  "Solvrr™ by TechnovAIte is an emerging platform vision to help organisations navigate technology choices, explore capabilities, and move toward execution with greater confidence.",
  "/solvrr",
);

const challenges = [
  "Too many options, too little clarity on which capability fits",
  "Decisions made without a structured view of trade-offs",
  "A gap between choosing a direction and mobilising execution",
];

const pillars: { id: string; icon: IconName; eyebrow: string; title: string; copy: string; points: string[] }[] = [
  {
    id: "discover",
    icon: "discover",
    eyebrow: "Discover capabilities",
    title: "Start from the problem, not the vendor list.",
    copy: "Describe a business challenge and explore the technology capabilities and potential solution pathways that could address it.",
    points: ["Business challenge input", "Capability exploration", "Solution pathways"],
  },
  {
    id: "evaluate",
    icon: "decide",
    eyebrow: "Evaluate options",
    title: "Compare options with greater clarity.",
    copy: "Bring structure to technology and capability decisions so trade-offs are visible before commitments are made.",
    points: ["Option comparison", "Decision support", "Confidence indicators"],
  },
  {
    id: "connect",
    icon: "connect",
    eyebrow: "Connect decisions to execution",
    title: "From decision to a structured path forward.",
    copy: "Create a more structured path toward suitable expertise and execution options through the TechnovAIte ecosystem.",
    points: ["Execution pathway visualisation", "Partner alignment", "Handover to delivery"],
  },
];

const roadmap = [
  { stage: "Now", status: "In progress", items: ["Platform vision and concept design", "Early conversations with business leaders", "Waitlist open"] },
  { stage: "Next", status: "Planned", items: ["Guided capability discovery", "Structured option comparison"] },
  { stage: "Later", status: "Exploring", items: ["Decision-support intelligence", "Connected execution pathways"] },
];

export default function SolvrrPage() {
  return (
    <div className="bg-navy-deep text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
        <div aria-hidden className="absolute left-1/2 top-[-200px] h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
        <Container className="relative pb-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <SolvrrMark dark className="text-4xl" />
            <div className="mt-8">
              <Eyebrow dark>Solvrr™ by TechnovAIte</Eyebrow>
            </div>
            <h1 className="mt-5 text-balance text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Clarity for better technology decisions.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              A platform vision designed to help organisations navigate technology choices, explore capabilities, and
              move toward execution with greater confidence.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="#waitlist" size="lg">
                Join the Waitlist <Arrow />
              </Button>
              <Button href="#vision" size="lg" variant="light">
                Explore the vision
              </Button>
            </div>
            <div className="mt-6 flex justify-center">
              <StatusBadge tone="dark">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> In development — not yet generally available
              </StatusBadge>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-4xl" data-reveal>
            <SolvrrConcept />
          </div>
        </Container>
      </section>

      {/* 1. Challenge */}
      <Section tone="dark" className="border-t border-white/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionHeader
              dark
              eyebrow="The challenge"
              title="Technology decisions carry more weight — and more uncertainty — than ever."
            />
            <ul className="space-y-4 pt-2" data-reveal>
              {challenges.map((c, i) => (
                <li key={c} className="flex gap-4 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                  <span className="text-sm font-semibold text-brand">0{i + 1}</span>
                  <span className="text-lg text-white/85">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 2. Vision */}
      <Section id="vision" tone="dark" className="border-t border-white/10">
        <Container>
          <SectionHeader
            dark
            align="center"
            eyebrow="The Solvrr™ vision"
            title="Make technology decisions with greater confidence."
            copy="Solvrr™ is TechnovAIte’s emerging platform vision for bringing greater intelligence, clarity, and structure to technology capability decisions and execution planning."
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3" data-reveal>
            {(["Discover", "Decide", "Connect"] as const).map((p, i) => (
              <div key={p} className="relative rounded-2xl bg-white/[0.05] p-6 text-center ring-1 ring-white/10">
                <span className="text-xs font-semibold text-white/40">0{i + 1}</span>
                <p className="mt-2 text-2xl font-semibold">{p}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3–5. Pillars */}
      {pillars.map((p, i) => (
        <Section key={p.id} id={p.id} tone="dark" className="border-t border-white/10">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className={cn(i % 2 === 1 && "lg:order-2")}>
                <SectionHeader dark eyebrow={p.eyebrow} title={p.title} copy={p.copy} />
                <div className="mt-6" data-reveal>
                  <StatusBadge tone="dark">Roadmap capability</StatusBadge>
                </div>
              </div>
              <div data-reveal className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/30">
                    <Icon name={p.icon} />
                  </span>
                  <span className="text-sm text-white/50">Concept workflow</span>
                </div>
                <ol className="mt-6 space-y-3">
                  {p.points.map((pt, j) => (
                    <li key={pt} className="flex items-center gap-4 rounded-xl bg-white/[0.05] px-4 py-3.5">
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                          j === 0 ? "bg-brand text-white" : "bg-white/10 text-white/70",
                        )}
                      >
                        {j + 1}
                      </span>
                      <span className="font-medium">{pt}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* 6. How it could work */}
      <Section id="how-it-works" tone="dark" className="border-t border-white/10">
        <Container>
          <SectionHeader
            dark
            eyebrow="How it could work"
            title="From challenge to execution pathway."
            copy="An illustrative flow of how Solvrr™ is intended to support leaders. Subject to change as the platform develops."
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-4">
            {[
              ["Describe", "Share the business challenge in plain language."],
              ["Explore", "See relevant capabilities and potential pathways."],
              ["Compare", "Weigh options with structured decision support."],
              ["Mobilise", "Connect to suitable expertise through TechnovAIte."],
            ].map(([t, c], i) => (
              <li key={t} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }} className="relative rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
                <span className="text-sm font-semibold text-brand">Step 0{i + 1}</span>
                <p className="mt-3 text-xl font-semibold">{t}</p>
                <p className="mt-2 text-white/65">{c}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 7. Roadmap / status */}
      <Section id="roadmap" tone="dark" className="border-t border-white/10">
        <Container>
          <SectionHeader dark eyebrow="Platform status" title="Where Solvrr™ is today." copy="We’re clear about what exists and what’s still ahead." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {roadmap.map((r, i) => (
              <div
                key={r.stage}
                data-reveal
                className={cn("rounded-2xl p-6 ring-1", i === 0 ? "bg-brand/10 ring-brand/40" : "bg-white/[0.03] ring-white/10")}
              >
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold">{r.stage}</p>
                  <StatusBadge tone="dark">{r.status}</StatusBadge>
                </div>
                <ul className="mt-6 space-y-2.5 text-white/75">
                  {r.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span aria-hidden className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", i === 0 ? "bg-brand" : "bg-white/30")} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Waitlist */}
      <Section id="waitlist" tone="dark" className="border-t border-white/10">
        <Container>
          <div className="grid gap-12 rounded-[28px] bg-white/[0.04] p-7 ring-1 ring-white/10 sm:p-12 lg:grid-cols-2">
            <div>
              <Eyebrow dark>Join the waitlist</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em]">Be first to hear as Solvrr™ takes shape.</h2>
              <p className="mt-4 text-lg text-white/70">
                Register your interest to receive updates on the platform’s progress and early-access opportunities.
              </p>
            </div>
            <LeadForm kind="waitlist" dark />
          </div>
        </Container>
      </Section>
    </div>
  );
}
