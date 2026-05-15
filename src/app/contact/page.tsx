import { FaFacebook, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { getServerLocale } from "@/lib/server-locale";

export default async function ContactPage() {
  const locale = await getServerLocale();

  return (
    <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold text-blue-950">
        {locale === "fr" ? "Contactez-moi" : "Contact Me"}
      </h1>
      <p className="mt-3 text-blue-900/80">
        {locale === "fr"
          ? "Discutons de votre prochain projet ou d'une opportunite de collaboration."
          : "Let's discuss your next project or collaboration opportunity."}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <p className="text-sm text-blue-700">{locale === "fr" ? "Telephone" : "Phone"}</p>
          <p className="mt-1 font-semibold text-blue-950">+261 34 19 700 25</p>
        </a>
        <a
          href="https://wa.me/261341970025"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-soft-blue"
        >
          <p className="inline-flex items-center gap-1.5 text-sm text-blue-700">
            <FaWhatsapp className="text-base" aria-hidden />
            Whatsapp
          </p>
          <p className="mt-1 font-semibold text-blue-950">
            {locale === "fr" ? "Discuter sur WhatsApp" : "Chat on WhatsApp"}
          </p>
        </a>
        <a
          href="https://github.com/mihajamikalo"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-soft-blue"
        >
          <p className="inline-flex items-center gap-1.5 text-sm text-blue-700">
            <FaGithub className="text-base" aria-hidden />
            GitHub
          </p>
          <p className="mt-1 font-semibold text-blue-950">github.com/mihajamikalo</p>
        </a>
        <a
          href="https://web.facebook.com/Tiavina.liantsoa2"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-soft-blue"
        >
          <p className="inline-flex items-center gap-1.5 text-sm text-blue-700">
            <FaFacebook className="text-base" aria-hidden />
            Facebook
          </p>
          <p className="mt-1 font-semibold text-blue-950">Tiavina.liantsoa2</p>
        </a>
        <a
          href="https://www.instagram.com/tiavina_liantsoaa?igsh=bnZucjEwNXFwMm40"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-soft-blue"
        >
          <p className="inline-flex items-center gap-1.5 text-sm text-blue-700">
            <FaInstagram className="text-base" aria-hidden />
            Instagram
          </p>
          <p className="mt-1 font-semibold text-blue-950">@tiavina_liantsoaa</p>
        </a>
      </div>
    </section>
  );
}
