import { Eyebrow, Container } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Contact",
  "Talk to TechnovAIte about accessing the right technology capabilities, delivery models, and specialist partners.",
  "/contact",
);

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ need?: string }> }) {
  const { need } = await searchParams;
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_65%)]" />
      <Container className="relative grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h1 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl">
            Start with a conversation.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
            No pitch decks. No pressure. Just an honest conversation about what you need and whether this model fits.
          </p>
          <dl className="mt-12 space-y-6 border-t border-line pt-8">
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate">Email</dt>
              <dd className="mt-1 text-lg font-medium">
                <a href={`mailto:${site.contact.email}`} className="hover:text-brand-strong">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate">Phone</dt>
              <dd className="mt-1 text-lg font-medium">
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-brand-strong">
                  {site.contact.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-3xl border border-line bg-paper p-6 shadow-lift sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight">Tell us about your initiative</h2>
          <p className="mt-1 text-sm text-slate">A few details help us prepare for a useful first conversation.</p>
          <div className="mt-8">
            <LeadForm kind="contact" defaultNeed={need} />
          </div>
        </div>
      </Container>
    </section>
  );
}
