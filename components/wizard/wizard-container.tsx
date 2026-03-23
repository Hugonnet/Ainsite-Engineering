"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface WizardContainerProps {
  children: ReactNode;
  title: string;
  description?: string;
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export function WizardContainer({
  children,
  title,
  description,
  currentStep,
  totalSteps,
  stepLabels,
}: WizardContainerProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
        )}
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {stepLabels ? (
            stepLabels.map((label, index) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col items-center",
                  index <= currentStep ? "text-violet-600" : "text-zinc-400"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    index < currentStep
                      ? "bg-violet-600 text-white"
                      : index === currentStep
                      ? "bg-violet-600 text-white ring-4 ring-violet-100"
                      : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500"
                  )}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <span className="text-xs mt-1 hidden sm:block">{label}</span>
              </div>
            ))
          ) : (
            <span className="text-sm text-zinc-500">
              Étape {currentStep + 1} sur {totalSteps}
            </span>
          )}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <Card className="p-6 sm:p-8 shadow-lg border-0">
        {children}
      </Card>
    </div>
  );
}