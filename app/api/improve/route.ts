import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, action } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Le prompt est requis' },
        { status: 400 }
      );
    }

    // Dans une vraie application, vous appelleriez l'API Claude ici
    // Pour l'instant, on simule l'amélioration avec des règles prédéfinies

    let improvedPrompt = prompt;
    let suggestions: string[] = [];

    switch (action) {
      case 'improve':
        improvedPrompt = improvePrompt(prompt);
        suggestions = [
          "Rôle plus détaillé ajouté",
          "Contraintes spécifiques clarifiées",
          "Format de sortie précisé",
        ];
        break;

      case 'simplify':
        improvedPrompt = simplifyPrompt(prompt);
        suggestions = [
          "Phrases simplifiées",
          "Redondances supprimées",
          "Structure allégée",
        ];
        break;

      case 'expand':
        improvedPrompt = expandPrompt(prompt);
        suggestions = [
          "Contexte enrichi",
          "Exemples ajoutés",
          "Cas limites précisés",
        ];
        break;

      case 'optimize':
        improvedPrompt = optimizePrompt(prompt);
        suggestions = [
          "Structure optimisée pour les LLM",
          "Instructions plus claires",
          "Variables identifiées",
        ];
        break;

      default:
        improvedPrompt = improvePrompt(prompt);
        suggestions = ["Amélioration générale appliquée"];
    }

    return NextResponse.json({
      original: prompt,
      improved: improvedPrompt,
      suggestions,
    });

  } catch (error) {
    console.error('Erreur amélioration prompt:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'amélioration du prompt' },
      { status: 500 }
    );
  }
}

function improvePrompt(prompt: string): string {
  const lines = prompt.split('\n');
  const improvedLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('[ROLE]')) {
      improvedLines.push(line);
      if (!line.toLowerCase().includes('expert')) {
        improvedLines.push('Tu as une expertise reconnue dans ce domaine.');
      }
    } else if (line.startsWith('[OBJECTIF]')) {
      improvedLines.push(line);
      improvedLines.push('Sois précis et exhaustif dans ta réponse.');
    } else if (line.startsWith('[CONTRAINTES]')) {
      improvedLines.push(line);
      improvedLines.push('Respecte scrupuleusement ces contraintes.');
    } else if (line.startsWith('[FORMAT]')) {
      improvedLines.push(line);
      improvedLines.push('Utilise un formatage clair avec des titres et sous-titres.');
    } else {
      improvedLines.push(line);
    }
  }

  return improvedLines.join('\n');
}

function simplifyPrompt(prompt: string): string {
  // Supprime les lignes vides et les sections trop verbeuses
  const lines = prompt.split('\n');
  const simplifiedLines: string[] = [];
  let skipNext = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (skipNext) {
      skipNext = false;
      continue;
    }

    if (line.trim() === '') continue;

    // Simplifie les sections longues
    if (line.length > 200) {
      simplifiedLines.push(line.substring(0, 200) + '...');
    } else {
      simplifiedLines.push(line);
    }
  }

  return simplifiedLines.join('\n');
}

function expandPrompt(prompt: string): string {
  const lines = prompt.split('\n');
  const expandedLines: string[] = [];

  for (const line of lines) {
    expandedLines.push(line);

    if (line.startsWith('[CONTEXTE]')) {
      expandedLines.push('');
      expandedLines.push('Informations additionnelles à considérer:');
      expandedLines.push('- Le public cible et ses besoins spécifiques');
      expandedLines.push('- Les contraintes techniques ou budgétaires');
      expandedLines.push('- Les deadlines et priorités');
    }

    if (line.startsWith('[EXEMPLES]') && line.length < 50) {
      expandedLines.push('');
      expandedLines.push('Exemple 1: Cas nominal');
      expandedLines.push('Exemple 2: Cas limite');
      expandedLines.push('Exemple 3: Cas d\'erreur');
    }
  }

  return expandedLines.join('\n');
}

function optimizePrompt(prompt: string): string {
  const lines = prompt.split('\n');
  const optimizedLines: string[] = [];

  optimizedLines.push('=== INSTRUCTIONS ===');
  optimizedLines.push('');

  for (const line of lines) {
    if (line.startsWith('[') && line.includes(']')) {
      // Convertit les sections en format plus structuré
      const section = line.replace('[', '## ').replace(']', '');
      optimizedLines.push(section);
    } else {
      optimizedLines.push(line);
    }
  }

  optimizedLines.push('');
  optimizedLines.push('=== FIN DES INSTRUCTIONS ===');
  optimizedLines.push('');
  optimizedLines.push('IMPORTANT: Suit ces instructions de manière séquentielle et vérifie que chaque point est traité.');

  return optimizedLines.join('\n');
}