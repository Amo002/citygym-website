import type { Metadata } from "next";
import { Anton, Sora, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getLang, dir } from "@/lib/i18n";
import { getContent } from "@/lib/content";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], weight: ["400", "600", "700", "900"] });

// Title + description are built from the editable Brand fields (admin → Brand).
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const c = getContent(lang);
  const title = `${c.brand.name} — ${c.brand.tagline} · ${c.brand.address}`;
  const description = c.hero.subtitle;
  return {
    title,
    description,
    openGraph: { title: `${c.brand.name} — ${c.brand.tagline}`, description, type: "website" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLang();
  return (
    <html
      lang={lang}
      dir={dir(lang)}
      suppressHydrationWarning
      className={`${anton.variable} ${sora.variable} ${cairo.variable}`}
    >
      <body className="grain min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
