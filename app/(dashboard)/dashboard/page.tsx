"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePromptStore } from "@/store/prompt-store";
import {
  Sparkles,
  FileText,
  Image,
  Video,
  Code,
  Clock,
  TrendingUp,
  Star,
} from "lucide-react";

export default function DashboardPage() {
  const { history } = usePromptStore();

  const stats = [
    { label: "Prompts générés", value: history.length.toString(), icon: Sparkles, color: "text-violet-500" },
    { label: "Favoris", value: history.filter((h) => h.favorite).length.toString(), icon: Star, color: "text-amber-500" },
    {
      label: "Ce mois", value: history.filter((h) => {
        const thisMonth = new Date().getMonth();
        return new Date(h.createdAt).getMonth() === thisMonth;
      }).length.toString(), icon: TrendingUp, color: "text-green-500"
    },
  ];

  const recentPrompts = history.slice(0, 5);

  const getPromptTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "webapp":
        return <Code className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Bienvenue sur votre tableau de bord Ainsite Engineering</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Créer un nouveau prompt</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/generate/webapp">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white mb-3">
                  <Code className="h-6 w-6" />
                </div>
                <p className="font-medium">App Web</p>
                <p className="text-xs text-zinc-500">Architecture complète</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/generate/text">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white mb-3">
                  <FileText className="h-6 w-6" />
                </div>
                <p className="font-medium">Texte</p>
                <p className="text-xs text-zinc-500">Articles & emails</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/generate/image">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-3">
                  <Image className="h-6 w-6" />
                </div>
                <p className="font-medium">Image</p>
                <p className="text-xs text-zinc-500">Midjourney & DALL·E</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/generate/video">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white mb-3">
                  <Video className="h-6 w-6" />
                </div>
                <p className="font-medium">Vidéo</p>
                <p className="text-xs text-zinc-500">Runway & Pika</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Prompts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Prompts récents</h2>
          <Link href="/history">
            <Button variant="ghost" size="sm">
              Voir tout
            </Button>
          </Link>
        </div>

        {recentPrompts.length > 0 ? (
          <div className="space-y-3">
            {recentPrompts.map((entry) => (
              <Link key={entry.id} href={`/history#${entry.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                        {getPromptTypeIcon(entry.prompt.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium capitalize">{entry.prompt.type}</p>
                          {entry.favorite && (
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          )}
                        </div>
                        <p className="text-sm text-zinc-500 truncate">
                          {entry.prompt.rawContent.slice(0, 100)}...
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <Clock className="h-3 w-3" />
                        {new Date(entry.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Sparkles className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500 mb-4">Aucun prompt généré pour le moment</p>
              <Link href="/generate">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                  Créer votre premier prompt
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}