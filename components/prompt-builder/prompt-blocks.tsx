"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  User,
  FileText,
  Target,
  AlertTriangle,
  Layout,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import type { PromptBlock } from "@/types";

interface PromptBlocksEditorProps {
  blocks: PromptBlock[];
  onUpdate: (blockId: string, content: string) => void;
  readOnly?: boolean;
}

const blockIcons: Record<string, typeof User> = {
  role: User,
  context: FileText,
  objective: Target,
  constraints: AlertTriangle,
  format: Layout,
  tone: MessageSquare,
  examples: BookOpen,
};

const blockLabels: Record<string, string> = {
  role: "Rôle",
  context: "Contexte",
  objective: "Objectif",
  constraints: "Contraintes",
  format: "Format attendu",
  tone: "Ton / Style",
  examples: "Exemples",
};

export function PromptBlocksEditor({
  blocks,
  onUpdate,
  readOnly = false,
}: PromptBlocksEditorProps) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(
    new Set(blocks.map((b) => b.id))
  );

  const toggleBlock = (blockId: string) => {
    setExpandedBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(blockId)) {
        next.delete(blockId);
      } else {
        next.add(blockId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {blocks.map((block) => {
        const Icon = blockIcons[block.type] || FileText;
        const isExpanded = expandedBlocks.has(block.id);

        return (
          <Card
            key={block.id}
            className={cn(
              "transition-all duration-200",
              isExpanded ? "shadow-md" : "shadow-sm"
            )}
          >
            <CardHeader
              className="cursor-pointer py-4"
              onClick={() => toggleBlock(block.id)}
            >
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50">
                    <Icon className="h-4 w-4 text-violet-600" />
                  </div>
                  <div>
                    <span>{blockLabels[block.type] || block.label}</span>
                    <p className="text-xs text-zinc-500 font-normal">
                      Cliquez pour {isExpanded ? "réduire" : "développer"}
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-zinc-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-zinc-400" />
                )}
              </CardTitle>
            </CardHeader>
            {isExpanded && (
              <CardContent className="pt-0">
                <Textarea
                  value={block.content}
                  onChange={(e) => onUpdate(block.id, e.target.value)}
                  placeholder={`Entrez le contenu pour "${blockLabels[block.type]}"...`}
                  disabled={readOnly}
                  className="min-h-[120px] resize-none"
                />
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}