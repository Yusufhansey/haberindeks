import type { MetadataRoute } from "next";
import { getAllArticles } from "../src/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://haberindeks.com";
  const articles = getAllArticles();

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/haber/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const categorySlugs = Array.from(
    new Set(articles.map((article) => article.categorySlug))
  );

  const categoryUrls = categorySlugs.map((slug) => ({
    url: `${baseUrl}/kategori/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}