import { Suspense } from "react";
import ProjectsSection from "@/components/projects-section";

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-blue-950">Projects</h1>
      <p className="mt-3 text-blue-900/75">
        Selected work highlighting design quality, speed, and real-world impact.
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
          <ProjectsSection />
        </Suspense>
      </div>
    </section>
  );
}
