"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Wand2, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Génération intelligente",
    description:
      "Notre moteur de composition modulaire structure automatiquement vos prompts avec les blocs essentiels : rôle, contexte, objectif, contraintes, format et exemples.",
  },
  {
    icon: Layers,
    title: "Multi-format",
    description:
      "Texte SEO, images Midjourney, vidéos, applications web - un seul outil pour tous vos besoins de prompting.",
  },
  {
    icon: Sparkles,
    title: "Score de qualité",
    description:
      "Évaluez instantanément la qualité de vos prompts avec notre système de scoring intelligent et recevez des suggestions d'amélioration.",
  },
  {
    icon: Zap,
    title: "Mode avancé",
    description:
      "Pour les experts, éditez librement chaque bloc de votre prompt et ajoutez des variables personnalisées.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            PromptForge combine la simplicité d'un wizard intuitif avec la puissance
            d'un moteur de génération avancé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-0 shadow-lg bg-white dark:bg-zinc-950"
              >
                <CardHeader>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-3">
                    <Icon className="h-5 w-5 text-violet-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}