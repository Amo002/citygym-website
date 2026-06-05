"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme !== "light";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-bg-elevated text-fg transition-colors hover:border-brand hover:text-brand"
    >
      {mounted ? (isDark ? <Sun size={17} /> : <Moon size={17} />) : <Sun size={17} />}
    </button>
  );
}
