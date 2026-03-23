// PromptForge - Types

// Types de prompt
export type PromptType = 'text' | 'image' | 'video' | 'webapp';

// Blocs de prompt
export interface PromptBlock {
  id: string;
  type: 'role' | 'context' | 'objective' | 'constraints' | 'format' | 'tone' | 'examples';
  label: string;
  content: string;
  order: number;
}

// Configuration du wizard pour chaque type de prompt
export interface WizardStep {
  id: string;
  title: string;
  description: string;
  fields: WizardField[];
}

export interface WizardField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'slider';
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string | string[] | number;
  validation?: (value: unknown) => string | null;
}

// État du wizard
export interface WizardState {
  currentStep: number;
  totalSteps: number;
  data: any;
  isComplete: boolean;
}

// Prompt généré
export interface GeneratedPrompt {
  id: string;
  type: PromptType;
  blocks: PromptBlock[];
  rawContent: string;
  score: number;
  suggestions: string[];
  createdAt: Date;
}

// Configuration pour app web
export interface WebAppConfig {
  appType: 'saas' | 'mvp' | 'internal' | 'ecommerce' | 'portfolio' | 'custom';
  stack: ('nextjs' | 'astro' | 'react' | 'vue' | 'angular')[];
  style: 'dashboard' | 'minimalist' | 'corporate' | 'creative' | 'dark';
  features: string[];
  pages: string[];
  integrations: string[];
}

// Template de prompt
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  type: PromptType;
  category: string;
  template: string;
  variables: string[];
}

// Historique
export interface HistoryEntry {
  id: string;
  prompt: GeneratedPrompt;
  favorite: boolean;
  createdAt: Date;
}

// Utilisateur
export interface User {
  id: string;
  email: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  defaultTone: string;
  defaultLanguage: string;
  favoriteTemplates: string[];
}

// Qualité du prompt
export interface PromptQualityScore {
  overall: number;
  clarity: number;
  specificity: number;
  context: number;
  constraints: number;
}

// Types pour la génération de texte
export interface TextPromptConfig {
  contentType: 'article' | 'email' | 'copywriting' | 'script' | 'social' | 'seo';
  tone: 'professional' | 'casual' | 'creative' | 'technical' | 'persuasive';
  language: string;
  length: 'short' | 'medium' | 'long' | 'custom';
  targetAudience: string;
  keywords: string[];
}

// Types pour la génération d'images
export interface ImagePromptConfig {
  style: 'realistic' | 'artistic' | 'abstract' | 'minimalist' | 'cinematic';
  mood: string;
  colors: string[];
  composition: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | 'custom';
  details: string[];
}

// Types pour la génération vidéo
export interface VideoPromptConfig {
  style: 'cinematic' | 'animation' | 'documentary' | 'social' | 'commercial';
  duration: 'short' | 'medium' | 'long';
  mood: string;
  transitions: string[];
  audio: 'music' | 'voiceover' | 'ambient' | 'none';
  elements: string[];
}