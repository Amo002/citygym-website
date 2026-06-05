export function Marquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  const items = Array.from({ length: 8 });
  return (
    <div className="relative flex overflow-hidden border-y border-border bg-brand py-4 text-brand-ink select-none">
      <div className={`flex shrink-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {items.map((_, i) => (
          <span key={i} className="mx-6 font-display text-2xl sm:text-3xl">
            {text} <span className="opacity-60">✦</span>
          </span>
        ))}
      </div>
      <div className={`flex shrink-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`} aria-hidden>
        {items.map((_, i) => (
          <span key={i} className="mx-6 font-display text-2xl sm:text-3xl">
            {text} <span className="opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
