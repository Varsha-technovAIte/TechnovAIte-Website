import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner, Prose } from "@/components/blocks";
import { Arrow, Container, Eyebrow } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { articles, type Article } from "@/lib/resources";

export const dynamicParams = false;

export function generateStaticParams() {
  // Next requires at least one param for static export of a dynamic route; the
  // unlisted template preview keeps the article layout buildable before launch.
  return [
    ...articles.map((a) => ({ section: a.section, slug: a.slug })),
    { section: "articles", slug: "template-preview" },
  ];
}

const templatePreview: Article = {
  slug: "template-preview",
  section: "articles",
  category: "Template",
  title: "Article template preview",
  description: "This unpublished page shows the layout used for TechnovAIte articles.",
  author: "Author name",
  date: "2026-01-01",
  body: [
    "This is an unpublished template showing how articles will be presented. It is excluded from search engines and the sitemap.",
    "Replace this content with a verified article by adding an entry to src/lib/resources.ts.",
  ],
};

function find(section: string, slug: string) {
  if (section === "articles" && slug === "template-preview") return templatePreview;
  return articles.find((a) => a.section === section && a.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params;
  const a = find(section, slug);
  if (!a) return {};
  return pageMeta(a.title, a.description, `/resources/${section}/${slug}`, { noindex: a === templatePreview });
}

export default async function ArticlePage({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params;
  const a = find(section, slug);
  if (!a) notFound();

  return (
    <>
      <article>
        <header className="border-b border-line">
          <Container className="max-w-3xl py-16 sm:py-24">
            <Link href="/resources" className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-ink">
              <Arrow className="rotate-180" /> Resources
            </Link>
            <div className="mt-8">
              <Eyebrow>{a.category}</Eyebrow>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
              {a.title}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-slate">{a.description}</p>
            <p className="mt-8 text-sm text-slate">
              {a.author} ·{" "}
              <time dateTime={a.date}>
                {new Date(a.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </p>
          </Container>
        </header>
        <Container className="max-w-3xl py-14">
          <div aria-hidden className="mb-12 h-64 rounded-2xl bg-grid bg-mist" />
          <Prose>
            {a.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Prose>
        </Container>
      </article>
      <CtaBanner />
    </>
  );
}
