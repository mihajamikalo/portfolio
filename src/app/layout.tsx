import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageToggleFloating from "@/components/language-toggle-floating";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getServerLocale } from "@/lib/server-locale";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiavina Portfolio",
  description:
    "Premium personal portfolio built with Next.js, showcasing projects, profile, and contact information.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=translate"
        />
      </head>
      <body className="min-h-full flex flex-col bg-gradient-to-b from-background via-background to-blue-50/70">
        <SiteHeader locale={locale} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <LanguageToggleFloating locale={locale} />
      </body>
    </html>
  );
}
