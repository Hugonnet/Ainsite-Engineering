import type { PromptBlock, GeneratedPrompt, PromptType, WebAppConfig, TextPromptConfig, ImagePromptConfig, VideoPromptConfig, PromptQualityScore } from '@/types';
import { generateId } from '@/lib/utils';

// Templates de base pour chaque type de prompt
const roleTemplates: Record<PromptType, string> = {
  text: "Tu es un rédacteur professionnel expert en création de contenu.",
  image: "Tu es un expert en prompting pour générateurs d'images IA comme Midjourney et DALL·E.",
  video: "Tu es un expert en création de prompts pour générateurs de vidéos IA.",
  webapp: "Tu es un architecte logiciel senior expert en développement d'applications web modernes.",
};

const formatTemplates: Record<string, string> = {
  article: "Format de sortie : Article structuré avec introduction, développement en plusieurs sections, et conclusion.",
  email: "Format de sortie : Email professionnel avec objet, salutation, corps du message et formule de politesse.",
  copywriting: "Format de sortie : Copywriting persuasif avec accroche, arguments, preuves sociales et appel à l'action.",
  script: "Format de sortie : Script vidéo avec structure narrative, dialogues et indications visuelles.",
};

// Construction des blocs de prompt
export function buildPromptBlocks(
  type: PromptType,
  data: any
): PromptBlock[] {
  const blocks: PromptBlock[] = [];

  // ROLE
  blocks.push({
    id: generateId(),
    type: 'role',
    label: 'Rôle',
    content: data.role as string || roleTemplates[type],
    order: 1,
  });

  // CONTEXTE
  const contextContent = buildContextContent(type, data);
  if (contextContent) {
    blocks.push({
      id: generateId(),
      type: 'context',
      label: 'Contexte',
      content: contextContent,
      order: 2,
    });
  }

  // OBJECTIF
  const objectiveContent = buildObjectiveContent(type, data);
  if (objectiveContent) {
    blocks.push({
      id: generateId(),
      type: 'objective',
      label: 'Objectif',
      content: objectiveContent,
      order: 3,
    });
  }

  // CONTRAINTES
  const constraintsContent = buildConstraintsContent(type, data);
  if (constraintsContent) {
    blocks.push({
      id: generateId(),
      type: 'constraints',
      label: 'Contraintes',
      content: constraintsContent,
      order: 4,
    });
  }

  // FORMAT
  const formatContent = buildFormatContent(type, data);
  if (formatContent) {
    blocks.push({
      id: generateId(),
      type: 'format',
      label: 'Format attendu',
      content: formatContent,
      order: 5,
    });
  }

  // TONE
  const toneContent = buildToneContent(type, data);
  if (toneContent) {
    blocks.push({
      id: generateId(),
      type: 'tone',
      label: 'Ton / Style',
      content: toneContent,
      order: 6,
    });
  }

  // EXAMPLES
  const examplesContent = buildExamplesContent(type, data);
  if (examplesContent) {
    blocks.push({
      id: generateId(),
      type: 'examples',
      label: 'Exemples',
      content: examplesContent,
      order: 7,
    });
  }

  return blocks.sort((a, b) => a.order - b.order);
}

function buildContextContent(type: PromptType, data: any): string {
  const parts: string[] = [];

  if (data.targetAudience) {
    parts.push(`Public cible : ${data.targetAudience}`);
  }

  if (data.context) {
    parts.push(`Contexte : ${data.context}`);
  }

  switch (type) {
    case 'webapp':
      const config = data as unknown as WebAppConfig;
      parts.push(`Type d'application : ${getAppTypeLabel(config.appType || 'saas')}`);
      if (config.stack?.length) {
        parts.push(`Stack technique : ${config.stack.join(', ')}`);
      }
      break;

    case 'text':
      const textConfig = data as unknown as TextPromptConfig;
      if (textConfig.contentType) {
        parts.push(`Type de contenu : ${textConfig.contentType}`);
      }
      if (textConfig.keywords?.length) {
        parts.push(`Mots-clés à inclure : ${textConfig.keywords.join(', ')}`);
      }
      break;

    case 'image':
      const imageConfig = data as unknown as ImagePromptConfig;
      if (imageConfig.style) {
        parts.push(`Style : ${imageConfig.style}`);
      }
      break;

    case 'video':
      const videoConfig = data as unknown as VideoPromptConfig;
      if (videoConfig.style) {
        parts.push(`Style vidéo : ${videoConfig.style}`);
      }
      break;
  }

  return parts.join('\n');
}

function buildObjectiveContent(type: PromptType, data: any): string {
  if (data.objective) {
    return data.objective as string;
  }

  switch (type) {
    case 'webapp':
      return `Conçois une application web complète répondant aux besoins définis.`;

    case 'text':
      return `Rédige un contenu optimisé répondant aux exigences définies.`;

    case 'image':
      return `Génère un prompt détaillé pour créer une image répondant aux spécifications.`;

    case 'video':
      return `Crée un prompt pour générer une vidéo correspondant aux critères définis.`;

    default:
      return `Réalise la tâche demandée de manière optimale.`;
  }
}

function buildConstraintsContent(type: PromptType, data: any): string {
  const parts: string[] = [];

  if (data.constraints) {
    parts.push(data.constraints as string);
  }

  switch (type) {
    case 'text':
      const textConfig = data as unknown as TextPromptConfig;
      if (textConfig.length) {
        parts.push(`Longueur : ${getLengthLabel(textConfig.length)}`);
      }
      if (textConfig.language) {
        parts.push(`Langue : ${textConfig.language}`);
      }
      break;

    case 'image':
      const imageConfig = data as unknown as ImagePromptConfig;
      if (imageConfig.aspectRatio) {
        parts.push(`Ratio : ${imageConfig.aspectRatio}`);
      }
      if (imageConfig.colors?.length) {
        parts.push(`Palette de couleurs : ${imageConfig.colors.join(', ')}`);
      }
      break;

    case 'video':
      const videoConfig = data as unknown as VideoPromptConfig;
      if (videoConfig.duration) {
        parts.push(`Durée : ${videoConfig.duration}`);
      }
      if (videoConfig.audio) {
        parts.push(`Audio : ${videoConfig.audio}`);
      }
      break;

    case 'webapp':
      const webAppConfig = data as unknown as WebAppConfig;
      if (webAppConfig.features?.length) {
        parts.push(`Fonctionnalités requises :\n${webAppConfig.features.map(f => `- ${f}`).join('\n')}`);
      }
      break;
  }

  return parts.join('\n');
}

function buildFormatContent(type: PromptType, data: any): string {
  if (data.format) {
    return data.format as string;
  }

  switch (type) {
    case 'webapp':
      return `Format de sortie :
1. Architecture technique
2. Stack recommandée
3. Structure des pages
4. Composants principaux
5. Recommandations UX/UI
6. Points d'attention techniques`;

    case 'text':
      const textConfig = data as unknown as TextPromptConfig;
      return formatTemplates[textConfig.contentType as string] || 'Format de sortie : Contenu structuré et bien organisé.';

    case 'image':
      return 'Format de sortie : Prompt détaillé avec sujet, style, composition, éclairage, ambiance et paramètres techniques.';

    case 'video':
      return 'Format de sortie : Prompt structuré avec scène, mouvements, timing, transitions et effets.';

    default:
      return 'Format de sortie : Réponse claire et structurée.';
  }
}

function buildToneContent(type: PromptType, data: any): string {
  if (data.tone) {
    return `Ton : ${data.tone}`;
  }

  switch (type) {
    case 'text':
      const textConfig = data as unknown as TextPromptConfig;
      return textConfig.tone ? `Ton : ${getToneLabel(textConfig.tone)}` : '';

    case 'webapp':
      return 'Ton : Professionnel, technique et pédagogique';

    default:
      return '';
  }
}

function buildExamplesContent(type: PromptType, data: any): string {
  if (data.examples) {
    return data.examples as string;
  }
  return '';
}

// Helper functions
function getAppTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    saas: 'Application SaaS',
    mvp: 'MVP (Minimum Viable Product)',
    internal: 'Outil interne',
    ecommerce: 'E-commerce',
    portfolio: 'Portfolio',
    custom: 'Application personnalisée',
  };
  return labels[type] || type;
}

function getLengthLabel(length: string): string {
  const labels: Record<string, string> = {
    short: 'Court (~300 mots)',
    medium: 'Moyen (~800 mots)',
    long: 'Long (~1500 mots)',
    custom: 'Personnalisé',
  };
  return labels[length] || length;
}

function getToneLabel(tone: string): string {
  const labels: Record<string, string> = {
    professional: 'Professionnel',
    casual: 'Décontracté',
    creative: 'Créatif',
    technical: 'Technique',
    persuasive: 'Persuasif',
  };
  return labels[tone] || tone;
}

// Génération du prompt final
export function generatePrompt(
  type: PromptType,
  data: any
): GeneratedPrompt {
  const blocks = buildPromptBlocks(type, data);
  const rawContent = blocks
    .sort((a, b) => a.order - b.order)
    .map((block) => `[${block.label.toUpperCase()}]\n${block.content}`)
    .join('\n\n');

  const score = calculatePromptQuality(blocks);
  const suggestions = generateSuggestions(blocks, type, data);

  return {
    id: generateId(),
    type,
    blocks,
    rawContent,
    score: score.overall,
    suggestions,
    createdAt: new Date(),
  };
}

// Calcul du score de qualité
export function calculatePromptQuality(blocks: PromptBlock[]): PromptQualityScore {
  const filledBlocks = blocks.filter((b) => b.content && b.content.trim().length > 0);
  const totalBlocks = 7;

  const completeness = (filledBlocks.length / totalBlocks) * 100;

  let clarity = 0;
  let specificity = 0;
  let context = 0;
  let constraints = 0;

  filledBlocks.forEach((block) => {
    const length = block.content.length;
    const hasStructure = block.content.includes('\n') || block.content.includes(':');

    switch (block.type) {
      case 'role':
        clarity += length > 20 ? 25 : length > 10 ? 15 : 5;
        break;
      case 'context':
        context += length > 50 ? 25 : length > 20 ? 15 : 5;
        break;
      case 'objective':
        specificity += length > 30 ? 25 : length > 15 ? 15 : 5;
        break;
      case 'constraints':
        constraints += hasStructure ? 25 : length > 30 ? 15 : 5;
        break;
    }
  });

  return {
    overall: Math.round((completeness + clarity + specificity + context + constraints) / 5),
    clarity: Math.min(100, Math.round(clarity)),
    specificity: Math.min(100, Math.round(specificity)),
    context: Math.min(100, Math.round(context)),
    constraints: Math.min(100, Math.round(constraints)),
  };
}

// Suggestions d'amélioration
function generateSuggestions(
  blocks: PromptBlock[],
  type: PromptType,
  data: any
): string[] {
  const suggestions: string[] = [];

  const roleBlock = blocks.find((b) => b.type === 'role');
  if (!roleBlock || roleBlock.content.length < 20) {
    suggestions.push('Définissez un rôle plus précis et détaillé');
  }

  const contextBlock = blocks.find((b) => b.type === 'context');
  if (!contextBlock || contextBlock.content.length < 30) {
    suggestions.push('Ajoutez plus de contexte sur votre situation');
  }

  const objectiveBlock = blocks.find((b) => b.type === 'objective');
  if (!objectiveBlock || objectiveBlock.content.length < 20) {
    suggestions.push('Précisez votre objectif avec des détails mesurables');
  }

  const examplesBlock = blocks.find((b) => b.type === 'examples');
  if (!examplesBlock || examplesBlock.content.length < 10) {
    suggestions.push('Ajoutez un ou deux exemples pour guider le résultat');
  }

  if (type === 'webapp' && !data.features) {
    suggestions.push('Listez les fonctionnalités principales de votre application');
  }

  if (type === 'text' && !data.targetAudience) {
    suggestions.push('Définissez votre public cible pour un meilleur ciblage');
  }

  return suggestions;
}