export default function ContactPage() {
  return (
    <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold text-blue-950">Contact Me</h1>
      <p className="mt-3 text-blue-900/80">
        Let&apos;s discuss your next project or collaboration opportunity.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:mihajamikalo@gmail.com"
          className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-soft-blue"
        >
          <p className="text-sm text-blue-700">Email</p>
          <p className="mt-1 font-semibold text-blue-950">mihajamikalo@gmail.com</p>
        </a>
        <a
          className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-soft-blue"
          href="tel:+261341970025"
        >
          <p className="text-sm text-blue-700">Phone</p>
          <p className="mt-1 font-semibold text-blue-950">+261 34 19 700 25</p>
        </a>
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-soft-blue">
          <p className="text-sm text-blue-700">Address</p>
          <p className="mt-1 font-semibold text-blue-950">
            LOT IVI 73 Antanety Nord Ambohimanarina
          </p>
        </div>
        <a
          href="https://github.com/mihajamikalo"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-soft-blue"
        >
          <p className="text-sm text-blue-700">GitHub</p>
          <p className="mt-1 font-semibold text-blue-950">github.com/mihajamikalo</p>
        </a>
      </div>
    </section>
  );
}
