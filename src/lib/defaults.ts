import type { SiteContent } from "./types";

// Stock imagery from Unsplash (stable IDs). Swap any of these from the admin panel.
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_CONTENT: SiteContent = {
  brand: {
    name: "City GYM",
    tagline: "More Than Fitness",
    phoneMen: "0797207187",
    phoneWomen: "0797207189",
    email: "info@citygym.jo",
    address: "Amman, Jordan",
    instagram: "https://instagram.com/citygym",
    facebook: "https://facebook.com/citygym",
    whatsapp: "962797207187",
  },
  hero: {
    eyebrow: "Amman · Jordan",
    titleTop: "Train Hard",
    titleHighlight: "Live",
    titleBottom: "Better",
    subtitle:
      "State-of-the-art equipment, world-class coaches, and a community that pushes you further. This is where limits get rewritten.",
    ctaPrimary: "Start Free Trial",
    ctaSecondary: "Explore Classes",
    image: img("photo-1534438327276-14e5300c3a48", 1600),
    stats: [
      { value: "2.4K+", label: "Active Members" },
      { value: "35+", label: "Weekly Classes" },
      { value: "18", label: "Expert Coaches" },
      { value: "24/7", label: "Open Access" },
    ],
  },
  about: {
    eyebrow: "Who We Are",
    heading: "A gym built for people who refuse to settle",
    body: "City GYM isn't just a place to lift — it's a movement. Since day one we've blended premium equipment, science-backed training, and a barista café so good you'll want to stay all day. Whether you're chasing your first pull-up or your next PR, our coaches build the path with you.",
    image: img("photo-1571902943202-507ec2618e8f", 1200),
    points: [
      "1,400m² of training floor",
      "Dedicated women's section",
      "In-house nutrition & InBody analysis",
      "Barista café & protein bar",
    ],
  },
  services: {
    eyebrow: "What We Offer",
    heading: "Everything under one roof",
    items: [
      { icon: "Dumbbell", title: "Strength Zone", desc: "Free weights, racks, and machines from the best brands in the world." },
      { icon: "HeartPulse", title: "Cardio Theater", desc: "Treadmills, bikes, and rowers with immersive screens." },
      { icon: "Users", title: "Group Classes", desc: "HIIT, spin, yoga, boxing — 35+ sessions every week." },
      { icon: "Salad", title: "Nutrition Coaching", desc: "Personalised plans with our in-house dietitian + InBody." },
      { icon: "Baby", title: "Kids Area", desc: "Supervised play zone so parents can train worry-free." },
      { icon: "Coffee", title: "Barista Café", desc: "Specialty coffee, smoothies, and a loaded protein bar." },
    ],
  },
  classes: {
    eyebrow: "Move With Us",
    heading: "Find your rhythm",
    items: [
      { name: "Power HIIT", image: img("photo-1517836357463-d25dfeac3438", 800), schedule: "Mon · Wed · Fri — 6:00 PM", level: "All Levels" },
      { name: "Spin Storm", image: img("photo-1534258936925-c58bed479fcb", 800), schedule: "Tue · Thu — 7:00 PM", level: "Intermediate" },
      { name: "Iron Boxing", image: img("photo-1549719386-74dfcbf7dbed", 800), schedule: "Sat · Mon — 8:00 PM", level: "All Levels" },
      { name: "Flow Yoga", image: img("photo-1588286840104-8957b019727f", 800), schedule: "Sun · Wed — 9:00 AM", level: "Beginner" },
    ],
  },
  trainers: {
    eyebrow: "Your Coaches",
    heading: "Trained by the best",
    items: [
      { name: "Omar Khalid", role: "Head Strength Coach", image: img("photo-1567013127542-490d757e51fc", 700), instagram: "#" },
      { name: "Lina Haddad", role: "Women's Program Lead", image: img("photo-1594381898411-846e7d193883", 700), instagram: "#" },
      { name: "Yousef Nseir", role: "HIIT & Conditioning", image: img("photo-1583454110551-21f2fa2afe61", 700), instagram: "#" },
      { name: "Rana Saleh", role: "Yoga & Mobility", image: img("photo-1518611012118-696072aa579a", 700), instagram: "#" },
    ],
  },
  gallery: {
    eyebrow: "Inside City GYM",
    heading: "The atmosphere",
    images: [
      img("photo-1534438327276-14e5300c3a48", 800),
      img("photo-1540497077202-7c8a3999166f", 800),
      img("photo-1581009146145-b5ef050c2e1e", 800),
      img("photo-1593079831268-3381b0db4a77", 800),
      img("photo-1574680096145-d05b474e2155", 800),
      img("photo-1571019613454-1cb2f99b2d8b", 800),
    ],
  },
  pricing: {
    eyebrow: "Membership",
    heading: "Pick your plan",
    plans: [
      { name: "Day Pass", price: "5", period: "JOD / day", features: ["Full gym access", "Locker & showers", "Café discount"], featured: false },
      { name: "Monthly", price: "35", period: "JOD / month", features: ["Unlimited access", "All group classes", "1 InBody / month", "Café discount"], featured: true },
      { name: "Annual", price: "320", period: "JOD / year", features: ["Everything in Monthly", "2 PT sessions / month", "Nutrition plan", "Guest passes"], featured: false },
    ],
  },
  location: {
    eyebrow: "Come Train",
    heading: "Find us in Amman",
    address: "Amman, Jordan",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27073.5!2d35.91!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzAwLjAiTiAzNcKwNTQnMzYuMCJF!5e0!3m2!1sen!2sjo!4v1700000000000",
    hours: [
      { day: "Mon – Fri", time: "6:00 AM – 12:00 AM" },
      { day: "Saturday", time: "8:00 AM – 11:00 PM" },
      { day: "Sunday", time: "9:00 AM – 10:00 PM" },
    ],
  },
};
