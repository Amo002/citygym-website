import type { Metadata } from "next";
import { Anton, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "City GYM — More Than Fitness · Amman, Jordan",
  description:
    "City GYM in Amman, Jordan — state-of-the-art equipment, expert coaches, group classes, and a barista café. More than fitness. Join the movement.",
  keywords: ["gym", "fitness", "Amman", "Jordan", "City GYM", "personal training", "classes"],
  openGraph: {
    title: "City GYM — More Than Fitness",
    description: "Amman's premier fitness destination. Train hard. Live better.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${sora.variable}`}>
      <body className="grain min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
