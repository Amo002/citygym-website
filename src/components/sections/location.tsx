import { Clock, MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Location({ data, addressLabel, hoursLabel }: { data: SiteContent["location"]; addressLabel: string; hoursLabel: string }) {
  return (
    <section id="location" className="border-t border-border bg-bg-sunken">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {data.places.map((place, idx) => (
            <Reveal i={idx} key={idx} className="overflow-hidden rounded-3xl border border-border bg-bg-elevated">
              {/* Map */}
              <div className="relative aspect-[16/10] border-b border-border">
                <iframe
                  src={place.mapEmbed}
                  className="h-full w-full grayscale-[0.3]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={place.label}
                />
                <span className="absolute left-4 top-4 rounded-full bg-brand px-4 py-1.5 text-sm font-bold text-brand-ink shadow-lg">
                  {place.label}
                </span>
              </div>
              {/* Details */}
              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-brand" size={18} />
                    <h4 className="font-display text-xl">{addressLabel}</h4>
                  </div>
                  <p className="mt-2 text-sm text-fg-muted">{place.address}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-brand" size={18} />
                    <h4 className="font-display text-xl">{hoursLabel}</h4>
                  </div>
                  <ul className="mt-2 divide-y divide-border">
                    {place.hours.map((h, hi) => (
                      <li key={hi} className="flex items-center justify-between py-1.5 text-xs">
                        <span className="font-medium">{h.day}</span>
                        <span className="text-fg-muted">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
