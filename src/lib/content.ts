import "server-only";
import { db } from "./db";
import { DEFAULT_CONTENT } from "./defaults";
import type { RawSiteContent, SiteContent, Lang, Submission } from "./types";

const CONTENT_KEY = "site_content_v3";

// Deep-merge stored content over defaults so newly added fields always resolve.
function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T;
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    const ov = (override ?? {}) as Record<string, unknown>;
    for (const k of Object.keys(out)) {
      out[k] = deepMerge((base as Record<string, unknown>)[k], ov[k]);
    }
    return out as T;
  }
  return (override === undefined ? base : override) as T;
}

function isLocalized(v: unknown): v is { en: string; ar: string } {
  return (
    typeof v === "object" && v !== null &&
    "en" in v && "ar" in v &&
    typeof (v as Record<string, unknown>).en === "string" &&
    typeof (v as Record<string, unknown>).ar === "string"
  );
}

// Recursively replace every { en, ar } with the string for `lang` (fallback to en).
function resolve<T>(value: unknown, lang: Lang): T {
  if (isLocalized(value)) return ((value[lang] || value.en) as unknown) as T;
  if (Array.isArray(value)) return value.map((v) => resolve(v, lang)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = resolve(v, lang);
    return out as T;
  }
  return value as T;
}

export function getRawContent(): RawSiteContent {
  const row = db.prepare("SELECT value FROM meta WHERE key = ?").get(CONTENT_KEY) as
    | { value: string }
    | undefined;
  if (!row) return DEFAULT_CONTENT;
  try {
    return deepMerge(DEFAULT_CONTENT, JSON.parse(row.value));
  } catch {
    return DEFAULT_CONTENT;
  }
}

export function getContent(lang: Lang = "en"): SiteContent {
  return resolve<SiteContent>(getRawContent(), lang);
}

export function saveContent(content: RawSiteContent): void {
  db.prepare(
    "INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  ).run(CONTENT_KEY, JSON.stringify(content));
}

export function addSubmission(s: { name: string; email: string; phone: string; message: string }) {
  db.prepare(
    "INSERT INTO submissions (name, email, phone, message) VALUES (?, ?, ?, ?)"
  ).run(s.name, s.email, s.phone, s.message);
}

export function getSubmissions(): Submission[] {
  return db.prepare("SELECT * FROM submissions ORDER BY id DESC LIMIT 200").all() as Submission[];
}

export function deleteSubmission(id: number) {
  db.prepare("DELETE FROM submissions WHERE id = ?").run(id);
}
