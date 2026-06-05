import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  heading,
  align = "left",
}: {
  eyebrow: string;
  heading: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
          <span className="h-px w-8 bg-brand" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal i={1}>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mt-4">{heading}</h2>
      </Reveal>
    </div>
  );
}
