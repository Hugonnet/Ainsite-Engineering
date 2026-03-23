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
  Zap,
  Layers,
  Target,
} from "lucide-react";

const promptTypes = [
  {
    id: "webapp",
    title: "Application Web",
    description: "Architecture complète, stack technique, composants UI/UX et roadmap de développement.",
    icon: Code,
    gradient: "from-violet-500 to-purple-600",
    featured: true,
    badge: "Recommandé",
    features: ["Architecture technique", "Stack recommandée", "Structure des pages", "Composants UI/UX"],
  },
  {
    id: "text",
    title: "Texte",
    description: "Articles SEO, copywriting, emails, scripts vidéos et contenus marketing optimisés.",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-600",
    features: ["Articles SEO", "Copywriting", "Emails", "Scripts"],
  },
  {
    id: "image",
    title: "Image",
    description: "Prompts pour Midjourney, DALL·E et autres générateurs d'images IA.",
    icon: Image,
    gradient: "from-emerald-500 to-teal-600",
    features: ["Midjourney", "DALL·E", "Stable Diffusion", "Art génératif"],
  },
  {
    id: "video",
    title: "Vidéo",
    description: "Prompts pour créer des vidéos engageantes avec les outils de génération vidéo.",
    icon: Video,
    gradient: "from-orange-500 to-amber-600",
    features: ["Runway", "Pika", "Sora", "Prompts vidéo"],
  },
];

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Choisissez votre type de prompt
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Sélectionnez le type de contenu que vous souhaitez créer. Notre assistant intelligent
            vous guidera à chaque étape pour obtenir un prompt parfaitement adapté.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {promptTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link key={type.id} href={`/generate/${type.id}`}>
                <Card
                  className={cn(
                    "group relative overflow-hidden transition-all duration-300 cursor-pointer h-full",
                    "hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1",
                    type.featured && "ring-2 ring-violet-500/50 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/50 dark:to-zinc-950"
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
                    <CardTitle className="flex items-center justify-between text-lg">
                      {type.title}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {type.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        >
                          <Zap className="h-3 w-3" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50 mb-3">
                <Target className="h-5 w-5 text-violet-600" />
              </div>
              <CardTitle className="text-base">Guidé étape par étape</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Un wizard intuitif vous accompagne pour ne rien oublier.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 mb-3">
                <Layers className="h-5 w-5 text-indigo-600" />
              </div>
              <CardTitle className="text-base">Structure automatique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Rôle, contexte, objectif, contraintes... tout est structuré pour vous.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/50 mb-3">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-base">Score de qualité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Évaluez instantanément la qualité de vos prompts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}