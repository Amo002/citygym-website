import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "@/components/ui/social";
import type { SiteContent } from "@/lib/types";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#classes", label: "Classes" },
  { href: "#trainers", label: "Coaches" },
  { href: "#pricing", label: "Pricing" },
  { href: "#location", label: "Location" },
];

export function Footer({ brand }: { brand: SiteContent["brand"] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt={brand.name} width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="font-display text-2xl">{brand.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-fg-muted">
              {brand.tagline}. {brand.address}. Train hard, live better — join the City GYM movement.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: InstagramIcon, href: brand.instagram },
                { icon: FacebookIcon, href: brand.facebook },
                { icon: WhatsappIcon, href: `https://wa.me/${brand.whatsapp}` },
              ].map((s, i) => (
                <a key={i} href={s.href} className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-brand hover:text-brand">
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-fg-muted">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-fg-muted transition-colors hover:text-brand">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-fg-muted">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
              <li>{brand.phoneMen}</li>
              <li>{brand.phoneWomen}</li>
              <li>{brand.email}</li>
            </ul>
            <a href="/admin" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Admin <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-fg-muted sm:flex-row">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <p>Amman · Jordan</p>
        </div>
      </div>
    </footer>
  );
}
