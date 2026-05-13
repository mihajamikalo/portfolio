import { getPortfolioContent } from "@/lib/content";

export default async function CursusTree() {
  const { cursus: cursusSteps } = await getPortfolioContent();

  return (
    <section className="mt-12 rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-blue-950">Cursus Tree</h2>
      <p className="mt-2 text-sm text-blue-900/75 sm:text-base">
        Academic and professional milestones that shaped my profile.
      </p>

      <ol className="mt-6 space-y-6">
        {cursusSteps.map((step, index) => (
          <li key={step.title} className="relative pl-8">
            <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-soft-blue" />
            {index < cursusSteps.length - 1 ? (
              <span className="absolute left-[5px] top-5 h-[calc(100%+14px)] w-px bg-blue-200" />
            ) : null}
            <p className="text-sm font-semibold text-soft-blue">{step.period}</p>
            <h3 className="mt-1 text-lg font-semibold text-blue-950">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-blue-900/80">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
