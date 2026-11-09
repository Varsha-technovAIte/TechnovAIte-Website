import type { MetadataRoute } from "next";
import { articles } from "@/lib/resources";
import { capabilities, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/company/about",
    "/company/approach",
    "/company/how-we-work",
    "/company/partners",
    "/company/leadership",
    "/contact",
    "/capabilities",
    ...capabilities.map((c) => `/capabilities/${c.slug}`),
    "/resources",
    ...articles.map((a) => `/resources/${a.section}/${a.slug}`),
    "/solvrr",
    "/careers",
    "/privacy",
    "/terms",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
