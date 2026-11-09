import { notFound } from "next/navigation";
import { CtaBanner, PageHero } from "@/components/blocks";
import { ResourceCard } from "@/components/ResourceCard";
import { ComingSoon, Container, Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { articles } from "@/lib/resources";
import { resourceSections } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return resourceSections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const s = resourceSections.find((x) => x.slug === section);
  if (!s) return {};
  const hasContent = articles.some((a) => a.section === s.slug);
  return pageMeta(s.label, s.blurb, `/resources/${s.slug}`, { noindex: !hasContent });
}

export default async function ResourceSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const s = resourceSections.find((x) => x.slug === section);
  if (!s) notFound();
  const items = articles.filter((a) => a.section === s.slug);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={s.label}
        copy={s.blurb}
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: s.label, href: `/resources/${s.slug}` },
        ]}
      />
      <Section>
        <Container>
          {items.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <ResourceCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <ComingSoon
              title={`${s.label} coming soon`}
              copy="Content for this section is being prepared and will be published once reviewed."
              cta={{ label: "Back to Resources", href: "/resources" }}
            />
          )}
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
