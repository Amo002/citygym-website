"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { loginAction } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="City GYM" className="mx-auto h-16 w-16 object-contain" />
          <h1 className="font-display mt-4 text-3xl">City GYM Admin</h1>
          <p className="mt-1 text-sm text-fg-muted">Sign in to manage your site</p>
        </div>
        <form action={action} className="card space-y-4 p-7">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">
              Username
            </label>
            <input name="username" className="field" placeholder="admin" autoFocus required />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fg-muted">
              Password
            </label>
            <input name="password" type="password" className="field" placeholder="••••••••" required />
          </div>
          {state?.error && <p className="text-sm font-medium text-red-500">{state.error}</p>}
          <button
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 font-semibold text-brand-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {pending ? <Loader2 size={17} className="animate-spin" /> : <Lock size={16} />}
            Sign In
          </button>
          <p className="text-center text-xs text-fg-muted">Default: admin / citygym</p>
        </form>
      </div>
    </div>
  );
}
