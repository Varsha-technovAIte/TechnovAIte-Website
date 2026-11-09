import Link from "next/link";
import { CapabilityIllustration } from "@/components/CapabilityIllustration";
import { Assembly } from "@/components/home/Assembly";
import { ConnectedStatement } from "@/components/home/ConnectedStatement";
import { Hero } from "@/components/home/HeroStage";
import { ScrollShowcase } from "@/components/home/ScrollShowcase";
import { SignalBoard } from "@/components/home/SignalBoard";
import { Icon, IconTile, type IconName } from "@/components/Icons";
import { Arrow, Button, Container, Eyebrow, Section, SectionHeader, StatusBadge } from "@/components/ui";
import { capabilities, resourceCategories } from "@/lib/site";

const problems: { icon: IconName; title: string; copy: string }[] = [
  { icon: "fragmented", title: "Fragmented expertise", copy: "The right capabilities sit with different providers." },
  { icon: "capacity", title: "Limited capacity", copy: "Internal teams cannot always scale at the pace of the work." },
  { icon: "coordination", title: "Complex coordination", copy: "Managing several specialists adds overhead of its own." },
  { icon: "uncertainty", title: "Execution uncertainty", copy: "Unclear accountability makes delivery harder to trust." },
];

const outcomes: { icon: IconName; title: string; copy: string }[] = [
  { icon: "accelerate", title: "Accelerate execution", copy: "Access suitable delivery capabilities without starting from scratch." },
  { icon: "scale", title: "Scale with flexibility", copy: "Choose capability models that adapt to the requirement." },
  { icon: "coordinate", title: "Improve coordination", copy: "Bring clarity to partner roles, governance, and delivery structures." },
  { icon: "shield", title: "Reduce execution risk", copy: "Make capability decisions with clearer accountability." },
];

export default function Home() {
  return (
    <>
      <Hero />

      <Section className="!pb-8">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              <span className="text-ink">Technology delivery is complex.</span>{" "}
              <span className="text-ink/55">Finding the right capability shouldn’t be.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem) => (
              <div key={problem.title} data-reveal>
                <IconTile name={problem.icon} />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{problem.title}</h3>
                <p className="mt-2 leading-relaxed text-slate">{problem.copy}</p>
              </div>
            ))}
          </div>
          <ScrollShowcase />
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
              <span className="text-ink">Live from the first conversation.</span>{" "}
              <span className="text-ink/55">The engagement assembles around the outcome.</span>
            </h2>
          </div>
          <Assembly />
        </Container>
      </Section>

      <Section>
        <Container>
          <p className="text-sm font-medium text-slate">The model</p>
          <h2 className="mt-3 max-w-4xl text-balance text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
            Connected around the outcome.
          </h2>
          <ConnectedStatement />
        </Container>
      </Section>

      <Section tone="mist" className="!pt-8">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Signals</Eyebrow>
            <h2 className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
              <span className="text-ink">Everything the decision needs.</span>{" "}
              <span className="text-ink/55">None of the noise around it.</span>
            </h2>
          </div>
          <SignalBoard />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Built for better outcomes"
            title="Less complexity. More confidence in delivery."
            copy="Initiatives move when the right capabilities, structures, and partners are aligned from the beginning."
          />
          <div className="mt-14 grid border-t border-line sm:grid-cols-2">
            {outcomes.map((outcome, i) => (
              <div
                key={outcome.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="border-b border-line py-10 sm:px-8 sm:odd:border-r sm:odd:pl-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate">0{i + 1}</span>
                  <Icon name={outcome.icon} className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{outcome.title}</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-slate">{outcome.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="capabilities" tone="mist">
        <Container>
          <SectionHeader
            eyebrow="Our capabilities"
            title="The right capability for what comes next."
            copy="From specialist delivery teams to offshore operating models, TechnovAIte helps structure technology capabilities around your objectives."
          />
          <div className="mt-14 space-y-6">
            {capabilities.map((capability, i) => (
              <article
                key={capability.slug}
                data-reveal
                className="group grid overflow-hidden rounded-3xl border border-line bg-paper transition-shadow duration-300 hover:shadow-lift lg:grid-cols-2"
              >
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <div className="flex h-full flex-col justify-between gap-10 p-8 sm:p-12">
                    <div>
                      <p className="text-sm font-semibold text-brand-strong">
                        0{i + 1} · {capability.name}
                      </p>
                      <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                        {capability.headline}
                      </h3>
                      <p className="mt-4 text-lg leading-relaxed text-slate">{capability.summary}</p>
                    </div>
                    <Link
                      href={`/capabilities/${capability.slug}`}
                      className="group/link inline-flex items-center gap-2 font-medium text-ink hover:text-brand-strong"
                    >
                      {capability.cta} <Arrow />
                    </Link>
                  </div>
                </div>
                <div className="p-3">
                  <CapabilityIllustration slug={capability.slug} className="h-full min-h-[300px]" />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader eyebrow="Resources" title="Ideas for better technology decisions." />
            <Button href="/resources" variant="secondary">
              Visit resources <Arrow />
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {resourceCategories.slice(0, 3).map((category, i) => (
              <Link
                key={category}
                href="/resources"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="group flex flex-col rounded-2xl border border-line bg-paper p-3 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div aria-hidden className="relative h-40 overflow-hidden rounded-xl bg-pinstripe">
                  <div className="absolute bottom-4 left-4 h-14 w-14 rounded-full bg-navy/90" />
                  <div className="absolute bottom-4 left-14 h-14 w-14 rounded-full bg-brand/80 mix-blend-multiply" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-strong">{category}</span>
                  <p className="mt-2 text-lg font-semibold tracking-tight">Perspectives coming soon</p>
                  <div className="mt-4">
                    <StatusBadge tone="muted">In preparation</StatusBadge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <section className="border-t border-line py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              The right capabilities run through TechnovAIte.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate">
              An honest conversation about the outcome, the model, and whether this is the right fit.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/contact" size="lg">
                Let&apos;s talk <Arrow />
              </Button>
              <Button href="/capabilities" size="lg" variant="secondary">
                Explore capabilities
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
