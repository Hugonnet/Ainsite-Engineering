import type { PromptBlock, PromptQualityScore } from '@/types';

// Scoring avancé avec analyse de qualité
export function calculateAdvancedScore(
  blocks: PromptBlock[],
  promptType: string
): PromptQualityScore {
  const scores = {
    overall: 0,
    clarity: 0,
    specificity: 0,
    context: 0,
    constraints: 0,
  };

  // Analyse de chaque bloc
  const blockAnalysis = blocks.map((block) => ({
    type: block.type,
    length: block.content.length,
    wordCount: block.content.split(/\s+/).filter(Boolean).length,
    hasStructure: block.content.includes('\n') || block.content.includes(':'),
    hasNumbers: /\d+/.test(block.content),
    hasExamples: block.content.toLowerCase().includes('exemple') || block.content.toLowerCase().includes('example'),
  }));

  // Score de clarté (basé sur le rôle)
  const roleBlock = blockAnalysis.find((b) => b.type === 'role');
  if (roleBlock) {
    scores.clarity = Math.min(100, roleBlock.wordCount >= 5 ? 80 + (roleBlock.wordCount - 5) * 4 : roleBlock.wordCount * 16);
  }

  // Score de spécificité (basé sur l'objectif)
  const objectiveBlock = blockAnalysis.find((b) => b.type === 'objective');
  if (objectiveBlock) {
    const specificityScore = objectiveBlock.wordCount >= 10 ? 70 : objectiveBlock.wordCount * 7;
    scores.specificity = Math.min(100, specificityScore + (objectiveBlock.hasNumbers ? 15 : 0));
  }

  // Score de contexte
  const contextBlock = blockAnalysis.find((b) => b.type === 'context');
  if (contextBlock) {
    scores.context = Math.min(100, contextBlock.wordCount >= 15 ? 85 : contextBlock.wordCount * 5.5);
  }

  // Score des contraintes
  const constraintsBlock = blockAnalysis.find((b) => b.type === 'constraints');
  if (constraintsBlock) {
    const constraintsScore = constraintsBlock.hasStructure ? 80 : constraintsBlock.wordCount * 3;
    scores.constraints = Math.min(100, constraintsScore);
  }

  // Score global (moyenne pondérée)
  const weights = {
    clarity: 0.25,
    specificity: 0.3,
    context: 0.25,
    constraints: 0.2,
  };

  scores.overall = Math.round(
    scores.clarity * weights.clarity +
    scores.specificity * weights.specificity +
    scores.context * weights.context +
    scores.constraints * weights.constraints
  );

  return scores;
}

// Analyse de la lisibilité
export function analyzeReadability(content: string): {
  score: number;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let score = 100;

  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const words = content.split(/\s+/).filter(Boolean);
  const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);

  if (avgWordsPerSentence > 25) {
    score -= 10;
    suggestions.push('Raccourcissez certaines phrases pour améliorer la lisibilité');
  }

  const paragraphs = content.split('\n\n').filter(Boolean);
  if (paragraphs.length > 0) {
    const avgParagraphLength = paragraphs.reduce((sum, p) => sum + p.length, 0) / paragraphs.length;
    if (avgParagraphLength > 500) {
      score -= 10;
      suggestions.push('Divisez les longs paragraphes pour une meilleure lisibilité');
    }
  }

  return { score: Math.max(0, score), suggestions };
}

// Analyse de la complétude
export function analyzeCompleteness(
  blocks: PromptBlock[],
  requiredTypes: string[]
): {
  score: number;
  missing: string[];
} {
  const presentTypes = new Set(blocks.filter((b) => b.content.trim().length > 0).map((b) => b.type));
  const missing = requiredTypes.filter((t) => !presentTypes.has(t as PromptBlock['type']));

  const score = Math.round(((requiredTypes.length - missing.length) / requiredTypes.length) * 100);

  return { score, missing };
}

// Types de blocs requis par type de prompt
export const requiredBlocksByType: Record<string, string[]> = {
  text: ['role', 'context', 'objective', 'format'],
  image: ['role', 'context', 'objective', 'constraints'],
  video: ['role', 'context', 'objective', 'format'],
  webapp: ['role', 'context', 'objective', 'constraints', 'format'],
};

// Suggestions contextuelles
export function getContextualSuggestions(
  blocks: PromptBlock[],
  promptType: string
): string[] {
  const suggestions: string[] = [];

  // Vérifier la présence de chaque type de bloc
  const presentBlocks = new Map(blocks.map((b) => [b.type, b.content]));

  // Rôle
  if (!presentBlocks.has('role') || presentBlocks.get('role')!.length < 15) {
    suggestions.push('Définissez un rôle expert précis (ex: "Tu es un architecte logiciel senior...")');
  }

  // Contexte
  if (!presentBlocks.has('context') || presentBlocks.get('context')!.length < 30) {
    suggestions.push('Ajoutez du contexte détaillé sur votre situation et vos besoins');
  }

  // Objectif
  const objective = presentBlocks.get('objective') || '';
  if (objective.length < 20) {
    suggestions.push('Formulez un objectif clair et mesurable');
  } else if (!objective.includes('pour') && !objective.includes('afin de')) {
    suggestions.push('Précisez le "pourquoi" de votre objectif');
  }

  // Contraintes
  if (!presentBlocks.has('constraints')) {
    suggestions.push('Ajoutez des contraintes pour limiter le scope et obtenir des résultats plus précis');
  }

  // Exemples
  if (!presentBlocks.has('examples') && promptType === 'text') {
    suggestions.push('Incluez un ou deux exemples pour guider le style de sortie');
  }

  // Spécifique au type
  switch (promptType) {
    case 'webapp':
      if (!objective.includes('architecture') && !objective.includes('structure')) {
        suggestions.push('Pour les apps web, demandez une architecture technique détaillée');
      }
      break;
    case 'image':
      const constraints = presentBlocks.get('constraints') || '';
      if (!constraints.includes('--ar') && !constraints.includes('ratio')) {
        suggestions.push('Spécifiez le ratio d\'aspect (ex: --ar 16:9)');
      }
      break;
  }

  return suggestions;
}