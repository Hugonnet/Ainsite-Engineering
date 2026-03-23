import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GeneratedPrompt, HistoryEntry, PromptType, PromptBlock } from '@/types';
import { generateId } from '@/lib/utils';

interface PromptStore {
  // État du wizard
  currentStep: number;
  wizardData: any;
  promptType: PromptType | null;

  // Prompt généré
  currentPrompt: GeneratedPrompt | null;

  // Historique
  history: HistoryEntry[];

  // Actions
  setPromptType: (type: PromptType) => void;
  setWizardData: (data: any) => void;
  updateWizardData: (key: string, value: unknown) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setGeneratedPrompt: (prompt: GeneratedPrompt) => void;
  updatePromptBlock: (blockId: string, content: string) => void;

  addToHistory: (prompt: GeneratedPrompt) => void;
  toggleFavorite: (id: string) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;

  reset: () => void;
}

const initialState = {
  currentStep: 0,
  wizardData: {},
  promptType: null,
  currentPrompt: null,
  history: [],
};

export const usePromptStore = create<PromptStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPromptType: (type) => set({ promptType: type, currentStep: 0, wizardData: {} }),

      setWizardData: (data) => set({ wizardData: data }),

      updateWizardData: (key, value) => set((state) => ({
        wizardData: { ...state.wizardData, [key]: value },
      })),

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

      setGeneratedPrompt: (prompt) => set({ currentPrompt: prompt }),

      updatePromptBlock: (blockId, content) => set((state) => {
        if (!state.currentPrompt) return state;
        const updatedBlocks = state.currentPrompt.blocks.map((block) =>
          block.id === blockId ? { ...block, content } : block
        );
        return {
          currentPrompt: {
            ...state.currentPrompt,
            blocks: updatedBlocks,
            rawContent: updatedBlocks.map((b) => `[${b.label.toUpperCase()}]\n${b.content}`).join('\n\n'),
          },
        };
      }),

      addToHistory: (prompt) => set((state) => ({
        history: [
          {
            id: generateId(),
            prompt,
            favorite: false,
            createdAt: new Date(),
          },
          ...state.history,
        ].slice(0, 100), // Garder les 100 derniers
      })),

      toggleFavorite: (id) => set((state) => ({
        history: state.history.map((entry) =>
          entry.id === id ? { ...entry, favorite: !entry.favorite } : entry
        ),
      })),

      removeFromHistory: (id) => set((state) => ({
        history: state.history.filter((entry) => entry.id !== id),
      })),

      clearHistory: () => set({ history: [] }),

      reset: () => set(initialState),
    }),
    {
      name: 'promptforge-storage',
      partialize: (state) => ({
        history: state.history,
      }),
    }
  )
);