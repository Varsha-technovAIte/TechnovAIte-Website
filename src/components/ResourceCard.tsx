import Link from "next/link";
import type { Article } from "@/lib/resources";

export function ResourceCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/resources/${article.section}/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-paper p-3 transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div aria-hidden className="relative h-44 overflow-hidden rounded-xl bg-grid bg-mist">
        <div className="absolute bottom-5 left-5 h-16 w-16 rounded-full bg-navy/90" />
        <div className="absolute bottom-5 left-16 h-16 w-16 rounded-full bg-brand/80 mix-blend-multiply" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-strong">{article.category}</span>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-brand-strong">
          {article.title}
        </h3>
        <p className="mt-2 flex-1 text-[15px] text-slate">{article.description}</p>
        <p className="mt-4 text-sm text-slate">
          {article.author} ·{" "}
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
          </time>
        </p>
      </div>
    </Link>
  );
}
