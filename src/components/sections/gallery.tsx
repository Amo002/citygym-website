import Image from "next/image";
import type { SiteContent } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

// Editorial masonry-ish grid with a few feature tiles.
const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "",
  "sm:col-span-2",
  "",
];

export function Gallery({ data }: { data: SiteContent["gallery"] }) {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow={data.eyebrow} heading={data.heading} />
      <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4">
        {data.images.slice(0, 6).map((src, i) => (
          <Reveal i={i % 4} key={src + i} className={`${SPANS[i] ?? ""} group relative overflow-hidden rounded-2xl`}>
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand/0 transition-colors duration-500 group-hover:bg-brand/20" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
