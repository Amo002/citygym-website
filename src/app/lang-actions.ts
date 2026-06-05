"use server";

import { cookies } from "next/headers";
import { LANG_COOKIE } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

export async function setLangAction(lang: Lang) {
  (await cookies()).set(LANG_COOKIE, lang === "ar" ? "ar" : "en", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
