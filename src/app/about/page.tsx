import { getServerLocale } from "@/lib/server-locale";

export default async function AboutPage() {
  const locale = await getServerLocale();

  return (
    <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold text-blue-950">
        {locale === "fr" ? "A propos de moi" : "About Me"}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-900/80">
        {locale === "fr"
          ? "Je suis Santatriniaina Tiavina Liantsoa, developpeur full-stack base a Antananarivo, Madagascar. Je travaille avec PHP/Laravel, Node.js, React.js et Next.js pour livrer des plateformes web robustes pour des besoins metier reels."
          : "I am Santatriniaina Tiavina Liantsoa, a full-stack developer based in Antananarivo, Madagascar. I work across PHP/Laravel, Node.js, React.js, and Next.js to deliver robust web platforms for real business needs."}
      </p>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-900/80">
        {locale === "fr"
          ? "Mon experience recente inclut le developpement de sites web et CRM pour ESCM Business School, l'implementation de WordPress et la mise en place d'un ERP scolaire avec Gibbon. Je termine actuellement une Licence en Informatique et Management a l'ESPIC."
          : "My recent experience includes website and CRM development for ESCM Business School, WordPress implementation, and school ERP setup using Gibbon. I am currently completing a Licence in Informatique et Management at ESPIC."}
      </p>
    </section>
  );
}
