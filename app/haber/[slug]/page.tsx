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

  const relatedArticles = getAllArticles()
    .filter(
      (item) =>
        item.slug !== article.slug && item.categorySlug === article.categorySlug
    )
    .slice(0, 3);

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

      <div className="news-ticker">
        <span>Haber detayı</span>
        <p>Kaynaklı, kısa ve sade haber akışı.</p>
      </div>

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

      <section className="article-layout">
        <article className="article-main">
          <a className="back-link" href="/">
            ← Ana sayfa
          </a>

          <div className="article-kicker">{article.category}</div>

          <h1>{article.title}</h1>

          <p className="article-lead">{article.description}</p>

          <div className="article-meta-row">
            <span className="source">{article.source}</span>
            <span>·</span>
            <span>{article.readTime}</span>
            <span>·</span>
            <time dateTime={article.publishedAtISO}>{article.publishedAt}</time>
          </div> 
		  <div className={`article-visual visual-${article.categorySlug}`}>
          <div>
          <span>{article.category}</span>
          <strong>{article.source}</strong>
          <p>Kaynaklı kısa haber</p>
          </div>
          </div>


          <div className="article-summary-box">
            <strong>Kısa özet</strong>
            <p>{article.description}</p>
          </div>

          <div className="article-body article-body-v2">
            {article.content.split("\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
		 <section className="why-box">
  <h2>Bu haber neden önemli?</h2>
  <p>
    Bu gelişme, {article.category.toLowerCase()} başlığında karar alıcıları,
    kullanıcıları ve piyasayı etkileyebilecek sonuçlar doğurabilir.
    Haberindeks bu içeriği kısa özet, kaynak bilgisi ve sade anlatımla
    okuyucuya sunar.
  </p>
</section>

<section className="article-bottom">
  <div className="section-head article-bottom-head">
    <div>
      <h2>İlgili haberler</h2>
      <p>Aynı kategorideki diğer gelişmeler.</p>
    </div>
  </div>

  <div className="related-grid">
    {relatedArticles.map((item) => (
      <article className="related-card" key={item.slug}>
        <div className="card-category">{item.category}</div>

        <h3>
          <a href={`/haber/${item.slug}`}>{item.title}</a>
        </h3>

        <p>{item.description}</p>

        <div className="card-meta">
          {item.source} · {item.publishedAt} · {item.readTime}
        </div>
      </article>
    ))}
  </div>
</section>
        </article>

        <aside className="article-sidebar">
          <section className="side-box">
            <h3>Haber bilgisi</h3>

            <div className="info-list">
              <div>
                <span>Kategori</span>
                <strong>{article.category}</strong>
              </div>

              <div>
                <span>Kaynak</span>
                <strong>{article.source}</strong>
              </div>

              <div>
                <span>Okuma süresi</span>
                <strong>{article.readTime}</strong>
              </div>

              <div>
                <span>Durum</span>
                <strong>Kaynak doğrulandı</strong>
              </div>
            </div>
          </section>

          <section className="side-box soft-blue">
            <h3>Haberindeks notu</h3>
            <p>
              Bu içerik kaynak bilgisi, kategori ilişkisi ve kısa özet yapısıyla
              sadeleştirilmiş haber formatında hazırlanmıştır.
            </p>
          </section>

          {relatedArticles.length > 0 && (
            <section className="side-box">
              <h3>İlgili haberler</h3>

              <div className="side-news-list">
                {relatedArticles.map((item, index) => (
                  <a
                    className="side-news-item"
                    href={`/haber/${item.slug}`}
                    key={item.slug}
                  >
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </aside>
      </section>

      <footer className="footer">
        <span>haberindeks.com · Kaynağından, net ve sade</span>
        <span className="verified">✓ Kaynak doğrulandı</span>
      </footer>
    </main>
  );
}