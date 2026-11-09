import { Arrow, Button, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-0.03em]">This page isn’t connected yet.</h1>
      <p className="mt-4 text-lg text-slate">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">
          Back to home <Arrow />
        </Button>
        <Button href="/contact" variant="secondary">
          Let&apos;s Talk
        </Button>
      </div>
    </Container>
  );
}
