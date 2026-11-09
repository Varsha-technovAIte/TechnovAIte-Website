import type { Metadata } from "next";

export function pageMeta(title: string, description: string, path: string, opts?: { noindex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | TechnovAIte`, description, url: path },
    ...(opts?.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
