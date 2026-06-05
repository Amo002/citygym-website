import { getContent } from "@/lib/content";
import { Navbar } from "@/components/site/navbar";
import { Marquee } from "@/components/site/marquee";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Classes } from "@/components/sections/classes";
import { Trainers } from "@/components/sections/trainers";
import { Gallery } from "@/components/sections/gallery";
import { Pricing } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/contact";
import { Location } from "@/components/sections/location";

export const dynamic = "force-dynamic";

export default function Home() {
  const c = getContent();
  return (
    <>
      <Navbar brand={c.brand.name} />
      <main>
        <Hero data={c.hero} />
        <Marquee text={`${c.brand.name} — ${c.brand.tagline}`} />
        <About data={c.about} />
        <Services data={c.services} />
        <Classes data={c.classes} />
        <Marquee text="No Excuses · Just Results" reverse />
        <Trainers data={c.trainers} />
        <Gallery data={c.gallery} />
        <Pricing data={c.pricing} />
        <Contact brand={c.brand} />
        <Location data={c.location} />
      </main>
      <Footer brand={c.brand} />
    </>
  );
}
