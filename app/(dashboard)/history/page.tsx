"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePromptStore } from "@/store/prompt-store";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Image,
  Video,
  Code,
  Clock,
  Star,
  Trash2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

export default function HistoryPage() {
  const { history, toggleFavorite, removeFromHistory } = usePromptStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "text":
        return "from-blue-500 to-cyan-600";
      case "image":
        return "from-emerald-500 to-teal-600";
      case "video":
        return "from-orange-500 to-amber-600";
      case "webapp":
        return "from-violet-500 to-purple-600";
      default:
        return "from-zinc-500 to-zinc-600";
    }
  };

  const favorites = history.filter((h) => h.favorite);
  const allPrompts = history;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Historique</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Tous vos prompts générés
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="gap-2">
            <Clock className="h-4 w-4" />
            Tous ({allPrompts.length})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="gap-2">
            <Star className="h-4 w-4" />
            Favoris ({favorites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {allPrompts.length > 0 ? (
            <div className="space-y-4">
              {allPrompts.map((entry) => (
                <Card key={entry.id} id={entry.id} className="scroll-mt-20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${getTypeColor(entry.prompt.type)}`}>
                        {getPromptTypeIcon(entry.prompt.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium capitalize">{entry.prompt.type}</span>
                          <span className="text-xs text-zinc-400">
                            Score: {entry.prompt.score}/100
                          </span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-2">
                          {entry.prompt.rawContent.slice(0, 200)}...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-zinc-400">
                          <span>{formatDate(new Date(entry.createdAt))}</span>
                          <span>{entry.prompt.blocks.length} blocs</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(entry.id)}
                        >
                          {entry.favorite ? (
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromHistory(entry.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
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
                <Clock className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                <p className="text-zinc-500 mb-4">Aucun prompt dans l'historique</p>
                <Link href="/generate">
                  <Button>Créer un prompt</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites">
          {favorites.length > 0 ? (
            <div className="space-y-4">
              {favorites.map((entry) => (
                <Card key={entry.id} className="border-amber-200 dark:border-amber-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${getTypeColor(entry.prompt.type)}`}>
                        {getPromptTypeIcon(entry.prompt.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium capitalize">{entry.prompt.type}</span>
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {entry.prompt.rawContent.slice(0, 200)}...
                        </p>
                      </div>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Star className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                <p className="text-zinc-500 mb-4">Aucun favori pour le moment</p>
                <p className="text-sm text-zinc-400">
                  Cliquez sur l'étoile pour ajouter des prompts à vos favoris
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}