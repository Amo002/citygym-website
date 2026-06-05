"use client";

import { useState, useTransition } from "react";
import {
  Save, LogOut, Check, Loader2, ExternalLink, Inbox, Trash2,
  Building2, Sparkles, Info, LayoutGrid, CalendarDays, UsersRound,
  Images, Tag, MapPin, KeyRound,
} from "lucide-react";
import type { SiteContent, Submission } from "@/lib/types";
import { ICON_NAMES } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { saveContentAction, logoutAction, deleteSubmissionAction, changePasswordAction } from "@/app/admin/actions";
import { Text, Area, ImageField, Repeater, StringList } from "./fields";

type Tab =
  | "brand" | "hero" | "about" | "services" | "classes"
  | "trainers" | "gallery" | "pricing" | "location" | "messages" | "settings";

const TABS: { key: Tab; label: string; Icon: typeof Save }[] = [
  { key: "brand", label: "Brand", Icon: Building2 },
  { key: "hero", label: "Hero", Icon: Sparkles },
  { key: "about", label: "About", Icon: Info },
  { key: "services", label: "Services", Icon: LayoutGrid },
  { key: "classes", label: "Classes", Icon: CalendarDays },
  { key: "trainers", label: "Coaches", Icon: UsersRound },
  { key: "gallery", label: "Gallery", Icon: Images },
  { key: "pricing", label: "Pricing", Icon: Tag },
  { key: "location", label: "Location", Icon: MapPin },
  { key: "messages", label: "Messages", Icon: Inbox },
  { key: "settings", label: "Settings", Icon: KeyRound },
];

export function AdminDashboard({
  initialContent, submissions, username,
}: { initialContent: SiteContent; submissions: Submission[]; username: string }) {
  const [c, setC] = useState<SiteContent>(initialContent);
  const [tab, setTab] = useState<Tab>("brand");
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const [msgs, setMsgs] = useState(submissions);

  // immutable section updater
  function up<K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]>) {
    setC((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
  }

  function save() {
    startTransition(async () => {
      await saveContentAction(c);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    });
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-bg-elevated p-4 lg:flex">
        <div className="flex items-center gap-2 px-2 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-display text-lg text-brand-ink">C</span>
          <span className="font-display text-xl">City GYM</span>
        </div>
        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === t.key ? "bg-brand text-brand-ink" : "text-fg-muted hover:bg-bg-sunken hover:text-fg"
              }`}
            >
              <t.Icon size={16} />
              {t.label}
              {t.key === "messages" && msgs.length > 0 && (
                <span className={`ml-auto rounded-full px-1.5 text-xs font-bold ${tab === t.key ? "bg-brand-ink/20" : "bg-brand/15 text-brand"}`}>
                  {msgs.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <form action={logoutAction}>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-fg-muted hover:bg-red-500/10 hover:text-red-500">
            <LogOut size={16} /> Logout
          </button>
        </form>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-bg/85 px-5 py-3 backdrop-blur-xl sm:px-8">
          <div>
            <h1 className="font-display text-2xl capitalize">{tab}</h1>
            <p className="text-xs text-fg-muted">Signed in as {username}</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-brand sm:inline-flex">
              View site <ExternalLink size={14} />
            </a>
            <ThemeToggle />
            <button
              onClick={save}
              disabled={pending}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                saved ? "bg-green-600 text-white" : "bg-brand text-brand-ink hover:scale-105"
              } disabled:opacity-60`}
            >
              {pending ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </header>

        {/* Mobile tabs */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-border px-5 py-3 lg:hidden">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${tab === t.key ? "bg-brand text-brand-ink" : "bg-bg-sunken text-fg-muted"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <main className="mx-auto max-w-3xl space-y-5 p-5 sm:p-8">
          {tab === "brand" && (
            <Card>
              <Grid2>
                <Text label="Name" value={c.brand.name} onChange={(v) => up("brand", { name: v })} />
                <Text label="Tagline" value={c.brand.tagline} onChange={(v) => up("brand", { tagline: v })} />
                <Text label="Men's Phone" value={c.brand.phoneMen} onChange={(v) => up("brand", { phoneMen: v })} />
                <Text label="Women's Phone" value={c.brand.phoneWomen} onChange={(v) => up("brand", { phoneWomen: v })} />
                <Text label="Email" value={c.brand.email} onChange={(v) => up("brand", { email: v })} />
                <Text label="Address" value={c.brand.address} onChange={(v) => up("brand", { address: v })} />
                <Text label="Instagram URL" value={c.brand.instagram} onChange={(v) => up("brand", { instagram: v })} />
                <Text label="Facebook URL" value={c.brand.facebook} onChange={(v) => up("brand", { facebook: v })} />
                <Text label="WhatsApp (digits)" value={c.brand.whatsapp} onChange={(v) => up("brand", { whatsapp: v })} />
              </Grid2>
            </Card>
          )}

          {tab === "hero" && (
            <Card>
              <Text label="Eyebrow" value={c.hero.eyebrow} onChange={(v) => up("hero", { eyebrow: v })} />
              <Grid2>
                <Text label="Title Top" value={c.hero.titleTop} onChange={(v) => up("hero", { titleTop: v })} />
                <Text label="Highlight Word" value={c.hero.titleHighlight} onChange={(v) => up("hero", { titleHighlight: v })} />
                <Text label="Title Bottom" value={c.hero.titleBottom} onChange={(v) => up("hero", { titleBottom: v })} />
                <Text label="Primary CTA" value={c.hero.ctaPrimary} onChange={(v) => up("hero", { ctaPrimary: v })} />
                <Text label="Secondary CTA" value={c.hero.ctaSecondary} onChange={(v) => up("hero", { ctaSecondary: v })} />
              </Grid2>
              <Area label="Subtitle" value={c.hero.subtitle} onChange={(v) => up("hero", { subtitle: v })} />
              <ImageField label="Background Image" value={c.hero.image} onChange={(v) => up("hero", { image: v })} />
              <Label>Stats</Label>
              <Repeater
                items={c.hero.stats}
                onChange={(stats) => up("hero", { stats })}
                blank={() => ({ value: "", label: "" })}
                addLabel="Add stat"
                render={(s, u) => (
                  <Grid2>
                    <Text label="Value" value={s.value} onChange={(v) => u({ value: v })} />
                    <Text label="Label" value={s.label} onChange={(v) => u({ label: v })} />
                  </Grid2>
                )}
              />
            </Card>
          )}

          {tab === "about" && (
            <Card>
              <Text label="Eyebrow" value={c.about.eyebrow} onChange={(v) => up("about", { eyebrow: v })} />
              <Text label="Heading" value={c.about.heading} onChange={(v) => up("about", { heading: v })} />
              <Area label="Body" value={c.about.body} onChange={(v) => up("about", { body: v })} />
              <ImageField label="Image" value={c.about.image} onChange={(v) => up("about", { image: v })} />
              <Label>Highlights</Label>
              <StringList items={c.about.points} onChange={(points) => up("about", { points })} placeholder="Highlight…" />
            </Card>
          )}

          {tab === "services" && (
            <Card>
              <Text label="Eyebrow" value={c.services.eyebrow} onChange={(v) => up("services", { eyebrow: v })} />
              <Text label="Heading" value={c.services.heading} onChange={(v) => up("services", { heading: v })} />
              <Label>Service items</Label>
              <Repeater
                items={c.services.items}
                onChange={(items) => up("services", { items })}
                blank={() => ({ icon: "Dumbbell", title: "", desc: "" })}
                addLabel="Add service"
                render={(s, u) => (
                  <>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">Icon</span>
                      <select className="field" value={s.icon} onChange={(e) => u({ icon: e.target.value })}>
                        {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </label>
                    <Text label="Title" value={s.title} onChange={(v) => u({ title: v })} />
                    <Area label="Description" value={s.desc} onChange={(v) => u({ desc: v })} />
                  </>
                )}
              />
            </Card>
          )}

          {tab === "classes" && (
            <Card>
              <Text label="Eyebrow" value={c.classes.eyebrow} onChange={(v) => up("classes", { eyebrow: v })} />
              <Text label="Heading" value={c.classes.heading} onChange={(v) => up("classes", { heading: v })} />
              <Label>Classes</Label>
              <Repeater
                items={c.classes.items}
                onChange={(items) => up("classes", { items })}
                blank={() => ({ name: "", image: "", schedule: "", level: "All Levels" })}
                addLabel="Add class"
                render={(it, u) => (
                  <>
                    <Grid2>
                      <Text label="Name" value={it.name} onChange={(v) => u({ name: v })} />
                      <Text label="Level" value={it.level} onChange={(v) => u({ level: v })} />
                    </Grid2>
                    <Text label="Schedule" value={it.schedule} onChange={(v) => u({ schedule: v })} />
                    <ImageField label="Image" value={it.image} onChange={(v) => u({ image: v })} />
                  </>
                )}
              />
            </Card>
          )}

          {tab === "trainers" && (
            <Card>
              <Text label="Eyebrow" value={c.trainers.eyebrow} onChange={(v) => up("trainers", { eyebrow: v })} />
              <Text label="Heading" value={c.trainers.heading} onChange={(v) => up("trainers", { heading: v })} />
              <Label>Coaches</Label>
              <Repeater
                items={c.trainers.items}
                onChange={(items) => up("trainers", { items })}
                blank={() => ({ name: "", role: "", image: "", instagram: "#" })}
                addLabel="Add coach"
                render={(it, u) => (
                  <>
                    <Grid2>
                      <Text label="Name" value={it.name} onChange={(v) => u({ name: v })} />
                      <Text label="Role" value={it.role} onChange={(v) => u({ role: v })} />
                    </Grid2>
                    <Text label="Instagram URL" value={it.instagram} onChange={(v) => u({ instagram: v })} />
                    <ImageField label="Photo" value={it.image} onChange={(v) => u({ image: v })} />
                  </>
                )}
              />
            </Card>
          )}

          {tab === "gallery" && (
            <Card>
              <Text label="Eyebrow" value={c.gallery.eyebrow} onChange={(v) => up("gallery", { eyebrow: v })} />
              <Text label="Heading" value={c.gallery.heading} onChange={(v) => up("gallery", { heading: v })} />
              <Label>Image URLs (first 6 shown)</Label>
              <Repeater
                items={c.gallery.images.map((url) => ({ url }))}
                onChange={(arr) => up("gallery", { images: arr.map((a) => a.url) })}
                blank={() => ({ url: "" })}
                addLabel="Add image"
                render={(it, u) => <ImageField label="Image URL" value={it.url} onChange={(v) => u({ url: v })} />}
              />
            </Card>
          )}

          {tab === "pricing" && (
            <Card>
              <Text label="Eyebrow" value={c.pricing.eyebrow} onChange={(v) => up("pricing", { eyebrow: v })} />
              <Text label="Heading" value={c.pricing.heading} onChange={(v) => up("pricing", { heading: v })} />
              <Label>Plans</Label>
              <Repeater
                items={c.pricing.plans}
                onChange={(plans) => up("pricing", { plans })}
                blank={() => ({ name: "", price: "", period: "", features: [], featured: false })}
                addLabel="Add plan"
                render={(p, u) => (
                  <>
                    <Grid2>
                      <Text label="Name" value={p.name} onChange={(v) => u({ name: v })} />
                      <Text label="Price" value={p.price} onChange={(v) => u({ price: v })} />
                    </Grid2>
                    <Text label="Period" value={p.period} onChange={(v) => u({ period: v })} />
                    <Label>Features</Label>
                    <StringList items={p.features} onChange={(features) => u({ features })} placeholder="Feature…" />
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input type="checkbox" checked={p.featured} onChange={(e) => u({ featured: e.target.checked })} />
                      Featured (highlighted) plan
                    </label>
                  </>
                )}
              />
            </Card>
          )}

          {tab === "location" && (
            <Card>
              <Text label="Eyebrow" value={c.location.eyebrow} onChange={(v) => up("location", { eyebrow: v })} />
              <Text label="Heading" value={c.location.heading} onChange={(v) => up("location", { heading: v })} />
              <Text label="Address" value={c.location.address} onChange={(v) => up("location", { address: v })} />
              <Area label="Google Maps Embed URL" value={c.location.mapEmbed} onChange={(v) => up("location", { mapEmbed: v })} />
              <Label>Opening Hours</Label>
              <Repeater
                items={c.location.hours}
                onChange={(hours) => up("location", { hours })}
                blank={() => ({ day: "", time: "" })}
                addLabel="Add row"
                render={(h, u) => (
                  <Grid2>
                    <Text label="Day" value={h.day} onChange={(v) => u({ day: v })} />
                    <Text label="Time" value={h.time} onChange={(v) => u({ time: v })} />
                  </Grid2>
                )}
              />
            </Card>
          )}

          {tab === "messages" && (
            <Card>
              {msgs.length === 0 ? (
                <div className="grid place-items-center gap-3 py-16 text-center">
                  <Inbox className="h-12 w-12 text-fg-muted" />
                  <p className="text-fg-muted">No messages yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {msgs.map((m) => (
                    <div key={m.id} className="rounded-xl border border-border bg-bg-sunken p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{m.name}</p>
                          <p className="text-xs text-fg-muted">{m.email} · {m.phone}</p>
                        </div>
                        <button
                          onClick={() =>
                            startTransition(async () => {
                              await deleteSubmissionAction(m.id);
                              setMsgs((prev) => prev.filter((x) => x.id !== m.id));
                            })
                          }
                          className="grid h-8 w-8 place-items-center rounded-md text-fg-muted hover:bg-red-500/10 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="mt-2 text-sm">{m.message}</p>
                      <p className="mt-2 text-xs text-fg-muted">{m.created_at}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {tab === "settings" && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();
  return (
    <Card>
      <Label>Change Admin Password</Label>
      <Text label="New password" value={pw} onChange={setPw} placeholder="••••••••" />
      {msg && <p className="text-sm font-medium text-brand">{msg}</p>}
      <button
        onClick={() => start(async () => {
          const r = await changePasswordAction(pw);
          setMsg(r?.ok ? "Password updated." : r?.error || "Error");
          if (r?.ok) setPw("");
        })}
        disabled={pending || !pw}
        className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-ink disabled:opacity-50"
      >
        {pending ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />} Update
      </button>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card space-y-4 p-5 sm:p-6">{children}</div>;
}
function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="pt-1 text-xs font-bold uppercase tracking-widest text-brand">{children}</p>;
}
