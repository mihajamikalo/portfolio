import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-b from-background via-background to-blue-50/70">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
