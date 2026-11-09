import Image from "next/image";
import { CtaBanner, PageHero } from "@/components/blocks";
import { ComingSoon, Container, Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

export const metadata = pageMeta("Leadership", "Meet the leadership team at TechnovAIte.", "/company/leadership");

// Only verified leadership profiles are listed. Add biographies once approved.
const leaders = [
  {
    name: "Adarsh Ananthaswamy",
    title: "Chief Business and Growth Officer",
    photo: "/images/adarsh-ananthaswamy.jpg",
    email: site.contact.email,
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The people behind TechnovAIte."
        crumbs={[{ label: "Company", href: "/company/about" }, { label: "Leadership", href: "/company/leadership" }]}
      />
      <Section>
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l) => (
              <li key={l.name} data-reveal className="rounded-3xl border border-line bg-paper p-3 shadow-card">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-navy-deep">
                  <Image
                    src={l.photo}
                    alt={`Portrait of ${l.name}`}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="scale-[1.06] object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold tracking-tight">{l.name}</h2>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.1em] text-brand-strong">{l.title}</p>
                  <a href={`mailto:${l.email}`} className="mt-4 inline-block text-sm text-slate hover:text-ink">
                    {l.email}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <ComingSoon
              title="More leadership profiles"
              copy="Further leadership biographies will be published here once verified."
            />
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
