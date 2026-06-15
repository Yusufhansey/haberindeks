import {
  getAllArticles,
  getFeaturedArticle,
} from "../src/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();

  const cards = articles
    .filter((article) => article.slug !== featured.slug)
    .slice(0, 6);

  const mostRead = articles.slice(0, 5);

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
      <div className="news-ticker">
        <span>Günün özeti</span>
        <p>Finans, teknoloji ve gündem başlıklarında kaynaklı kısa haber akışı.</p>
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

      <section className="home-layout">
        <div className="main-column">
          <section className="hero hero-v2">
            <div className="section-label">⚡ Öne çıkan haber</div>

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

            <a className="read-more" href={`/haber/${featured.slug}`}>
              Haberi oku →
            </a>
          </section>

          <section className="section-head">
            <div>
              <h2>Son haberler</h2>
              <p>Kaynaklı, kısa ve sade haber akışı.</p>
            </div>
          </section>

          <section className="card-grid card-grid-v2" aria-label="Son haberler">
            {cards.map((item) => (
              <article className="news-card news-card-v2" key={item.slug}>
                <div className="card-topline">
                  <span className="card-category">{item.category}</span>
                  <span>{item.publishedAt}</span>
                </div>

                <h2>
                  <a href={`/haber/${item.slug}`}>{item.title}</a>
                </h2>

                <p>{item.description}</p>

                <div className="card-meta">
                  {item.source} · {item.readTime}
                </div>
              </article>
            ))}
          </section>
        </div>

        <aside className="sidebar">
          <section className="side-box">
            <h3>Haberindeks farkı</h3>
            <p>
              Haberleri kaynak, kategori ve konu ilişkisine göre sadeleştiren
              yapay zekâ destekli haber akışı.
            </p>

            <div className="trust-list">
              <span>✓ Kaynak odaklı</span>
              <span>✓ Kısa özet</span>
              <span>✓ Temiz arşiv</span>
            </div>
          </section>

          <section className="side-box">
            <h3>Bugün en çok okunanlar</h3>

            <div className="side-news-list">
              {mostRead.map((item, index) => (
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

          <section className="side-box soft-blue">
            <h3>Kategoriler</h3>

            <div className="category-pills">
              {categories.map((category) => (
                <a key={category.slug} href={`/kategori/${category.slug}`}>
                  {category.name}
                </a>
              ))}
            </div>
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