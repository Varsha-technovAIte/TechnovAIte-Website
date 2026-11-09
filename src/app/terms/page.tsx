import { PageHero, Prose } from "@/components/blocks";
import { Container, Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("Terms of Use", "Terms governing the use of the TechnovAIte website.", "/terms");

// TODO: replace with TechnovAIte's approved terms of use.
export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" />
      <Section>
        <Container>
          <Prose>
            <p>
              The content on this website is provided for general information about TechnovAIte and its services. It
              does not constitute an offer or professional advice.
            </p>
            <p>
              Technology execution referenced on this website is delivered through selected partner organisations under
              agreed commercial and operating models.
            </p>
            <p>
              Solvrr™ is a trademark of TechnovAIte. Descriptions of Solvrr™ reflect a platform vision and may not
              represent functionality that is currently available.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
