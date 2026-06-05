"use client";

import { Plus, Trash2 } from "lucide-react";

export function Text({
  label, value, onChange, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</span>
      <input className="field" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
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

export function ImageField({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</span>
      <div className="flex gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
        ) : (
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border border-dashed border-border text-xs text-fg-muted">URL</div>
        )}
        <input className="field" value={value} placeholder="https://…" onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}

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

export function StringList({
  items, onChange, placeholder,
}: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      {items.map((s, i) => (
        <div key={i} className="flex gap-2">
          <input className="field" value={s} placeholder={placeholder}
            onChange={(e) => onChange(items.map((x, idx) => (idx === i ? e.target.value : x)))} />
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border text-fg-muted hover:text-red-500">
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-2 text-sm font-semibold text-fg-muted hover:border-brand hover:text-brand">
        <Plus size={14} /> Add
      </button>
    </div>
  );
}
