import { Clock, MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Location({ data }: { data: SiteContent["location"] }) {
  return (
    <section id="location" className="border-t border-border bg-bg-sunken">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border lg:aspect-auto">
            <iframe
              src={data.mapEmbed}
              className="h-full w-full grayscale-[0.3]"
              style={{ border: 0, minHeight: 360 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="City GYM location"
            />
          </Reveal>

          <Reveal i={1} className="flex flex-col gap-6">
            <div className="card p-7">
              <div className="flex items-center gap-3">
                <MapPin className="text-brand" size={20} />
                <h3 className="font-display text-2xl">Address</h3>
              </div>
              <p className="mt-3 text-fg-muted">{data.address}</p>
            </div>
            <div className="card flex-1 p-7">
              <div className="flex items-center gap-3">
                <Clock className="text-brand" size={20} />
                <h3 className="font-display text-2xl">Opening Hours</h3>
              </div>
              <ul className="mt-4 divide-y divide-border">
                {data.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-medium">{h.day}</span>
                    <span className="text-fg-muted">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
