"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  FileText,
  Image,
  Video,
  Code,
  ArrowRight,
  Sparkles,
  Wand2,
  Layers,
} from "lucide-react";

const promptTypes = [
  {
    id: "webapp",
    title: "Application Web",
    description: "Générez des prompts pour concevoir des applications web complètes : architecture, UX/UI, fonctionnalités.",
    icon: Code,
    gradient: "from-violet-500 to-purple-600",
    featured: true,
    badge: "Recommandé",
  },
  {
    id: "text",
    title: "Texte",
    description: "Articles SEO, copywriting, emails, scripts vidéos et contenus marketing optimisés.",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "image",
    title: "Image",
    description: "Prompts pour Midjourney, DALL·E et autres générateurs d'images IA.",
    icon: Image,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "video",
    title: "Vidéo",
    description: "Prompts pour créer des vidéos engageantes avec les outils de génération vidéo.",
    icon: Video,
    gradient: "from-orange-500 to-amber-600",
  },
];

export function PromptTypeSelector() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Choisissez votre type de prompt
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Sélectionnez le type de contenu que vous souhaitez créer. Notre assistant intelligent
            vous guidera à chaque étape pour obtenir un prompt parfaitement adapté.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promptTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link key={type.id} href={`/generate/${type.id}`}>
                <Card
                  className={cn(
                    "group relative overflow-hidden transition-all duration-300 cursor-pointer h-full",
                    "hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1",
                    type.featured && "ring-2 ring-violet-500/50"
                  )}
                >
                  {type.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-500 to-indigo-600 text-white">
                        <Sparkles className="h-3 w-3" />
                        {type.badge}
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <div
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white mb-4",
                        type.gradient
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {type.title}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}