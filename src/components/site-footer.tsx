import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import type { IconType } from "react-icons";

const socialLinks = [
  {
    href: "https://github.com/mihajamikalo/",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://wa.me/261341970025",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
  {
    href: "https://web.facebook.com/Tiavina.liantsoa2",
    label: "Facebook",
    icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com/tiavina_liantsoaa?igsh=bnZucjEwNXFwMm40",
    label: "Instagram",
    icon: FaInstagram,
  },
] satisfies { href: string; label: string; icon: IconType }[];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-blue-100 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 text-sm text-blue-900/80 sm:flex-row sm:px-8">
        <p>Copyright {currentYear} Tiavina Liantsoa. All rights reserved.</p>
        <ul className="flex flex-wrap items-center gap-4">
          {socialLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-blue-800 transition hover:text-soft-blue"
              >
                <item.icon className="text-sm" aria-hidden />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
