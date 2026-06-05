"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import type { UIStrings } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Contact({ brand, t }: { brand: SiteContent["brand"]; t: UIStrings["contact"] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const contactRows = [
    { icon: Phone, label: t.men, value: brand.phoneMen, href: `tel:${brand.phoneMen}` },
    { icon: Phone, label: t.women, value: brand.phoneWomen, href: `tel:${brand.phoneWomen}` },
    { icon: Mail, label: t.email, value: brand.email, href: `mailto:${brand.email}` },
    { icon: MapPin, label: t.location, value: brand.address, href: "#location" },
  ];

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={t.eyebrow} heading={t.heading} />
          <Reveal i={2}>
            <p className="mt-6 max-w-md text-lg text-fg-muted">{t.blurb}</p>
          </Reveal>
          <div className="mt-10 space-y-4">
            {contactRows.map((r, i) => (
              <Reveal i={i} key={i}>
                <a href={r.href} className="group flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-bg-elevated text-brand transition-colors group-hover:border-brand">
                    <r.icon size={18} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-fg-muted">{r.label}</span>
                    <span className="block font-medium">{r.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal i={1}>
          <form onSubmit={submit} className="card p-7 sm:p-9">
            {status === "done" ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <CheckCircle2 className="h-14 w-14 text-brand" />
                <h3 className="font-display text-3xl">{t.sent}</h3>
                <p className="text-fg-muted">{t.sentNote}</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:border-brand"
                >
                  {t.another}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="field" placeholder={t.name} required value={form.name} onChange={(e) => set("name", e.target.value)} />
                  <input className="field" placeholder={t.phone} required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
                <input className="field" type="email" placeholder={t.emailPh} required value={form.email} onChange={(e) => set("email", e.target.value)} />
                <textarea className="field min-h-32 resize-none" placeholder={t.message} required value={form.message} onChange={(e) => set("message", e.target.value)} />
                {status === "error" && <p className="text-sm font-medium text-red-500">{t.error}</p>}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 font-semibold text-brand-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} />}
                  {status === "sending" ? t.sending : t.send}
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
