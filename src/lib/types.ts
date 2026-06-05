// Content model for the City GYM site. Stored as a single JSON blob in SQLite
// and fully editable from the admin dashboard.

export interface Stat { value: string; label: string }
export interface Service { icon: string; title: string; desc: string }
export interface ClassItem { name: string; image: string; schedule: string; level: string }
export interface Trainer { name: string; role: string; image: string; instagram: string }
export interface Plan { name: string; price: string; period: string; features: string[]; featured: boolean }
export interface Hour { day: string; time: string }

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    phoneMen: string;
    phoneWomen: string;
    email: string;
    address: string;
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleHighlight: string;
    titleBottom: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
    stats: Stat[];
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    image: string;
    points: string[];
  };
  services: { eyebrow: string; heading: string; items: Service[] };
  classes: { eyebrow: string; heading: string; items: ClassItem[] };
  trainers: { eyebrow: string; heading: string; items: Trainer[] };
  gallery: { eyebrow: string; heading: string; images: string[] };
  pricing: { eyebrow: string; heading: string; plans: Plan[] };
  location: { eyebrow: string; heading: string; address: string; mapEmbed: string; hours: Hour[] };
}

export interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}
