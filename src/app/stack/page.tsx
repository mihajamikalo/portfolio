import { getPortfolioContent } from "@/lib/content";
import { getServerLocale } from "@/lib/server-locale";

export default async function StackPage() {
  const { stack: stacks } = await getPortfolioContent();
  const locale = await getServerLocale();

  return (
    <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold text-blue-950">
        {locale === "fr" ? "Stack technique" : "Tech Stack"}
      </h1>
      <p className="mt-3 text-blue-900/75">
        {locale === "fr"
          ? "Outils et technologies que j'utilise pour creer des produits performants et modernes."
          : "Tools and technologies I use to build performant and modern products."}
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map((tech) => (
          <li
            key={tech}
            className="rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm font-semibold text-blue-900"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
