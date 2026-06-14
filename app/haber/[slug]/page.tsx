import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "../../../src/lib/articles";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Haber bulunamadı | Haberindeks",
    };
  }

  return {
    title: `${article.title} | Haberindeks`,
    description: article.description,
    alternates: {
      canonical: `https://haberindeks.com/haber/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://haberindeks.com/haber/${article.slug}`,
      siteName: "Haberindeks",
      locale: "tr_TR",
      type: "article",
      publishedTime: article.publishedAtISO,
      modifiedTime: article.updatedAtISO,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `https://haberindeks.com/haber/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAtISO,
    dateModified: article.updatedAtISO,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      name: "Haberindeks",
      url: "https://haberindeks.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Haberindeks",
      url: "https://haberindeks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://haberindeks.com/logo.png",
      },
    },
    articleSection: article.category,
    inLanguage: "tr-TR",
  };

  return (
    <main className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <header className="topbar">
        <a href="/" className="logo">
          haberindeks
        </a>

        <nav className="nav">
          <a href="/">Anasayfa</a>
          <a href="/kategori/finans">Finans</a>
          <a href="/kategori/teknoloji">Teknoloji</a>
          <a href="/kategori/gundem">Gündem</a>
        </nav>
      </header>

      <article className="article-detail">
        <a className="back-link" href="/">
          ← Ana sayfa
        </a>

        <div className="article-category">{article.category}</div>

        <h1>{article.title}</h1>

        <p className="article-description">{article.description}</p>

        <div className="meta">
          <span className="source">{article.source}</span>
          <span>·</span>
          <span>{article.readTime}</span>
          <span>·</span>
          <time dateTime={article.publishedAtISO}>{article.publishedAt}</time>
        </div>

        <div className="article-body">
          {article.content.split("\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <footer className="footer">
        <span>haberindeks.com · Kaynağından, net ve sade</span>
        <span className="verified">✓ Kaynak doğrulandı</span>
      </footer>
    </main>
  );
}