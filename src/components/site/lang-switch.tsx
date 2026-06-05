"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { setLangAction } from "@/app/lang-actions";
import type { Lang } from "@/lib/types";

export function LangSwitch({ lang }: { lang: Lang }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const next: Lang = lang === "ar" ? "en" : "ar";

  return (
    <button
      aria-label="Switch language"
      disabled={pending}
      onClick={() => start(async () => { await setLangAction(next); router.refresh(); })}
      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-3 text-sm font-semibold text-fg transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
    >
      <Globe size={15} />
      {lang === "ar" ? "EN" : "ع"}
    </button>
  );
}
