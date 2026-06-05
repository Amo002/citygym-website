import type { SiteContent } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

export function Services({ data }: { data: SiteContent["services"] }) {
  return (
    <section id="services" className="border-y border-border bg-bg-sunken">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} align="center" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((s, i) => (
            <Reveal i={i % 3} key={s.title}>
              <div className="group h-full bg-bg-elevated p-8 transition-colors hover:bg-brand">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand transition-colors group-hover:bg-brand-ink/15 group-hover:text-brand-ink">
                  <Icon name={s.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display mt-5 text-2xl transition-colors group-hover:text-brand-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted transition-colors group-hover:text-brand-ink/80">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
