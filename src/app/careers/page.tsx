import { CtaBanner, PageHero } from "@/components/blocks";
import { IconTile } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { Arrow, Button, Card, ComingSoon, Container, Section, SectionHeader } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Careers",
  "Build what’s next with TechnovAIte. Explore opportunities to contribute to a more connected technology ecosystem.",
  "/careers",
);

// Add verified open roles here. When empty, the page shows "No open roles right now."
const openRoles: { title: string; location: string; type: string; href: string }[] = [];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build what’s next with TechnovAIte."
        copy="Explore opportunities to contribute to a more connected technology ecosystem."
        crumbs={[{ label: "Careers", href: "/careers" }]}
      >
        <Button href="#opportunities" size="lg">
          Open Opportunities <Arrow />
        </Button>
        <Button href="#partner-opportunities" size="lg" variant="secondary">
          Partner Opportunities
        </Button>
      </PageHero>

      <Section id="life">
        <Container>
          <SectionHeader
            eyebrow="Working at TechnovAIte"
            title="Help organisations connect to the capabilities they need."
            copy="TechnovAIte works at the intersection of business challenges, specialist expertise, and delivery models — structuring how technology capability comes together."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Card>
              <IconTile name="accelerate" />
              <h3 className="mt-6 text-lg font-semibold">Outcomes over features</h3>
              <p className="mt-2 text-slate">We begin with customer challenges and the results they need.</p>
            </Card>
            <Card>
              <IconTile name="shield" />
              <h3 className="mt-6 text-lg font-semibold">Trust over hype</h3>
              <p className="mt-2 text-slate">We are clear about what we do, how we do it, and who delivers.</p>
            </Card>
            <Card>
              <IconTile name="connect" />
              <h3 className="mt-6 text-lg font-semibold">Clarity over complexity</h3>
              <p className="mt-2 text-slate">We bring structure so the right people can do their best work.</p>
            </Card>
          </div>
          <div className="mt-10">
            <ComingSoon
              title="Team stories"
              copy="Authentic team imagery and stories from the people at TechnovAIte will appear here."
            />
          </div>
        </Container>
      </Section>

      <Section id="opportunities" tone="mist">
        <Container>
          <SectionHeader eyebrow="Open opportunities" title="Current roles" />
          <div className="mt-10" data-reveal>
            {openRoles.length ? (
              <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
                {openRoles.map((r) => (
                  <li key={r.title}>
                    <a href={r.href} className="flex items-center justify-between p-6 hover:bg-mist">
                      <span>
                        <span className="block font-semibold">{r.title}</span>
                        <span className="text-sm text-slate">
                          {r.location} · {r.type}
                        </span>
                      </span>
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-line bg-paper p-10 text-center">
                <p className="text-2xl font-semibold tracking-tight">No open roles right now.</p>
                <p className="mx-auto mt-3 max-w-md text-slate">
                  We’re always glad to hear from people who share our approach. Register your interest below.
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section id="partner-opportunities">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionHeader
              eyebrow="Partner opportunities"
              title="Bring your specialist capability to the ecosystem."
              copy="TechnovAIte works with selected delivery partners across AI, digital delivery, offshore capability, and specialist technology domains. If your organisation delivers in these areas, we’d like to hear from you."
            />
            <div id="interest" className="rounded-3xl border border-line bg-paper p-6 shadow-card sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight">Expression of interest</h3>
              <p className="mt-1 text-sm text-slate">For individuals and partner organisations.</p>
              <div className="mt-6">
                <LeadForm kind="careers" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
