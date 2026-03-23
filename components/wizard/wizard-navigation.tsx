"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface WizardNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  isLastStep?: boolean;
  isFirstStep?: boolean;
  isSubmitting?: boolean;
  nextLabel?: string;
  submitLabel?: string;
}

export function WizardNavigation({
  onBack,
  onNext,
  onSubmit,
  canGoBack = true,
  canGoNext = true,
  isLastStep = false,
  isFirstStep = false,
  isSubmitting = false,
  nextLabel = "Suivant",
  submitLabel = "Générer le prompt",
}: WizardNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep || !canGoBack}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Retour
      </Button>

      {isLastStep ? (
        <Button
          onClick={onSubmit}
          disabled={!canGoNext || isSubmitting}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Génération...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="gap-2"
        >
          {nextLabel}
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}