// Scrolling ticker. Pass one or more phrases — they scroll one after another.
export function Marquee({ phrases, reverse = false }: { phrases: string[]; reverse?: boolean }) {
  const list = phrases.filter((p) => p.trim().length > 0);
  if (list.length === 0) return null;

  const Track = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div className={`flex shrink-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`} aria-hidden={ariaHidden || undefined}>
      {/* repeat the whole phrase set a few times so the strip always fills the width */}
      {Array.from({ length: 4 }).flatMap((_, r) =>
        list.map((p, i) => (
          <span key={`${r}-${i}`} className="mx-6 font-display text-2xl sm:text-3xl">
            {p} <span className="opacity-60">✦</span>
          </span>
        ))
      )}
    </div>
  );

  return (
    <div className="relative flex overflow-hidden border-y border-border bg-brand py-4 text-brand-ink select-none">
      <Track />
      <Track ariaHidden />
    </div>
  );
}
