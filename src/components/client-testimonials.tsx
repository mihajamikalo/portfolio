import { getPortfolioContent } from "@/lib/content";

export default async function ClientTestimonials() {
  const { feedback: testimonials } = await getPortfolioContent();

  return (
    <section className="mt-12 rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-blue-950">What my previous client said</h2>
      <p className="mt-2 text-sm text-blue-900/75 sm:text-base">
        Feedback from recent collaborations and delivered projects.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5"
          >
            <p className="text-sm leading-relaxed text-blue-900/85">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-blue-950">{item.name}</p>
            <p className="text-xs text-blue-700">{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
