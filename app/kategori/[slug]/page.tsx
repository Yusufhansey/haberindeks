import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticlesByCategory,
} from "../../../src/lib/articles";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const categories = Array.from(
    new Set(getAllArticles().map((article) => article.categorySlug))
  );

  return categories.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const articles = getArticlesByCategory(slug);
  const categoryName = articles[0]?.category;

  if (!categoryName) {
    return {
      title: "Kategori bulunamadı",
    };
  }

  const categoryUrl = `https://haberindeks.com/kategori/${slug}`;
  const description = `${categoryName} kategorisindeki son haberler, kısa özetler ve kaynaklı gelişmeler.`;

  return {
    title: `${categoryName} Haberleri`,
    description,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${categoryName} Haberleri | Haberindeks`,
      description,
      url: categoryUrl,
      siteName: "Haberindeks",
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Haberleri | Haberindeks`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const articles = getArticlesByCategory(slug);

  if (articles.length === 0) {
    notFound();
  }

  const categoryName = articles[0].category;
  const allArticles = getAllArticles();
  const otherCategories = Array.from(
    new Map(
      allArticles.map((article) => [
        article.categorySlug,
        {
          name: article.category,
          slug: article.categorySlug,
        },
      ])
    ).values()
  );

  return (
    <main className="site-shell">
      <div className="news-ticker">
        <span>Kategori</span>
        <p>{categoryName} başlığındaki kaynaklı ve sade haber akışı.</p>
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

      <section className="category-hero">
        <a className="back-link" href="/">
          ← Ana sayfa
        </a>

        <div className="article-kicker">{categoryName}</div>

        <h1>{categoryName} Haberleri</h1>

        <p>
          {categoryName} kategorisindeki son gelişmeler, kısa özetler ve kaynaklı
          haber akışı.
        </p>

        <div className="category-stats">
          <div>
            <strong>{articles.length}</strong>
            <span>haber</span>
          </div>

          <div>
            <strong>Güncel</strong>
            <span>akış</span>
          </div>

          <div>
            <strong>Kaynaklı</strong>
            <span>içerik</span>
          </div>
        </div>
      </section>

      <section className="category-layout-v2">
        <div className="category-main-list">
          <div className="section-head category-section-head">
            <div>
              <h2>Son {categoryName} haberleri</h2>
              <p>Bu kategorideki tüm içerikler.</p>
            </div>
          </div>

          <div className="category-feed">
            {articles.map((article) => (
              <article className="category-feed-item" key={article.slug}>
                <div className="card-topline">
                  <span className="card-category">{article.category}</span>
                  <span>{article.publishedAt}</span>
                </div>

                <h2>
                  <a href={`/haber/${article.slug}`}>{article.title}</a>
                </h2>

                <p>{article.description}</p>

                <div className="card-meta">
                  {article.source} · {article.readTime}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="sidebar">
          <section className="side-box">
            <h3>Kategori bilgisi</h3>

            <div className="info-list">
              <div>
                <span>Kategori</span>
                <strong>{categoryName}</strong>
              </div>

              <div>
                <span>İçerik sayısı</span>
                <strong>{articles.length} haber</strong>
              </div>

              <div>
                <span>Format</span>
                <strong>Kısa özet + kaynak</strong>
              </div>
            </div>
          </section>

          <section className="side-box soft-blue">
            <h3>Diğer kategoriler</h3>

            <div className="category-pills">
              {otherCategories.map((category) => (
                <a key={category.slug} href={`/kategori/${category.slug}`}>
                  {category.name}
                </a>
              ))}
            </div>
          </section>

          <section className="side-box">
            <h3>Haberindeks notu</h3>
            <p>
              Kategori sayfaları ileride konu, kurum ve kaynak ilişkilerine göre
              daha güçlü arşiv sayfalarına dönüşecek.
            </p>
          </section>
        </aside>
      </section>

      <footer className="footer">
        <span>haberindeks.com · Kaynağından, net ve sade</span>
        <span className="verified">✓ Kaynak doğrulandı</span>
      </footer>
    </main>
  );
}