"use client";

import { useRef, useState } from "react";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import type { Localized } from "@/lib/types";

/* ── Plain (non-translated) fields ── */
export function Text({
  label, value, onChange, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</span>
      <input className="field" dir="ltr" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function Area({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</span>
      <textarea className="field min-h-28 resize-y" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

/* ── Bilingual fields (EN + AR side by side) ── */
function LangBadge({ children }: { children: string }) {
  return <span className="absolute top-2 z-10 select-none rounded bg-bg px-1 text-[10px] font-bold text-fg-muted ltr:right-2 rtl:left-2">{children}</span>;
}

export function LocText({
  label, value, onChange,
}: { label: string; value: Localized; onChange: (v: Localized) => void }) {
  return (
    <div className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</span>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="relative"><LangBadge>EN</LangBadge>
          <input className="field pr-9" dir="ltr" value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        </div>
        <div className="relative"><LangBadge>ع</LangBadge>
          <input className="field pr-9 text-right" dir="rtl" value={value.ar} onChange={(e) => onChange({ ...value, ar: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

export function LocArea({
  label, value, onChange,
}: { label: string; value: Localized; onChange: (v: Localized) => void }) {
  return (
    <div className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</span>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="relative"><LangBadge>EN</LangBadge>
          <textarea className="field min-h-24 resize-y pr-9" dir="ltr" value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        </div>
        <div className="relative"><LangBadge>ع</LangBadge>
          <textarea className="field min-h-24 resize-y pr-9 text-right" dir="rtl" value={value.ar} onChange={(e) => onChange({ ...value, ar: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

export function LocStringList({
  label, items, onChange,
}: { label: string; items: Localized[]; onChange: (v: Localized[]) => void }) {
  const blank = (): Localized => ({ en: "", ar: "" });
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</span>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              <input className="field" dir="ltr" placeholder="EN" value={it.en}
                onChange={(e) => onChange(items.map((x, idx) => (idx === i ? { ...x, en: e.target.value } : x)))} />
              <input className="field text-right" dir="rtl" placeholder="ع" value={it.ar}
                onChange={(e) => onChange(items.map((x, idx) => (idx === i ? { ...x, ar: e.target.value } : x)))} />
            </div>
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border text-fg-muted hover:text-red-500">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button onClick={() => onChange([...items, blank()])}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-2 text-sm font-semibold text-fg-muted hover:border-brand hover:text-brand">
          <Plus size={14} /> Add
        </button>
      </div>
    </div>
  );
}

/* ── Image field: paste a URL OR upload to the server ── */
export function ImageField({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(file: File) {
    setBusy(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      onChange(json.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</span>
      <div className="flex gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
        ) : (
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border border-dashed border-border text-xs text-fg-muted">IMG</div>
        )}
        <div className="flex-1 space-y-2">
          <input className="field" dir="ltr" value={value} placeholder="https://…  or upload →" onChange={(e) => onChange(e.target.value)} />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-fg-muted hover:border-brand hover:text-brand disabled:opacity-50"
            >
              {busy ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />} Upload
            </button>
            {err && <span className="text-xs text-red-500">{err}</span>}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Generic object repeater ── */
export function Repeater<T>({
  items, onChange, render, blank, addLabel = "Add item",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  blank: () => T;
  addLabel?: string;
}) {
  const update = (i: number, patch: Partial<T>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border border-border bg-bg-sunken p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-fg-muted">#{i + 1}</span>
            <button onClick={() => remove(i)} className="grid h-7 w-7 place-items-center rounded-md text-fg-muted hover:bg-red-500/10 hover:text-red-500">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="space-y-3">{render(it, (patch) => update(i, patch))}</div>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, blank()])}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-2.5 text-sm font-semibold text-fg-muted transition-colors hover:border-brand hover:text-brand"
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}
