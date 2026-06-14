import { notFound } from "next/navigation";
import { getAllArticles, getArticlesByCategory } from "../../../src/lib/articles";

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
      title: "Kategori bulunamadı | Haberindeks",
    };
  }

  return {
    title: `${categoryName} Haberleri | Haberindeks`,
    description: `${categoryName} kategorisindeki son haberler, kısa özetler ve kaynaklı gelişmeler.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const articles = getArticlesByCategory(slug);

  if (articles.length === 0) {
    notFound();
  }

  const categoryName = articles[0].category;

  return (
    <main className="site-shell">
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

      <section className="category-page">
        <a className="back-link" href="/">
          ← Ana sayfa
        </a>

        <div className="section-label">Kategori</div>

        <h1>{categoryName} Haberleri</h1>

        <p>
          {categoryName} kategorisindeki son gelişmeler, kısa özetler ve kaynaklı
          haber akışı.
        </p>

        <div className="category-list">
          {articles.map((article) => (
            <article className="category-list-item" key={article.slug}>
              <div className="card-category">{article.category}</div>

              <h2>
                <a href={`/haber/${article.slug}`}>{article.title}</a>
              </h2>

              <p>{article.description}</p>

              <div className="card-meta">
                {article.source} · {article.publishedAt} · {article.readTime}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>haberindeks.com · Kaynağından, net ve sade</span>
        <span className="verified">✓ Kaynak doğrulandı</span>
      </footer>
    </main>
  );
}