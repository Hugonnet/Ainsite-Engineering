"use client";

import { useThemeContext } from "@/components/layout/theme-provider";

export function useTheme() {
  const context = useThemeContext();
  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
    mounted: context.mounted
  };
}
