"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePromptStore } from "@/store/prompt-store";
import { PromptBlocksEditor, PromptPreview, QualityScore } from "@/components/prompt-builder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAdvancedScore, getContextualSuggestions } from "@/lib/prompt-engine";
import {
  ArrowLeft,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Settings2,
  Zap,
  Expand,
  Wand2,
} from "lucide-react";

type ImproveAction = 'improve' | 'simplify' | 'expand' | 'optimize';

export default function ResultPage() {
  const router = useRouter();
  const { currentPrompt, updatePromptBlock, setGeneratedPrompt } = usePromptStore();

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "edit">("preview");
  const [isImproving, setIsImproving] = useState(false);
  const [improveAction, setImproveAction] = useState<ImproveAction | null>(null);
  const [showImproveOptions, setShowImproveOptions] = useState(false);

  if (!currentPrompt) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 text-center">
        <Card>
          <CardContent className="py-12">
            <p className="text-zinc-500 mb-4">Aucun prompt généré.</p>
            <Button onClick={() => router.push("/generate")}>
              Créer un nouveau prompt
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentPrompt.rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentPrompt.rawContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prompt-${currentPrompt.type}-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImprove = async (action: ImproveAction) => {
    if (!currentPrompt) return;

    setIsImproving(true);
    setImproveAction(action);
    setShowImproveOptions(false);

    try {
      const response = await fetch('/api/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentPrompt.rawContent,
          action,
        }),
      });

      const data = await response.json();

      if (data.improved) {
        // Met à jour le prompt avec la version améliorée
        const updatedBlocks = currentPrompt.blocks.map((block, index) => ({
          ...block,
          content: extractBlockContent(data.improved, block.type) || block.content,
        }));

        setGeneratedPrompt({
          ...currentPrompt,
          blocks: updatedBlocks,
          rawContent: data.improved,
        });
      }
    } catch (error) {
      console.error('Erreur amélioration:', error);
    } finally {
      setIsImproving(false);
      setImproveAction(null);
    }
  };

  const extractBlockContent = (content: string, blockType: string): string | null => {
    const regex = new RegExp(`\\[${blockType.toUpperCase()}\\]\\n([\\s\\S]*?)(?=\\n\\[|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  };

  const improveOptions = [
    {
      action: 'improve' as ImproveAction,
      label: 'Améliorer',
      description: 'Ajoute des détails et clarifie les instructions',
      icon: Sparkles,
    },
    {
      action: 'simplify' as ImproveAction,
      label: 'Simplifier',
      description: 'Rend le prompt plus concis',
      icon: RefreshCw,
    },
    {
      action: 'expand' as ImproveAction,
      label: 'Étendre',
      description: 'Enrichit avec plus de contexte',
      icon: Expand,
    },
    {
      action: 'optimize' as ImproveAction,
      label: 'Optimiser',
      description: 'Structure pour les LLM',
      icon: Zap,
    },
  ];

  const qualityScore = calculateAdvancedScore(currentPrompt.blocks, currentPrompt.type);
  const suggestions = getContextualSuggestions(currentPrompt.blocks, currentPrompt.type);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/generate")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Votre prompt</h1>
            <p className="text-zinc-500">
              Type : {currentPrompt.type.charAt(0).toUpperCase() + currentPrompt.type.slice(1)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "preview" | "edit")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Aperçu
              </TabsTrigger>
              <TabsTrigger value="edit" className="gap-2">
                <Settings2 className="h-4 w-4" />
                Éditer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <PromptPreview
                blocks={currentPrompt.blocks}
                rawContent={currentPrompt.rawContent}
              />
            </TabsContent>

            <TabsContent value="edit" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Modifier les blocs</CardTitle>
                </CardHeader>
                <CardContent>
                  <PromptBlocksEditor
                    blocks={currentPrompt.blocks}
                    onUpdate={(blockId, content) => updatePromptBlock(blockId, content)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <Card className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30">
            <CardContent className="py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Améliorer ce prompt</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Utilisez l'IA pour optimiser ou adapter votre prompt
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  onClick={() => setShowImproveOptions(!showImproveOptions)}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Options
                </Button>
              </div>

              {showImproveOptions && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {improveOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Button
                        key={option.action}
                        variant="outline"
                        size="sm"
                        className="h-auto py-3 flex flex-col items-start"
                        onClick={() => handleImprove(option.action)}
                        disabled={isImproving}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium">{option.label}</span>
                        </div>
                        <span className="text-xs text-zinc-500 text-left">
                          {option.description}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              )}

              {isImproving && (
                <div className="mt-4 flex items-center gap-2 text-violet-600">
                  <div className="animate-spin">
                    <RefreshCw className="h-4 w-4" />
                  </div>
                  <span className="text-sm">
                    {improveAction === 'improve' && 'Amélioration en cours...'}
                    {improveAction === 'simplify' && 'Simplification en cours...'}
                    {improveAction === 'expand' && 'Extension en cours...'}
                    {improveAction === 'optimize' && 'Optimisation en cours...'}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quality Score */}
          <QualityScore score={qualityScore} suggestions={suggestions} />

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Type</span>
                <span className="font-medium">{currentPrompt.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Blocs</span>
                <span className="font-medium">{currentPrompt.blocks.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Caractères</span>
                <span className="font-medium">{currentPrompt.rawContent.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Créé le</span>
                <span className="font-medium">
                  {new Date(currentPrompt.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Save to History */}
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              usePromptStore.getState().addToHistory(currentPrompt);
              router.push("/history");
            }}
          >
            Sauvegarder dans l'historique
          </Button>
        </div>
      </div>
    </div>
  );
}