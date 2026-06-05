import { Check, Star } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import type { UIStrings } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Pricing({ data, t }: { data: SiteContent["pricing"]; t: UIStrings }) {
  return (
    <section id="pricing" className="border-y border-border bg-bg-sunken">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} align="center" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {data.plans.map((p, i) => (
            <Reveal i={i} key={i}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                  p.featured
                    ? "border-brand bg-brand text-brand-ink shadow-2xl shadow-brand/20 lg:-translate-y-4"
                    : "border-border bg-bg-elevated"
                }`}
              >
                {p.featured && (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-brand-ink/15 px-3 py-1 text-xs font-bold">
                    <Star size={12} className="fill-current" /> {t.popular}
                  </span>
                )}
                <h3 className="font-display text-2xl">{p.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-display text-6xl">{p.price}</span>
                  <span className={`mb-2 text-sm ${p.featured ? "text-brand-ink/70" : "text-fg-muted"}`}>
                    {p.period}
                  </span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-sm">
                      <Check size={16} strokeWidth={3} className={p.featured ? "text-brand-ink" : "text-brand"} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 rounded-full py-3 text-center font-semibold transition-transform hover:scale-[1.03] ${
                    p.featured ? "bg-brand-ink text-brand" : "bg-brand text-brand-ink"
                  }`}
                >
                  {t.getStarted}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
