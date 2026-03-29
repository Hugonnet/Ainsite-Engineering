export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Le Few-Shot Prompting : De la théorie à la pratique",
    excerpt: "Pourquoi donner quelques exemples à l'IA change radicalement la qualité de ses réponses complexes.",
    category: "Techniques de Base",
    author: "Sophie Durand",
    date: "24 Mars 2026",
    readTime: "6 min",
    image: "/blog/abstract-1.png",
    content: "Le few-shot prompting est l'une des techniques les plus puissantes pour guider les modèles de langage vers des sorties précises. En fournissant 2 à 5 exemples bien choisis, vous donnez au modèle un 'patron' structurel et sémantique qu'il peut suivre..."
  },
  {
    id: 2,
    title: "Think Step by Step : Maîtriser le Chain of Thought (CoT)",
    excerpt: "Comment décomposer le raisonnement de l'IA pour éviter les hallucinations dans les tâches logiques.",
    category: "Raisonnement IA",
    author: "Marc Leroy",
    date: "22 Mars 2026",
    readTime: "8 min",
    image: "/blog/abstract-2.png",
    content: "Le Chain of Thought (Chaîne de Pensée) permet à l'IA de décomposer des problèmes complexes en étapes intermédiaires logiques. Cette technique réduit drastiquement les erreurs de calcul et de raisonnement..."
  },
  {
    id: 3,
    title: "Optimiser votre Fenêtre de Contexte",
    excerpt: "Astuces pour garder les informations essentielles sans dépasser les limites de jetons de votre modèle.",
    category: "Performance",
    author: "Léa Martin",
    date: "20 Mars 2026",
    readTime: "5 min",
    image: "/blog/hero.png",
    content: "La gestion de la fenêtre de contexte est cruciale pour les longs dialogues ou l'analyse de gros documents. Apprenez à condenser vos instructions et à structurer les métadonnées pour maximiser l'efficacité des jetons."
  },
  {
    id: 4,
    title: "Tree of Thoughts (ToT) : L'IA à choix multiples",
    excerpt: "Une exploration profonde des techniques de recherche arborescente pour la résolution de problèmes.",
    category: "Avancé",
    author: "Thomas Bernard",
    date: "18 Mars 2026",
    readTime: "12 min",
    image: "/blog/tree-of-thoughts.png",
    content: "Inspiré de la recherche arborescente, le Tree of Thoughts permet à l'IA d'explorer plusieurs pistes de solution simultanément, de les évaluer, et de revenir en arrière si nécessaire."
  },
  {
    id: 5,
    title: "ReAct : Faire interagir l'IA avec le monde réel",
    excerpt: "Combiner la planification verbale avec l'utilisation d'outils pour des agents plus autonomes.",
    category: "Agents",
    author: "Julie Morel",
    date: "15 Mars 2026",
    readTime: "9 min",
    image: "/blog/react-agents.png",
    content: "ReAct est un framework qui combine Reasoning and Acting. L'IA pense d'abord à ce qu'elle doit faire, exécute une action (comme une recherche web), observe le résultat, puis recommence jusqu'à la solution."
  },
  {
    id: 6,
    title: "Le Negative Prompting en 2026",
    excerpt: "Comment dire à l'IA ce qu'elle ne doit PAS faire pour affiner ses résultats de manière chirurgicale.",
    category: "Précision",
    author: "Antoine Petit",
    date: "12 Mars 2026",
    readTime: "4 min",
    image: "/blog/negative-prompting.png",
    content: "Alors que nous nous concentrons souvent sur ce que nous voulons, dire à l'IA ce que nous voulons éviter est tout aussi crucial pour la sécurité, le ton, et la conformité aux directives de marque."
  },
  {
    id: 7,
    title: "Prompt Chaining : Séquencer pour mieux régner",
    excerpt: "Pourquoi enchaîner plusieurs petits prompts vaut mieux qu'un seul énorme prompt complexe.",
    category: "Workflow",
    author: "Sarah Gomez",
    date: "10 Mars 2026",
    readTime: "7 min",
    image: "/blog/prompt-chaining.png",
    content: "Le chaînage de prompts consiste à passer le résultat d'un prompt comme entrée au suivant. C'est la base de la création de pipelines de contenu automatisés et fiables."
  },
  {
    id: 8,
    title: "Température et Top-P décryptés",
    excerpt: "Tout sur les paramètres de génération pour équilibrer créativité délirante et rigueur mathématique.",
    category: "Mathématiques",
    author: "Nicolas Vasseur",
    date: "08 Mars 2026",
    readTime: "6 min",
    image: "/blog/temperature-top-p.png",
    content: "Comprendre les paramètres de décodage vous permet de contrôler l'imprévisibilité de l'IA. Pour du code, on privilégiera une température basse ; pour de la poésie, une température haute."
  },
  {
    id: 9,
    title: "L'art de l'itération infinie",
    excerpt: "Apprendre à raffiner ses prompts en se basant sur les échecs précédents de l'IA.",
    category: "Méthodologie",
    author: "Sophie Durand",
    date: "05 Mars 2026",
    readTime: "5 min",
    image: "/blog/iteration-process.png",
    content: "Le premier prompt est rarement le bon. L'ingénierie de prompt est un processus itératif. Apprenez à analyser les erreurs de l'IA pour injecter les correctifs nécessaires dans la prochaine version du prompt."
  }
];
