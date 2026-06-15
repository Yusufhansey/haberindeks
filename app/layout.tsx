import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://haberindeks.com"),
  title: {
    default: "Haberindeks | Kaynağından, net ve sade haber akışı",
    template: "%s | Haberindeks",
  },
  description:
    "Haberindeks; finans, teknoloji, gündem ve eğitim başlıklarında kaynaklı, kısa ve sade haber akışı sunar.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Haberindeks",
    description:
      "Kaynağından, net ve sade haber akışı. Finans, teknoloji, gündem ve eğitim haberleri.",
    url: "https://haberindeks.com",
    siteName: "Haberindeks",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haberindeks",
    description:
      "Kaynağından, net ve sade haber akışı. Finans, teknoloji, gündem ve eğitim haberleri.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}