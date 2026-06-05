import "server-only";
import { db } from "./db";
import { DEFAULT_CONTENT } from "./defaults";
import type { SiteContent, Submission } from "./types";

const CONTENT_KEY = "site_content";

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

export function getContent(): SiteContent {
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

export function saveContent(content: SiteContent): void {
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
  return db
    .prepare("SELECT * FROM submissions ORDER BY id DESC LIMIT 200")
    .all() as Submission[];
}

export function deleteSubmission(id: number) {
  db.prepare("DELETE FROM submissions WHERE id = ?").run(id);
}
