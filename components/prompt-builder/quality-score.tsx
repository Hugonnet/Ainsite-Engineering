"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Gauge, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";
import type { PromptQualityScore } from "@/types";

interface QualityScoreProps {
  score: PromptQualityScore;
  suggestions: string[];
}

export function QualityScore({ score, suggestions }: QualityScoreProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-green-500";
    if (value >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreGradient = (value: number) => {
    if (value >= 80) return "from-green-500 to-emerald-500";
    if (value >= 60) return "from-yellow-500 to-amber-500";
    return "from-red-500 to-rose-500";
  };

  const categories = [
    { label: "Clarté", value: score.clarity },
    { label: "Spécificité", value: score.specificity },
    { label: "Contexte", value: score.context },
    { label: "Contraintes", value: score.constraints },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Score de qualité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="h-32 w-32 -rotate-90 transform">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-zinc-200 dark:text-zinc-700"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(score.overall / 100) * 352} 352`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGradient" className={getScoreGradient(score.overall)}>
                  <stop offset="0%" className="text-violet-500" stopColor="currentColor" />
                  <stop offset="100%" className="text-indigo-500" stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className={cn("text-4xl font-bold", getScoreColor(score.overall))}>
                  {score.overall}
                </span>
                <span className="text-zinc-400 text-sm block">/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-600 dark:text-zinc-400">{category.label}</span>
                <span className={cn("font-medium", getScoreColor(category.value))}>
                  {category.value}%
                </span>
              </div>
              <Progress value={category.value} className="h-2" />
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h4 className="flex items-center gap-2 font-medium mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Suggestions d'amélioration
            </h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Good prompt indicator */}
        {score.overall >= 80 && (
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-300">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Excellent prompt ! Prêt à l'emploi.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}