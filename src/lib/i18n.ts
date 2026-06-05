import { cookies } from "next/headers";
import type { Lang } from "./types";

export const LANG_COOKIE = "lang";

export async function getLang(): Promise<Lang> {
  const v = (await cookies()).get(LANG_COOKIE)?.value;
  return v === "ar" ? "ar" : "en";
}

export const dir = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");

// Static UI strings (everything not part of editable content).
export const UI = {
  en: {
    nav: { about: "About", services: "Services", classes: "Classes", trainers: "Coaches", pricing: "Pricing", contact: "Contact", location: "Location" },
    joinNow: "Join Now",
    viewSite: "View site",
    getStarted: "Get Started",
    popular: "Popular",
    yearsStrong: "Years strong",
    contact: {
      eyebrow: "Get In Touch",
      heading: "Let's start your journey",
      blurb: "Drop us a message or call directly. Our team will help you pick the perfect plan and book your first session.",
      men: "Men's Club", women: "Women's Club", email: "Email", location: "Location",
      name: "Full name", phone: "Phone", emailPh: "Email", message: "Tell us your goals...",
      send: "Send Message", sending: "Sending...", sent: "Message Sent!", sentNote: "We'll be in touch within 24 hours.",
      another: "Send another", error: "Something went wrong. Try again.",
    },
    footer: { explore: "Explore", contact: "Contact", admin: "Admin", rights: "All rights reserved." },
    address: "Address", hours: "Opening Hours",
  },
  ar: {
    nav: { about: "من نحن", services: "الخدمات", classes: "الحصص", trainers: "المدرّبون", pricing: "الأسعار", contact: "تواصل", location: "الموقع" },
    joinNow: "اشترك الآن",
    viewSite: "عرض الموقع",
    getStarted: "ابدأ الآن",
    popular: "الأكثر طلباً",
    yearsStrong: "سنوات من العطاء",
    contact: {
      eyebrow: "تواصل معنا",
      heading: "لنبدأ رحلتك",
      blurb: "أرسل لنا رسالة أو اتصل مباشرة. سيساعدك فريقنا في اختيار الباقة المناسبة وحجز أول حصة.",
      men: "نادي الرجال", women: "نادي السيدات", email: "البريد", location: "الموقع",
      name: "الاسم الكامل", phone: "الهاتف", emailPh: "البريد الإلكتروني", message: "أخبرنا عن أهدافك...",
      send: "إرسال الرسالة", sending: "جارٍ الإرسال...", sent: "تم الإرسال!", sentNote: "سنتواصل معك خلال ٢٤ ساعة.",
      another: "إرسال رسالة أخرى", error: "حدث خطأ. حاول مجدداً.",
    },
    footer: { explore: "استكشف", contact: "تواصل", admin: "الإدارة", rights: "جميع الحقوق محفوظة." },
    address: "العنوان", hours: "ساعات العمل",
  },
} as const;

// Widen the literal types from `as const` to plain strings so EN and AR share one type.
type DeepString<T> = { [K in keyof T]: T[K] extends string ? string : DeepString<T[K]> };
export type UIStrings = DeepString<(typeof UI)["en"]>;
