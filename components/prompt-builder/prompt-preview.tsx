"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copyToClipboard, downloadAsFile } from "@/lib/utils";
import {
  Copy,
  Download,
  Check,
  Eye,
  Code2,
  FileText,
} from "lucide-react";
import type { PromptBlock } from "@/types";

interface PromptPreviewProps {
  blocks: PromptBlock[];
  rawContent: string;
}

export function PromptPreview({ blocks, rawContent }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `prompt-${new Date().toISOString().split("T")[0]}.txt`;
    downloadAsFile(rawContent, filename);
  };

  const formattedBlocks = blocks
    .sort((a, b) => a.order - b.order)
    .map((block) => `[${block.label.toUpperCase()}]\n${block.content}`)
    .join("\n\n");

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Aperçu du prompt
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copier
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="formatted" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="formatted" className="gap-2">
              <Eye className="h-4 w-4" />
              Formaté
            </TabsTrigger>
            <TabsTrigger value="raw" className="gap-2">
              <Code2 className="h-4 w-4" />
              Brut
            </TabsTrigger>
          </TabsList>
          <TabsContent value="formatted">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-[500px] overflow-y-auto">
              {formattedBlocks}
            </div>
          </TabsContent>
          <TabsContent value="raw">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-[500px] overflow-y-auto">
              {rawContent}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}