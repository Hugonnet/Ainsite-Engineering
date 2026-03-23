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
      <section className="py-20 bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Prêt à créer des prompts performants ?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de créateurs et développeurs qui utilisent PromptForge
            pour obtenir des résultats exceptionnels avec l'IA.
          </p>
          <a
            href="/generate"
            className="inline-flex items-center justify-center rounded-lg bg-white text-violet-600 px-8 py-3 text-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Commencer gratuitement
          </a>
        </div>
      </section>
    </>
  );
}