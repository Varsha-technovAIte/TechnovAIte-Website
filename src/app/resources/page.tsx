import Link from "next/link";
import { CtaBanner, PageHero } from "@/components/blocks";
import { ResourceCard } from "@/components/ResourceCard";
import { Arrow, ComingSoon, Container, Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { articles } from "@/lib/resources";
import { resourceCategories, resourceSections } from "@/lib/site";

export const metadata = pageMeta(
  "Resources",
  "Ideas and insights for better technology decisions — AI, digital delivery, technology strategy, offshore capability models and more.",
  "/resources",
);

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Ideas and insights for better technology decisions."
        copy="A growing editorial library for leaders navigating technology capability, delivery models, and execution."
        crumbs={[{ label: "Resources", href: "/resources" }]}
      />
      <Section>
        <Container>
          <div className="flex flex-wrap gap-2" data-reveal>
            {resourceCategories.map((c) => (
              <span key={c} className="rounded-full bg-mist px-4 py-2 text-sm font-medium text-ink ring-1 ring-line">
                {c}
              </span>
            ))}
          </div>

          {articles.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ResourceCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <ComingSoon
                title="Our first insights are in preparation"
                copy="We’re preparing practical perspectives on technology capability, delivery models, and AI execution. Join the Solvrr™ waitlist or get in touch to hear when they’re published."
                cta={{ label: "Get in touch", href: "/contact" }}
              />
            </div>
          )}

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {resourceSections.map((s) => (
              <Link
                key={s.slug}
                href={`/resources/${s.slug}`}
                data-reveal
                className="group flex flex-col rounded-2xl border border-line p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="font-semibold">{s.label}</span>
                <span className="mt-2 flex-1 text-sm text-slate">{s.blurb}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-brand-strong">
                  View <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
