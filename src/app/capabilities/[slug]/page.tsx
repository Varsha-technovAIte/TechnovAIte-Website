import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckList, CtaBanner, PageHero } from "@/components/blocks";
import { CapabilityIllustration } from "@/components/CapabilityIllustration";
import { Arrow, Button, Container, Section, SectionHeader } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { capabilities, processSteps } from "@/lib/site";

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMeta(c.name, `${c.summary} ${c.headline}`, `/capabilities/${c.slug}`);
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = capabilities.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const c = capabilities[index];
  const others = capabilities.filter((x) => x.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.name,
    description: c.summary,
    provider: { "@type": "Organization", name: "TechnovAIte", url: "https://technovaite.com" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow={c.name}
        title={c.headline}
        copy={c.summary}
        crumbs={[
          { label: "Capabilities", href: "/capabilities" },
          { label: c.name, href: `/capabilities/${c.slug}` },
        ]}
      >
        <Button href="/contact" size="lg">
          Let&apos;s Talk <Arrow />
        </Button>
        <Button href="/capabilities" size="lg" variant="secondary">
          All capabilities
        </Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader eyebrow="Overview" title="What this capability model offers." copy={c.detail} />
              <div className="mt-8 flex flex-wrap gap-2" data-reveal>
                {c.areas.map((a) => (
                  <span key={a} className="rounded-full bg-mist px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line">
                    {a}
                  </span>
                ))}
              </div>
              {c.slug === "ai-digital-delivery-pods" && (
                <p className="mt-4 text-sm text-slate">Areas are subject to partner availability.</p>
              )}
            </div>
            <div data-reveal>
              <CapabilityIllustration slug={c.slug} className="min-h-[360px] p-8" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionHeader eyebrow="Is it the right fit?" title="This model may suit you if…" />
            <div data-reveal className="pt-2">
              <CheckList items={c.fit} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="How we engage" title="A structured path from need to delivery." />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <li key={s.title} data-reveal className="rounded-2xl border border-line p-6">
                <span className="text-sm font-semibold text-brand-strong">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.copy}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-slate">
            Execution is delivered through selected partner organisations under agreed commercial and operating models.
          </p>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight">Other capabilities</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/capabilities/${o.slug}`}
                className="group rounded-2xl border border-line bg-paper p-6 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <p className="font-semibold">{o.name}</p>
                <p className="mt-2 text-sm text-slate">{o.headline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-brand-strong">
                  Learn more <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner title={`Discuss ${c.name} for your initiative.`} />
    </>
  );
}
