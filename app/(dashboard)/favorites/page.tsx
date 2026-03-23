"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePromptStore } from "@/store/prompt-store";
import { formatDate } from "@/lib/utils";
import { Star, Copy, Check, Heart } from "lucide-react";

export default function FavoritesPage() {
  const { history, toggleFavorite, removeFromHistory } = usePromptStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const favorites = history.filter((h) => h.favorite);

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold">Favoris</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Vos prompts préférés
            </p>
          </div>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid gap-4">
          {favorites.map((entry) => (
            <Card key={entry.id} className="border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-full capitalize">
                        {entry.prompt.type}
                      </span>
                      <span className="text-sm text-zinc-500">
                        Score: {entry.prompt.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      {entry.prompt.rawContent.slice(0, 300)}...
                    </p>
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span>{formatDate(new Date(entry.createdAt))}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(entry.id)}
                    >
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(entry.prompt.rawContent, entry.id)}
                    >
                      {copiedId === entry.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 mb-4">Aucun favori pour le moment</p>
            <p className="text-sm text-zinc-400 mb-6">
              Ajoutez des prompts à vos favoris en cliquant sur l'icône étoile
            </p>
            <Link href="/history">
              <Button>Voir l'historique</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}