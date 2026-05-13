import { getPortfolioContent } from "@/lib/content";

export default async function StackPage() {
  const { stack: stacks } = await getPortfolioContent();

  return (
    <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold text-blue-950">Tech Stack</h1>
      <p className="mt-3 text-blue-900/75">
        Tools and technologies I use to build performant and modern products.
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
