"use client";

import type { Locale } from "@/lib/locale";
import { LOCALE_COOKIE_NAME } from "@/lib/locale";

type LanguageToggleFloatingProps = {
  locale: Locale;
};

export default function LanguageToggleFloating({ locale }: LanguageToggleFloatingProps) {
  const nextLocale: Locale = locale === "en" ? "fr" : "en";
  const label =
    locale === "en" ? "Traduire tout en francais" : "Switch all content to English";

  function handleClick() {
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-transparent bg-soft-blue px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(29,78,216,0.35)] transition hover:border-white hover:bg-blue-700 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.9),0_0_28px_rgba(255,255,255,0.75)]"
    >
      <span
        className="material-symbols-outlined text-base leading-none"
        style={{ fontVariationSettings: "'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}
        aria-hidden
      >
        translate
      </span>
      {locale === "en" ? "FR" : "EN"}
    </button>
  );
}
