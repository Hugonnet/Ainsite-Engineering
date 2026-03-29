import Link from "next/link";
import { HeroSection } from "@/components/home/hero-section";
import { PromptTypeSelector } from "@/components/home/prompt-type-selector";
import { FeaturesSection } from "@/components/home/features-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromptTypeSelector />
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-rose-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Prêt à créer des prompts performants ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto font-medium">
            Rejoignez des milliers de créateurs et développeurs qui utilisent Ainsite Engineering
            pour obtenir des résultats exceptionnels avec l'IA.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl bg-white text-blue-600 px-8 py-3 text-lg font-bold hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            Commencer gratuitement
          </Link>
        </div>
      </section>

    </>
  );
}