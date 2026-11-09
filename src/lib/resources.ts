// Published resources. Add entries here only once content and authorship are verified.
export type Article = {
  slug: string;
  section: "insights" | "articles" | "case-studies" | "perspectives" | "guides";
  category: string;
  title: string;
  description: string;
  author: string;
  date: string; // ISO date
  body: string[]; // paragraphs
};

export const articles: Article[] = [];
