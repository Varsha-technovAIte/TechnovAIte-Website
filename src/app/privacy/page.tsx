import { PageHero, Prose } from "@/components/blocks";
import { Container, Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

export const metadata = pageMeta("Privacy Policy", "How TechnovAIte collects, uses, and protects personal information.", "/privacy");

// TODO: replace with TechnovAIte's approved privacy policy text.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <Container>
          <Prose>
            <p>
              TechnovAIte respects your privacy. Information you submit through this website — such as your name, work
              email, company, and enquiry details — is used only to respond to your enquiry and to communicate with you
              about TechnovAIte’s services.
            </p>
            <p>We do not sell your personal information.</p>
            <p>
              To request access to, correction of, or deletion of your information, contact{" "}
              <a href={`mailto:${site.contact.email}`} className="text-ink underline underline-offset-2">
                {site.contact.email}
              </a>
              .
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
