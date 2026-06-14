import articles from "../../data/articles.json";

export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  categorySlug: string;
  source: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
};

export function getAllArticles(): Article[] {
  return articles as Article[];
}

export function getFeaturedArticle(): Article {
  const allArticles = getAllArticles();
  return allArticles.find((article) => article.featured) ?? allArticles[0];
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter(
    (article) => article.categorySlug === categorySlug
  );
}