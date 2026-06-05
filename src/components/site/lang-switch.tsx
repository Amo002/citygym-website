"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLangAction } from "@/app/lang-actions";
import type { Lang } from "@/lib/types";

export function LangSwitch({ lang }: { lang: Lang }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  const choose = (l: Lang) => {
    if (l === lang || pending) return;
    start(async () => { await setLangAction(l); router.refresh(); });
  };

  const opts: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "ar", label: "عربي" },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex h-10 items-center rounded-full border border-border bg-bg-elevated p-1 transition-opacity ${pending ? "opacity-60" : ""}`}
    >
      {opts.map((o) => {
        const active = o.code === lang;
        return (
          <button
            key={o.code}
            onClick={() => choose(o.code)}
            aria-pressed={active}
            className={`grid h-8 min-w-8 place-items-center rounded-full px-2.5 text-sm font-bold transition-all ${
              active
                ? "bg-brand text-brand-ink shadow-sm"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
