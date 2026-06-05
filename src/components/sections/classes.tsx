import Image from "next/image";
import { Clock } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Classes({ data }: { data: SiteContent["classes"] }) {
  return (
    <section id="classes" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow={data.eyebrow} heading={data.heading} />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((c, i) => (
          <Reveal i={i} key={c.name}>
            <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-ink">
                {c.level}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display text-2xl">{c.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                  <Clock size={13} /> {c.schedule}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
