import { CtaBanner, PageHero } from "@/components/blocks";
import { ProcessSteps } from "@/components/ProcessSteps";
import { processSteps } from "@/lib/site";
import { Container, Section, SectionHeader } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "How We Work",
  "The TechnovAIte engagement process: understand, structure, connect, and coordinate — from business need to the right capability model.",
  "/company/how-we-work",
);

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="From business need to the right capability model."
        copy="A clear, four-stage engagement process designed to reduce complexity and bring structure to how technology capabilities are accessed and coordinated."
        crumbs={[{ label: "Company", href: "/company/about" }, { label: "How We Work", href: "/company/how-we-work" }]}
      />
      <Section>
        <Container>
          <ProcessSteps />
        </Container>
      </Section>
      <Section tone="mist">
        <Container>
          <SectionHeader eyebrow="Roles and responsibilities" title="Clear about who does what." />
          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-paper" data-reveal>
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Responsibilities by stage</caption>
              <thead className="bg-mist text-[12px] uppercase tracking-[0.12em] text-slate">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Stage</th>
                  <th scope="col" className="px-6 py-4 font-semibold">TechnovAIte</th>
                  <th scope="col" className="hidden px-6 py-4 font-semibold md:table-cell">Delivery partners</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {processSteps.map((s, i) => (
                  <tr key={s.title}>
                    <th scope="row" className="px-6 py-5 font-semibold">
                      0{i + 1} {s.title}
                    </th>
                    <td className="px-6 py-5 text-slate">{s.copy}</td>
                    <td className="hidden px-6 py-5 text-slate md:table-cell">
                      {i < 2 ? "Input where relevant" : "Execution under agreed commercial and operating models"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
