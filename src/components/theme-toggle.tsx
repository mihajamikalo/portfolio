"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

type ThemeToggleProps = {
  locale: Locale;
};

export default function ThemeToggle({ locale }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-blue-200 px-4 py-2 text-xs font-semibold text-blue-900 transition hover:border-soft-blue sm:text-sm"
      aria-label={locale === "fr" ? "Basculer le mode sombre" : "Toggle dark mode"}
      suppressHydrationWarning
    >
      {theme === "light"
        ? locale === "fr"
          ? "Mode sombre"
          : "Dark Mode"
        : locale === "fr"
          ? "Mode clair"
          : "Light Mode"}
    </button>
  );
}
