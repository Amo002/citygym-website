import type { RawSiteContent, Localized } from "./types";

// Stock imagery from Unsplash (stable IDs). Swap any of these from the admin panel.
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Localized string helper: L("English", "العربية")
const L = (en: string, ar: string): Localized => ({ en, ar });

export const DEFAULT_CONTENT: RawSiteContent = {
  brand: {
    name: L("City GYM", "سيتي جيم"),
    tagline: L("More Than Fitness", "أكثر من مجرد لياقة"),
    phoneMen: "0797207187",
    phoneWomen: "0797207189",
    email: "info@citygym.jo",
    address: L("Amman, Jordan", "عمّان، الأردن"),
    instagram: "https://instagram.com/citygym",
    facebook: "https://facebook.com/citygym",
    whatsapp: "962797207187",
  },
  hero: {
    eyebrow: L("Amman · Jordan", "عمّان · الأردن"),
    titleTop: L("Train Hard", "تمرّن بقوة"),
    titleHighlight: L("Live", "عِش"),
    titleBottom: L("Better", "أفضل"),
    subtitle: L(
      "State-of-the-art equipment, world-class coaches, and a community that pushes you further. This is where limits get rewritten.",
      "أحدث الأجهزة، ومدرّبون على أعلى مستوى، ومجتمع يدفعك إلى الأمام. هنا تُعاد كتابة الحدود."
    ),
    ctaPrimary: L("Start Free Trial", "ابدأ تجربة مجانية"),
    ctaSecondary: L("Explore Classes", "استكشف الحصص"),
    image: img("photo-1534438327276-14e5300c3a48", 1600),
    stats: [
      { value: "2.4K+", label: L("Active Members", "عضو نشِط") },
      { value: "35+", label: L("Weekly Classes", "حصة أسبوعية") },
      { value: "18", label: L("Expert Coaches", "مدرّب محترف") },
      { value: "24/7", label: L("Open Access", "دخول دائم") },
    ],
  },
  about: {
    eyebrow: L("Who We Are", "من نحن"),
    heading: L("A gym built for people who refuse to settle", "نادٍ صُمّم لمن لا يقبل بأنصاف الحلول"),
    body: L(
      "City GYM isn't just a place to lift — it's a movement. Since day one we've blended premium equipment, science-backed training, and a barista café so good you'll want to stay all day. Whether you're chasing your first pull-up or your next PR, our coaches build the path with you.",
      "سيتي جيم ليس مجرد مكان لرفع الأثقال — إنه أسلوب حياة. منذ اليوم الأول جمعنا بين أفضل الأجهزة وتدريب قائم على العلم ومقهى باريستا يجعلك ترغب بالبقاء طوال اليوم. سواء كنت تسعى لأول تمرين أو لرقم قياسي جديد، مدرّبونا يرسمون الطريق معك."
    ),
    image: img("photo-1571902943202-507ec2618e8f", 1200),
    points: [
      L("1,400m² of training floor", "١٤٠٠ م² مساحة تدريب"),
      L("Dedicated women's section", "قسم مخصّص للسيدات"),
      L("In-house nutrition & InBody analysis", "تغذية وتحليل InBody داخل النادي"),
      L("Barista café & protein bar", "مقهى باريستا وبار بروتين"),
    ],
  },
  services: {
    eyebrow: L("What We Offer", "ماذا نقدّم"),
    heading: L("Everything under one roof", "كل شيء تحت سقف واحد"),
    items: [
      { icon: "Dumbbell", title: L("Strength Zone", "منطقة القوة"), desc: L("Free weights, racks, and machines from the best brands in the world.", "أوزان حرّة وأجهزة من أفضل العلامات العالمية.") },
      { icon: "HeartPulse", title: L("Cardio Theater", "صالة الكارديو"), desc: L("Treadmills, bikes, and rowers with immersive screens.", "أجهزة مشي ودرّاجات وتجديف بشاشات غامرة.") },
      { icon: "Users", title: L("Group Classes", "حصص جماعية"), desc: L("HIIT, spin, yoga, boxing — 35+ sessions every week.", "هيت، سبِن، يوغا، ملاكمة — أكثر من ٣٥ حصة أسبوعياً.") },
      { icon: "Salad", title: L("Nutrition Coaching", "إرشاد غذائي"), desc: L("Personalised plans with our in-house dietitian + InBody.", "خطط مخصّصة مع أخصائية التغذية وتحليل InBody.") },
      { icon: "Baby", title: L("Kids Area", "منطقة الأطفال"), desc: L("Supervised play zone so parents can train worry-free.", "منطقة لعب تحت إشراف ليتمرّن الآباء بلا قلق.") },
      { icon: "Coffee", title: L("Barista Café", "مقهى باريستا"), desc: L("Specialty coffee, smoothies, and a loaded protein bar.", "قهوة مختصّة وعصائر وبار بروتين متكامل.") },
    ],
  },
  classes: {
    eyebrow: L("Move With Us", "تحرّك معنا"),
    heading: L("Find your rhythm", "اعثر على إيقاعك"),
    items: [
      { name: L("Power HIIT", "باور هيت"), image: img("photo-1517836357463-d25dfeac3438", 800), schedule: L("Mon · Wed · Fri — 6:00 PM", "الإثنين · الأربعاء · الجمعة — ٦:٠٠ م"), level: L("All Levels", "كل المستويات") },
      { name: L("Spin Storm", "سبِن ستورم"), image: img("photo-1534258936925-c58bed479fcb", 800), schedule: L("Tue · Thu — 7:00 PM", "الثلاثاء · الخميس — ٧:٠٠ م"), level: L("Intermediate", "متوسّط") },
      { name: L("Iron Boxing", "آيرون بوكسينغ"), image: img("photo-1549719386-74dfcbf7dbed", 800), schedule: L("Sat · Mon — 8:00 PM", "السبت · الإثنين — ٨:٠٠ م"), level: L("All Levels", "كل المستويات") },
      { name: L("Flow Yoga", "فلو يوغا"), image: img("photo-1588286840104-8957b019727f", 800), schedule: L("Sun · Wed — 9:00 AM", "الأحد · الأربعاء — ٩:٠٠ ص"), level: L("Beginner", "مبتدئ") },
    ],
  },
  trainers: {
    eyebrow: L("Your Coaches", "مدرّبوك"),
    heading: L("Trained by the best", "تدرّب على يد الأفضل"),
    items: [
      { name: L("Omar Khalid", "عمر خالد"), role: L("Head Strength Coach", "مدرّب القوة الرئيسي"), image: img("photo-1567013127542-490d757e51fc", 700), instagram: "#" },
      { name: L("Lina Haddad", "لينا حدّاد"), role: L("Women's Program Lead", "مسؤولة برنامج السيدات"), image: img("photo-1594381898411-846e7d193883", 700), instagram: "#" },
      { name: L("Yousef Nseir", "يوسف نصير"), role: L("HIIT & Conditioning", "هيت ولياقة"), image: img("photo-1583454110551-21f2fa2afe61", 700), instagram: "#" },
      { name: L("Rana Saleh", "رنا صالح"), role: L("Yoga & Mobility", "يوغا ومرونة"), image: img("photo-1518611012118-696072aa579a", 700), instagram: "#" },
    ],
  },
  gallery: {
    eyebrow: L("Inside City GYM", "داخل سيتي جيم"),
    heading: L("The atmosphere", "الأجواء"),
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
    eyebrow: L("Membership", "العضوية"),
    heading: L("Pick your plan", "اختر باقتك"),
    plans: [
      { name: L("Day Pass", "تذكرة يومية"), price: "5", period: L("JOD / day", "د.أ / يوم"), features: [L("Full gym access", "دخول كامل للنادي"), L("Locker & showers", "خزانة ودُش"), L("Café discount", "خصم المقهى")], featured: false },
      { name: L("Monthly", "شهري"), price: "35", period: L("JOD / month", "د.أ / شهر"), features: [L("Unlimited access", "دخول غير محدود"), L("All group classes", "كل الحصص الجماعية"), L("1 InBody / month", "تحليل InBody شهرياً"), L("Café discount", "خصم المقهى")], featured: true },
      { name: L("Annual", "سنوي"), price: "320", period: L("JOD / year", "د.أ / سنة"), features: [L("Everything in Monthly", "كل مزايا الشهري"), L("2 PT sessions / month", "حصتا تدريب خاص شهرياً"), L("Nutrition plan", "خطة غذائية"), L("Guest passes", "تذاكر ضيوف")], featured: false },
    ],
  },
  location: {
    eyebrow: L("Come Train", "تعال وتمرّن"),
    heading: L("Two clubs in Amman", "ناديان في عمّان"),
    places: [
      {
        label: L("Men's Club", "نادي الرجال"),
        address: L("Amman, Jordan", "عمّان، الأردن"),
        mapEmbed:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27073.5!2d35.91!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzAwLjAiTiAzNcKwNTQnMzYuMCJF!5e0!3m2!1sen!2sjo!4v1700000000000",
        hours: [
          { day: L("Mon – Fri", "الإثنين – الجمعة"), time: L("6:00 AM – 12:00 AM", "٦:٠٠ ص – ١٢:٠٠ م") },
          { day: L("Saturday", "السبت"), time: L("8:00 AM – 11:00 PM", "٨:٠٠ ص – ١١:٠٠ م") },
          { day: L("Sunday", "الأحد"), time: L("9:00 AM – 10:00 PM", "٩:٠٠ ص – ١٠:٠٠ م") },
        ],
      },
      {
        label: L("Women's Club", "نادي السيدات"),
        address: L("Amman, Jordan", "عمّان، الأردن"),
        mapEmbed:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27073.5!2d35.91!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzAwLjAiTiAzNcKwNTQnMzYuMCJF!5e0!3m2!1sen!2sjo!4v1700000000001",
        hours: [
          { day: L("Mon – Fri", "الإثنين – الجمعة"), time: L("8:00 AM – 10:00 PM", "٨:٠٠ ص – ١٠:٠٠ م") },
          { day: L("Saturday", "السبت"), time: L("9:00 AM – 9:00 PM", "٩:٠٠ ص – ٩:٠٠ م") },
          { day: L("Sunday", "الأحد"), time: L("10:00 AM – 8:00 PM", "١٠:٠٠ ص – ٨:٠٠ م") },
        ],
      },
    ],
  },
};
