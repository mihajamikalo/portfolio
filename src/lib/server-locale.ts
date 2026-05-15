import { cookies } from "next/headers";
import { LOCALE_COOKIE_NAME, type Locale, resolveLocale } from "@/lib/locale";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return resolveLocale(localeValue);
}
