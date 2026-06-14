const featured = {
  category: "ÖNE ÇIKAN",
  title: "TCMB faizi sabit tuttu — kredi çekecekler için ne değişti?",
  description:
    "Merkez Bankası politika faizini %45’te sabit bıraktı. Bu karar konut kredisi, taşıt kredisi ve ihtiyaç kredisi faizlerini nasıl etkiliyor? Uzmanlar ne diyor?",
  source: "TCMB",
  readTime: "3 dk okuma",
  publishedAt: "2 saat önce",
};

const cards = [
  {
    category: "Teknoloji",
    title: "OpenAI yeni modelini duyurdu — Türkiye’deki kullanıcılar ne zaman erişebilir?",
    publishedAt: "1 saat önce",
    readTime: "2 dk",
  },
  {
    category: "Finans",
    title: "Dolar/TL bu hafta nereye gider? Analistlerin beklentileri",
    publishedAt: "4 saat önce",
    readTime: "3 dk",
  },
  {
    category: "Gündem",
    title: "MEB 2025-2026 sınav takvimi açıklandı — tüm tarihler burada",
    publishedAt: "6 saat önce",
    readTime: "4 dk",
  },
  {
    category: "Finans",
    title: "SPK yeni kripto para düzenlemesini Resmi Gazete’de yayımladı",
    publishedAt: "8 saat önce",
    readTime: "2 dk",
  },
];

const mostRead = [
  {
    title: "YKS başvuru tarihleri 2025 — adım adım nasıl yapılır?",
    source: "ÖSYM",
    publishedAt: "12 saat önce",
  },
  {
    title: "Asgari ücret 2025 zammı ne kadar olacak? Hesaplama tablosu",
    source: "Çalışma Bakanlığı",
    publishedAt: "1 gün önce",
  },
  {
    title: "WhatsApp yeni gizlilik politikası — kabul etmezseniz ne olur?",
    source: "Meta",
    publishedAt: "2 gün önce",
  },
];

const filters = [
  "Tümü",
  "Merkez Bankası",
  "Yapay Zeka",
  "Vergi & Mevzuat",
  "Borsa",
  "MEB & Eğitim",
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="logo">haberindeks</div>

        <nav className="nav">
          <a href="#">Anasayfa</a>
          <a href="#">Finans</a>
          <a href="#">Teknoloji</a>
          <a href="#">Gündem</a>
        </nav>
      </header>

      <section className="filters" aria-label="Haber kategorileri">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={index === 0 ? "filter active" : "filter"}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="hero">
        <div className="section-label">⚡ {featured.category}</div>

        <h1>{featured.title}</h1>

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
          <article className="news-card" key={item.title}>
            <div className="card-category">{item.category}</div>
            <h2>{item.title}</h2>
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
            <article className="most-read-item" key={item.title}>
              <div className="rank">{String(index + 1).padStart(2, "0")}</div>

              <div>
                <h4>{item.title}</h4>
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