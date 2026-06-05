import type { Metadata } from "next";
import { Anton, Sora, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getLang, dir } from "@/lib/i18n";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], weight: ["400", "600", "700", "900"] });

export const metadata: Metadata = {
  title: "City GYM — More Than Fitness · Amman, Jordan",
  description:
    "City GYM in Amman, Jordan — state-of-the-art equipment, expert coaches, group classes, and a barista café. More than fitness. Join the movement.",
  keywords: ["gym", "fitness", "Amman", "Jordan", "City GYM", "نادي رياضي", "personal training", "classes"],
  openGraph: {
    title: "City GYM — More Than Fitness",
    description: "Amman's premier fitness destination. Train hard. Live better.",
    type: "website",
  },
};

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
