export default function SendMessageForm() {
  return (
    <section className="mt-12 rounded-3xl border border-blue-100 bg-white/95 p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-blue-950">Send Message</h2>
      <p className="mt-2 text-sm text-blue-900/75 sm:text-base">
        Share your project idea or collaboration request.
      </p>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" action="#" method="post">
        <label className="flex flex-col gap-2 text-sm font-medium text-blue-900">
          Full Name
          <input
            type="text"
            name="fullName"
            required
            placeholder="Your full name"
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
          Subject
          <input
            type="text"
            name="subject"
            required
            placeholder="Project discussion"
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm outline-none transition focus:border-soft-blue focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-blue-900 sm:col-span-2">
          Message
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Write your message..."
            className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm outline-none transition focus:border-soft-blue focus:bg-white"
          />
        </label>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-soft-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
}
