import Image from "next/image";
import { InstagramIcon } from "@/components/ui/social";
import type { SiteContent } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Trainers({ data }: { data: SiteContent["trainers"] }) {
  return (
    <section id="trainers" className="border-y border-border bg-bg-sunken">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} align="center" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((t, i) => (
            <Reveal i={i} key={t.name}>
              <div className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <a
                    href={t.instagram}
                    className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-3 place-items-center rounded-full bg-brand text-brand-ink opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    aria-label={`${t.name} Instagram`}
                  >
                    <InstagramIcon size={17} />
                  </a>
                </div>
                <h3 className="font-display mt-4 text-xl">{t.name}</h3>
                <p className="text-sm text-brand">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
