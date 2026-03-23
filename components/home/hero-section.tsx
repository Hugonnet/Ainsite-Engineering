"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-zinc-950 dark:via-zinc-950 dark:to-blue-950/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-rose-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-400/20 to-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-300 mb-6 border border-blue-100 dark:border-blue-800">
            <Sparkles className="h-4 w-4" />
            Nouveau : Module App Web disponible
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Créez des prompts{" "}
            <span className="bg-gradient-to-r from-blue-500 to-rose-400 bg-clip-text text-transparent">
              optimisés
            </span>{" "}
            pour l'IA
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ainsite-Engineering guide l'utilisateur étape par étape pour construire des prompts
            ultra performants. Éliminez la complexité et obtenez des résultats exceptionnels.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/generate">
              <Button size="xl" className="bg-gradient-to-r from-blue-500 to-rose-400 hover:from-blue-600 hover:to-rose-500 text-white border-0 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                Créer un prompt
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" size="xl">
                Voir les templates
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Prompts générés", value: "50K+" },
              { label: "Templates", value: "100+" },
              { label: "Utilisateurs", value: "10K+" },
              { label: "Satisfaction", value: "98%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-rose-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}