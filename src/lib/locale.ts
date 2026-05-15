export const LOCALE_COOKIE_NAME = "site-locale";

export type Locale = "en" | "fr";

export function resolveLocale(value?: string | null): Locale {
  return value === "fr" ? "fr" : "en";
}
