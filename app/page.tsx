import {
  getAllArticles,
  getFeaturedArticle,
} from "../src/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();

  const cards = articles
    .filter((article) => article.slug !== featured.slug)
    .slice(0, 4);

  const mostRead = articles.slice(0, 3);

  const categories = Array.from(
    new Map(
      articles.map((article) => [
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

      <section className="filters" aria-label="Haber kategorileri">
        <a className="filter active" href="/">
          Tümü
        </a>

        {categories.map((category) => (
          <a
            key={category.slug}
            className="filter"
            href={`/kategori/${category.slug}`}
          >
            {category.name}
          </a>
        ))}
      </section>

      <section className="hero">
        <div className="section-label">⚡ ÖNE ÇIKAN</div>

        <h1>
          <a href={`/haber/${featured.slug}`}>{featured.title}</a>
        </h1>

        <p>{featured.description}</p>

        <div className="meta">
          <span className="source">{featured.source}</span>
          <span>·</span>
          <span>{featured.readTime}</span>
          <span>·</span>
          <span>{featured.publishedAt}</span>
        </div>
      </section>

      <section className="card-grid" aria-label="Son haberler">
        {cards.map((item) => (
          <article className="news-card" key={item.slug}>
            <div className="card-category">{item.category}</div>

            <h2>
              <a href={`/haber/${item.slug}`}>{item.title}</a>
            </h2>

            <div className="card-meta">
              {item.publishedAt} · {item.readTime}
            </div>
          </article>
        ))}
      </section>

      <section className="most-read">
        <h3>Bugün en çok okunanlar</h3>

        <div className="most-read-list">
          {mostRead.map((item, index) => (
            <article className="most-read-item" key={item.slug}>
              <div className="rank">{String(index + 1).padStart(2, "0")}</div>

              <div>
                <h4>
                  <a href={`/haber/${item.slug}`}>{item.title}</a>
                </h4>
                <p>
                  {item.source} · {item.publishedAt}
                </p>
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