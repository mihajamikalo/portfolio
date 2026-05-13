import Link from "next/link";

const socialLinks = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://github.com", label: "GitHub" },
  { href: "https://x.com", label: "X / Twitter" },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-blue-100 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 text-sm text-blue-900/80 sm:flex-row sm:px-8">
        <p>Copyright {currentYear} MyPortfolio. All rights reserved.</p>
        <ul className="flex flex-wrap items-center gap-4">
          {socialLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-800 transition hover:text-soft-blue"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
