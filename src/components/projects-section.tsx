import { getPortfolioContent } from "@/lib/content";
import type { ProjectItem } from "@/types/content";

async function getProjects(): Promise<ProjectItem[]> {
  const content = await getPortfolioContent();
  return content.projects;
}

export default async function ProjectsSection() {
  const items = await getProjects();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project) => (
        <article
          key={project.title}
          className="rounded-2xl border border-soft-blue/15 bg-surface p-5 shadow-[0_14px_32px_rgba(29,78,216,0.08)] transition-transform duration-300 hover:-translate-y-1"
        >
          <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-blue-900/80">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={`${project.title}-${tech}`}
                className="rounded-full bg-muted-blue px-3 py-1 text-xs font-medium text-blue-900"
              >
                {tech}
              </li>
            ))}
          </ul>
          <a
            href={project.link}
            className="mt-5 inline-flex text-sm font-semibold text-soft-blue hover:text-blue-800"
          >
            View details
          </a>
        </article>
      ))}
    </div>
  );
}
