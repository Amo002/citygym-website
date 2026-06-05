// Content model for the City GYM site.
//
// Two shapes:
//  - RawSiteContent: stored in SQLite + edited in the admin. Translatable text
//    fields are `Localized` ({ en, ar }); images/urls/numbers stay plain.
//  - SiteContent: what the public site renders — every Localized field has been
//    resolved to a single string for the active language. Same structure, so the
//    section components need no per-language logic.

export type Lang = "en" | "ar";
export interface Localized { en: string; ar: string }

/* ───────────────── Resolved (public render) ───────────────── */
export interface Stat { value: string; label: string }
export interface Service { icon: string; title: string; desc: string }
export interface ClassItem { name: string; image: string; schedule: string; level: string }
export interface Trainer { name: string; role: string; image: string; instagram: string }
export interface Plan { name: string; price: string; period: string; features: string[]; featured: boolean }
export interface Hour { day: string; time: string }

export interface SiteContent {
  brand: {
    name: string; tagline: string;
    phoneMen: string; phoneWomen: string; email: string; address: string;
    instagram: string; facebook: string; whatsapp: string;
  };
  hero: {
    eyebrow: string; titleTop: string; titleHighlight: string; titleBottom: string;
    subtitle: string; ctaPrimary: string; ctaSecondary: string; image: string; stats: Stat[];
  };
  about: { eyebrow: string; heading: string; body: string; image: string; points: string[] };
  services: { eyebrow: string; heading: string; items: Service[] };
  classes: { eyebrow: string; heading: string; items: ClassItem[] };
  trainers: { eyebrow: string; heading: string; items: Trainer[] };
  gallery: { eyebrow: string; heading: string; images: string[] };
  pricing: { eyebrow: string; heading: string; plans: Plan[] };
  location: { eyebrow: string; heading: string; address: string; mapEmbed: string; hours: Hour[] };
}

/* ───────────────── Raw (stored + admin) ───────────────── */
export interface RawStat { value: string; label: Localized }
export interface RawService { icon: string; title: Localized; desc: Localized }
export interface RawClassItem { name: Localized; image: string; schedule: Localized; level: Localized }
export interface RawTrainer { name: Localized; role: Localized; image: string; instagram: string }
export interface RawPlan { name: Localized; price: string; period: Localized; features: Localized[]; featured: boolean }
export interface RawHour { day: Localized; time: Localized }

export interface RawSiteContent {
  brand: {
    name: Localized; tagline: Localized;
    phoneMen: string; phoneWomen: string; email: string; address: Localized;
    instagram: string; facebook: string; whatsapp: string;
  };
  hero: {
    eyebrow: Localized; titleTop: Localized; titleHighlight: Localized; titleBottom: Localized;
    subtitle: Localized; ctaPrimary: Localized; ctaSecondary: Localized; image: string; stats: RawStat[];
  };
  about: { eyebrow: Localized; heading: Localized; body: Localized; image: string; points: Localized[] };
  services: { eyebrow: Localized; heading: Localized; items: RawService[] };
  classes: { eyebrow: Localized; heading: Localized; items: RawClassItem[] };
  trainers: { eyebrow: Localized; heading: Localized; items: RawTrainer[] };
  gallery: { eyebrow: Localized; heading: Localized; images: string[] };
  pricing: { eyebrow: Localized; heading: Localized; plans: RawPlan[] };
  location: { eyebrow: Localized; heading: Localized; address: Localized; mapEmbed: string; hours: RawHour[] };
}

export interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}
