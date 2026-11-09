import { CheckList, CtaBanner, PageHero } from "@/components/blocks";
import { IconTile } from "@/components/Icons";
import { Arrow, Button, Card, Container, Section, SectionHeader } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "About TechnovAIte",
  "TechnovAIte is a technology capability orchestration company connecting organisations with curated specialist partners and flexible delivery models.",
  "/company/about",
);

const why = [
  "Partner-led delivery — cost and value flow directly to clients",
  "Built for businesses in transition and growth",
  "Governance and accountability built into every engagement",
  "AI-ready by design, not retrofitted later",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About TechnovAIte"
        title="Connecting capability. Enabling progress."
        copy="TechnovAIte helps organisations identify, access, structure, and coordinate technology capabilities through curated specialist partners and flexible delivery models."
        crumbs={[{ label: "Company", href: "/company/about" }, { label: "About", href: "/company/about" }]}
      >
        <Button href="/contact" size="lg">
          Let&apos;s Talk <Arrow />
        </Button>
        <Button href="/company/approach" size="lg" variant="secondary">
          Our Approach
        </Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <SectionHeader
              eyebrow="Our mission"
              title="Help organisations move forward with greater confidence."
              copy="We connect the right technology capabilities, partners, and delivery models so leaders can accelerate initiatives, access specialist expertise, establish scalable delivery capacity, and reduce execution complexity."
            />
            <div data-reveal className="rounded-3xl bg-mist p-8 sm:p-10">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-slate">Our operating model</p>
              <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight">
                We orchestrate structure, governance, and alignment.{" "}
                <span className="text-slate">Execution is delivered through selected partner networks.</span>
              </p>
              <p className="mt-5 leading-relaxed text-slate">
                Technology execution is performed by selected delivery partners under agreed commercial and operating
                models. TechnovAIte’s role is capability structuring, partner alignment, and coordination.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeader eyebrow="Operating philosophy" title="Outcomes first. Structure always. Partners aligned." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Card>
              <IconTile name="accelerate" />
              <h3 className="mt-6 text-lg font-semibold">Customer outcomes first</h3>
              <p className="mt-2 text-slate">Every engagement starts from the business challenge — not from a list of services.</p>
            </Card>
            <Card>
              <IconTile name="governance" />
              <h3 className="mt-6 text-lg font-semibold">Structure before scale</h3>
              <p className="mt-2 text-slate">The right capability model, roles, and governance are defined before delivery begins.</p>
            </Card>
            <Card>
              <IconTile name="connect" />
              <h3 className="mt-6 text-lg font-semibold">Curated, not crowded</h3>
              <p className="mt-2 text-slate">Specialist partners are selected for fit, so you gain capability without vendor fragmentation.</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <SectionHeader
              eyebrow="Why TechnovAIte"
              title="Not another consulting firm."
              copy="We’re a structured capability partner — one that connects you to the right delivery at the right time."
            />
            <div data-reveal className="pt-2">
              <CheckList items={why} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
