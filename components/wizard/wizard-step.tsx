"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WizardStepProps {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function WizardStep({
  children,
  title,
  description,
  className,
}: WizardStepProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}