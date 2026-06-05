"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LangSwitch } from "./lang-switch";
import type { Lang } from "@/lib/types";
import type { UIStrings } from "@/lib/i18n";

export function Navbar({ brand, lang, t }: { brand: string; lang: Lang; t: UIStrings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#classes", label: t.nav.classes },
    { href: "#trainers", label: t.nav.trainers },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt={brand} width={38} height={38} className="h-9 w-9 object-contain" priority />
          <span className="font-display text-xl tracking-wide">{brand}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-fg-muted transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <LangSwitch lang={lang} />
          <ThemeToggle />
          <a
            href="#pricing"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-ink transition-transform hover:scale-105 sm:inline-block"
          >
            {t.joinNow}
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-5 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-base font-medium text-fg-muted hover:text-fg">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
