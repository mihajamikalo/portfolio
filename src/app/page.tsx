import Image from "next/image";
import Link from "next/link";
import ClientTestimonials from "@/components/client-testimonials";
import CursusTree from "@/components/cursus-tree";
import GithubContributionGraph from "@/components/github-contribution-graph";
import ProjectCarousel from "@/components/project-carousel";
import SendMessageForm from "@/components/send-message-form";

export default function Home() {
  return (
    <div>
      <section className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-950 sm:text-5xl">
            Hi, I am Santatriniaina Tiavina Liantsoa.
            <span className="block text-soft-blue">
              Full-stack developer specialized in PHP/Laravel and React/Next.js.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-blue-900/80 sm:text-lg">
            I build scalable and responsive products, from business websites and CRM
            tools to modern web applications with clean UI and strong performance.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/about"
              className="rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold text-blue-900 transition hover:border-soft-blue"
            >
              About Me
            </Link>
            <Link
              href="/projects"
              className="rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold text-blue-900 transition hover:border-soft-blue"
            >
              Projects
            </Link>
            <Link
              href="/stack"
              className="rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold text-blue-900 transition hover:border-soft-blue"
            >
              Tech Stack
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold text-blue-900 transition hover:border-soft-blue"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="justify-self-center overflow-hidden rounded-3xl bg-white p-3 shadow-[0_22px_55px_rgba(29,78,216,0.2)] ring-1 ring-blue-100">
          <Image
            src="/tiavina-profile-v2.png"
            alt="Portrait of Santatriniaina Tiavina Liantsoa"
            width={380}
            height={500}
            className="h-auto w-[240px] rounded-2xl object-cover sm:w-[290px]"
            priority
          />
        </div>
      </section>
      <ProjectCarousel />
      <CursusTree />
      <GithubContributionGraph />
      <SendMessageForm />
      <ClientTestimonials />
    </div>
  );
}
