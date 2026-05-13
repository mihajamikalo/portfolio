import { getPortfolioContent } from "@/lib/content";

export default async function ProjectCarousel() {
  const { projects } = await getPortfolioContent();

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-blue-950">Featured Projects</h2>
      <p className="mt-2 text-sm text-blue-900/75 sm:text-base">
        Auto-scrolling preview of recent work. Hover to pause.
      </p>
      <div className="mt-5 overflow-hidden rounded-3xl border border-blue-100 bg-white/90 p-3 shadow-sm">
        <div className="project-carousel-track">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className="project-carousel-group"
              aria-hidden={groupIndex === 1}
            >
              {projects.map((project) => (
                <article
                  key={`${groupIndex}-${project.title}`}
                  className="w-[280px] shrink-0 rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_8px_24px_rgba(29,78,216,0.08)]"
                >
                  <h3 className="text-base font-semibold text-blue-950">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-900/80">
                    {project.description}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <li
                        key={`${groupIndex}-${project.title}-${tech}`}
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-black"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
