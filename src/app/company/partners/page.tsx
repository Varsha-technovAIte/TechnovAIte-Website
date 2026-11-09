import { CheckList, CtaBanner, PageHero } from "@/components/blocks";
import { IconTile } from "@/components/Icons";
import { Card, ComingSoon, Container, Section, SectionHeader } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Partner Ecosystem",
  "How curated specialist partners fit into the TechnovAIte capability orchestration model.",
  "/company/partners",
);

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner ecosystem"
        title="Structured capability. Delivered through trusted partners."
        copy="TechnovAIte enables organisations to access the right capability model through a curated ecosystem of specialist partners — aligned to your stage of growth and operational maturity."
        crumbs={[{ label: "Company", href: "/company/about" }, { label: "Partner Ecosystem", href: "/company/partners" }]}
      />
      <Section>
        <Container>
          <SectionHeader eyebrow="Why it matters" title="The right expertise is stronger when it’s connected." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Card>
              <IconTile name="specialist" />
              <h3 className="mt-6 text-lg font-semibold">Curated, not catalogued</h3>
              <p className="mt-2 text-slate">Partners are aligned to your specific requirement rather than offered from a long list.</p>
            </Card>
            <Card>
              <IconTile name="governance" />
              <h3 className="mt-6 text-lg font-semibold">Governed engagement</h3>
              <p className="mt-2 text-slate">Roles, accountability, and engagement structures are agreed before execution begins.</p>
            </Card>
            <Card>
              <IconTile name="scale" />
              <h3 className="mt-6 text-lg font-semibold">Flexible structures</h3>
              <p className="mt-2 text-slate">Capability can be configured as pods, offshore models, or specialist engagements.</p>
            </Card>
          </div>
        </Container>
      </Section>
      <Section tone="mist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionHeader
              eyebrow="How partners fit"
              title="We orchestrate. Partners execute."
              copy="Technology execution is performed through selected delivery partners under agreed commercial and operating models. TechnovAIte provides orchestration, capability structuring, partner alignment, and coordination."
            />
            <div data-reveal className="pt-2">
              <CheckList
                items={[
                  "Curated specialist capabilities",
                  "Flexible delivery structures",
                  "Clearer engagement models",
                  "Governance-oriented coordination",
                  "Business-outcome alignment",
                ]}
              />
            </div>
          </div>
          <div className="mt-16">
            <ComingSoon
              title="Partner showcase"
              copy="Partner profiles and logos will be published here once approved by each partner organisation."
              cta={{ label: "Become a delivery partner", href: "/careers#partner-opportunities" }}
            />
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
