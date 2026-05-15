import { Suspense } from "react";
import ProjectsSection from "@/components/projects-section";
import { getServerLocale } from "@/lib/server-locale";

export default async function ProjectsPage() {
  const locale = await getServerLocale();

  return (
    <section>
      <h1 className="text-3xl font-bold text-blue-950">
        {locale === "fr" ? "Projets" : "Projects"}
      </h1>
      <p className="mt-3 text-blue-900/75">
        {locale === "fr"
          ? "Selection de realisations mettant en avant la qualite de design, la rapidite et l'impact reel."
          : "Selected work highlighting design quality, speed, and real-world impact."}
      </p>
      <div className="mt-6">
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-52 animate-pulse rounded-2xl border border-blue-100 bg-white"
                />
              ))}
            </div>
          }
        >
          <ProjectsSection locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
