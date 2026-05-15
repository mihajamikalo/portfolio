"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/locale";

type SendMessageFormProps = {
  locale: Locale;
};

export default function SendMessageForm({ locale }: SendMessageFormProps) {
  const [loading, setLoading] = useState(false);
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      startedAt: formStartedAt,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            data.message ??
            (locale === "fr" ? "Impossible d'envoyer le message." : "Unable to send message."),
        });
        return;
      }

      form.reset();
      setFormStartedAt(Date.now());
      setStatus({
        type: "success",
        message:
          locale === "fr"
            ? "Message envoye avec succes. Je reviens vers vous bientot."
            : "Message sent successfully. I will get back to you soon.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          locale === "fr" ? "Erreur reseau. Veuillez reessayer." : "Network error. Please try again.",
      });
    } finally {
      setFormStartedAt(Date.now());
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-blue-950">
        {locale === "fr" ? "Envoyer un message" : "Send Message"}
      </h2>
      <p className="mt-2 text-sm text-blue-900/75 sm:text-base">
        {locale === "fr"
          ? "Partagez votre idee de projet ou votre demande de collaboration."
          : "Share your project idea or collaboration request."}
      </p>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <label className="flex flex-col gap-2 text-sm font-medium text-blue-900">
          {locale === "fr" ? "Nom complet" : "Full Name"}
          <input
            type="text"
            name="fullName"
            required
            placeholder={locale === "fr" ? "Votre nom complet" : "Your full name"}
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm outline-none transition focus:border-soft-blue focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-blue-900">
          Email
          <input
            type="email"
            name="email"
            required
            placeholder="mihajamikalo@gmail.com"
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm outline-none transition focus:border-soft-blue focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-blue-900 sm:col-span-2">
          {locale === "fr" ? "Sujet" : "Subject"}
          <input
            type="text"
            name="subject"
            required
            placeholder={locale === "fr" ? "Discussion de projet" : "Project discussion"}
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm outline-none transition focus:border-soft-blue focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-blue-900 sm:col-span-2">
          {locale === "fr" ? "Message" : "Message"}
          <textarea
            name="message"
            required
            rows={5}
            placeholder={locale === "fr" ? "Ecrivez votre message..." : "Write your message..."}
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm outline-none transition focus:border-soft-blue focus:bg-white"
          />
        </label>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-soft-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? locale === "fr"
                ? "Envoi..."
                : "Sending..."
              : locale === "fr"
                ? "Envoyer le message"
                : "Send Message"}
          </button>
          {status ? (
            <p
              className={`mt-3 text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {status.message}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
