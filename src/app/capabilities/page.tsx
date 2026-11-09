import Link from "next/link";
import { CtaBanner, PageHero } from "@/components/blocks";
import { CapabilityIllustration } from "@/components/CapabilityIllustration";
import { OrchestrationExperience } from "@/components/OrchestrationExperience";
import { Arrow, Button, Container, Section, SectionHeader } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { capabilities } from "@/lib/site";

export const metadata = pageMeta(
  "Capabilities",
  "AI & Digital Delivery Pods, Nano-GCC & BOT, Partner-Led Specialist Services, and Platform-Enabled Advisory — four capability models, one orchestrated approach.",
  "/capabilities",
);

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our capabilities"
        title="Four models. One orchestrated approach."
        copy="From specialist delivery teams to offshore operating models, TechnovAIte helps structure technology capabilities around your business objectives."
        crumbs={[{ label: "Capabilities", href: "/capabilities" }]}
      >
        <Button href="/contact" size="lg">
          Let&apos;s Talk <Arrow />
        </Button>
        <Button href="#find" size="lg" variant="secondary">
          Find your capability
        </Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <Link
                key={c.slug}
                href={`/capabilities/${c.slug}`}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-paper p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <CapabilityIllustration slug={c.slug} className="min-h-[280px]" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-brand-strong">
                    0{i + 1} · {c.name}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{c.headline}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-slate">{c.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-medium group-hover:text-brand-strong">
                    {c.cta} <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="find" tone="mist">
        <Container>
          <SectionHeader
            eyebrow="A connected approach"
            title="Not sure where to start? Begin with your need."
            copy="Select what you’re trying to achieve and see which capabilities TechnovAIte would bring together."
          />
          <div className="mt-12" data-reveal>
            <OrchestrationExperience />
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
