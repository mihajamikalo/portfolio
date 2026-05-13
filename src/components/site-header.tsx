import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/stack", label: "Stack" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-blue-100/80 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link href="/" className="text-base font-bold tracking-wide text-soft-blue sm:text-lg">
          Tiavina Portfolio
        </Link>
        <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-blue-900 sm:gap-5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition hover:text-soft-blue">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/resume"
              className="rounded-full bg-soft-blue px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Download Resume
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
