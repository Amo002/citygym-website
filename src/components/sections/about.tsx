import Image from "next/image";
import { Check } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About({ data, yearsLabel }: { data: SiteContent["about"]; yearsLabel: string }) {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image src={data.image} alt="Inside City GYM" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-border bg-brand px-7 py-5 text-brand-ink shadow-xl sm:block">
            <div className="font-display text-4xl">10+</div>
            <div className="text-sm font-medium">{yearsLabel}</div>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} />
          <Reveal i={2}>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{data.body}</p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {data.points.map((p, i) => (
              <Reveal as="li" i={i} key={p} className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-sm font-medium">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
