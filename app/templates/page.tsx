"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Image,
  Video,
  Code,
  Search,
  Sparkles,
  Copy,
  Check,
  Star,
  Filter,
} from "lucide-react";
import { usePromptStore } from "@/store/prompt-store";
import { generatePrompt } from "@/lib/prompt-engine";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "text" | "image" | "video" | "webapp";
  icon: React.ReactNode;
  gradient: string;
  data: Record<string, unknown>;
  isPro?: boolean;
}

const templates: Template[] = [
  // Text Templates
  {
    id: "blog-seo",
    name: "Article SEO Optimisé",
    description: "Template pour créer des articles de blog optimisés pour le référencement",
    category: "Marketing",
    type: "text",
    icon: <FileText className="h-5 w-5" />,
    gradient: "from-blue-500 to-cyan-500",
    data: {
      contentType: "article",
      tone: "professional",
      language: "Français",
      length: "long",
      keywords: ["SEO", "optimisation"],
    },
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    description: "Template pour des emails marketing convaincants",
    category: "Marketing",
    type: "text",
    icon: <FileText className="h-5 w-5" />,
    gradient: "from-blue-500 to-cyan-500",
    data: {
      contentType: "email",
      tone: "persuasive",
      language: "Français",
      length: "short",
    },
  },
  {
    id: "social-post",
    name: "Post Réseaux Sociaux",
    description: "Template pour des posts engageants sur les réseaux sociaux",
    category: "Social Media",
    type: "text",
    icon: <FileText className="h-5 w-5" />,
    gradient: "from-blue-500 to-cyan-500",
    data: {
      contentType: "social",
      tone: "casual",
      language: "Français",
      length: "short",
    },
  },
  {
    id: "video-script",
    name: "Script Vidéo YouTube",
    description: "Template pour des scripts de vidéo YouTube engageants",
    category: "Contenu",
    type: "text",
    icon: <FileText className="h-5 w-5" />,
    gradient: "from-blue-500 to-cyan-500",
    data: {
      contentType: "script",
      tone: "creative",
      language: "Français",
      length: "long",
    },
  },

  // Image Templates
  {
    id: "portrait-pro",
    name: "Portrait Professionnel",
    description: "Pour des portraits professionnels de haute qualité",
    category: "Portrait",
    type: "image",
    icon: <Image className="h-5 w-5" />,
    gradient: "from-emerald-500 to-teal-500",
    data: {
      style: "realistic",
      mood: "professionnel",
      aspectRatio: "4:3",
      details: ["éclairage studio", "haute résolution", "arrière-plan flou"],
    },
  },
  {
    id: "product-shot",
    name: "Photo Produit E-commerce",
    description: "Pour des photos produit commercialisables",
    category: "E-commerce",
    type: "image",
    icon: <Image className="h-5 w-5" />,
    gradient: "from-emerald-500 to-teal-500",
    data: {
      style: "minimalist",
      mood: "clean",
      aspectRatio: "1:1",
      details: ["fond blanc", "éclairage doux", "détails nets"],
    },
  },
  {
    id: "abstract-art",
    name: "Art Abstrait",
    description: "Pour créer des œuvres d'art abstraites uniques",
    category: "Art",
    type: "image",
    icon: <Image className="h-5 w-5" />,
    gradient: "from-emerald-500 to-teal-500",
    data: {
      style: "abstract",
      mood: "créatif",
      aspectRatio: "16:9",
      colors: ["vibrant", "contrasté"],
    },
  },

  // Video Templates
  {
    id: "promo-video",
    name: "Vidéo Promotionnelle",
    description: "Pour des vidéos promotionnelles impactantes",
    category: "Marketing",
    type: "video",
    icon: <Video className="h-5 w-5" />,
    gradient: "from-orange-500 to-amber-500",
    data: {
      style: "commercial",
      duration: "short",
      audio: "music",
      elements: ["transitions dynamiques", "textes animés"],
    },
  },
  {
    id: "tuto-video",
    name: "Tutoriel Vidéo",
    description: "Pour des vidéos tutoriels claires et instructives",
    category: "Éducation",
    type: "video",
    icon: <Video className="h-5 w-5" />,
    gradient: "from-orange-500 to-amber-500",
    data: {
      style: "documentary",
      duration: "medium",
      audio: "voiceover",
      elements: ["plans rapprochés", "démonstrations"],
    },
  },

  // WebApp Templates
  {
    id: "saas-mvp",
    name: "SaaS MVP",
    description: "Template complet pour un MVP SaaS",
    category: "SaaS",
    type: "webapp",
    icon: <Code className="h-5 w-5" />,
    gradient: "from-violet-500 to-purple-500",
    data: {
      appType: "saas",
      stack: ["nextjs"],
      style: "dashboard",
      features: ["Authentification", "Dashboard", "Paiements", "Notifications"],
    },
  },
  {
    id: "landing-page",
    name: "Landing Page Startup",
    description: "Template pour une landing page startup moderne",
    category: "Marketing",
    type: "webapp",
    icon: <Code className="h-5 w-5" />,
    gradient: "from-violet-500 to-purple-500",
    data: {
      appType: "mvp",
      stack: ["nextjs"],
      style: "minimalist",
      features: ["Hero section", "Témoignages", "Pricing", "CTA"],
    },
  },
  {
    id: "ecommerce-store",
    name: "Boutique E-commerce",
    description: "Template pour une boutique en ligne complète",
    category: "E-commerce",
    type: "webapp",
    icon: <Code className="h-5 w-5" />,
    gradient: "from-violet-500 to-purple-500",
    data: {
      appType: "ecommerce",
      stack: ["nextjs"],
      style: "corporate",
      features: ["Catalogue produits", "Panier", "Checkout", "Gestion stocks"],
    },
    isPro: true,
  },
  {
    id: "portfolio-creative",
    name: "Portfolio Créatif",
    description: "Template pour un portfolio créatif impressionnant",
    category: "Portfolio",
    type: "webapp",
    icon: <Code className="h-5 w-5" />,
    gradient: "from-violet-500 to-purple-500",
    data: {
      appType: "portfolio",
      stack: ["nextjs"],
      style: "creative",
      features: ["Galerie projets", "À propos", "Contact", "Animations"],
    },
  },
];

const categories = ["Tous", "Marketing", "Social Media", "Contenu", "E-commerce", "SaaS", "Portrait", "Art", "Éducation", "Portfolio"];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "text":
      return <FileText className="h-4 w-4" />;
    case "image":
      return <Image className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    case "webapp":
      return <Code className="h-4 w-4" />;
    default:
      return <Sparkles className="h-4 w-4" />;
  }
};

export default function TemplatesPage() {
  const { setPromptType, setWizardData, setGeneratedPrompt } = usePromptStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tous" || template.category === selectedCategory;
    const matchesType = !selectedType || template.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleUseTemplate = (template: Template) => {
    const prompt = generatePrompt(template.type, {
      ...template.data,
      subject: `Template: ${template.name}`,
    });
    setPromptType(template.type);
    setWizardData(template.data);
    setGeneratedPrompt(prompt);
    window.location.href = "/generate/result";
  };

  const handleCopyTemplate = async (template: Template) => {
    const prompt = generatePrompt(template.type, {
      ...template.data,
      subject: `Template: ${template.name}`,
    });
    await navigator.clipboard.writeText(prompt.rawContent);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Templates de Prompts
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Démarrez rapidement avec nos templates prédéfinis. Choisissez un template,
            personnalisez-le et générez votre prompt en quelques secondes.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search and Type Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Rechercher un template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {["text", "image", "video", "webapp"].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className="whitespace-nowrap"
                >
                  {getTypeIcon(type)}
                  <span className="ml-2 capitalize">{type}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {template.isPro && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <Star className="h-3 w-3" />
                      PRO
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white mb-3 ${template.gradient}`}
                  >
                    {template.icon}
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded-full capitalize">
                      {template.type}
                    </span>
                    <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Utiliser
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyTemplate(template)}
                    >
                      {copiedId === template.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Filter className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500 mb-4">Aucun template trouvé</p>
              <p className="text-sm text-zinc-400">
                Essayez de modifier vos filtres ou votre recherche
              </p>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
            <CardContent className="py-8">
              <Sparkles className="h-10 w-10 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Besoin d'un template personnalisé ?</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Créez votre propre prompt de A à Z avec notre assistant intelligent.
              </p>
              <Link href="/generate">
                <Button variant="secondary" className="bg-white text-violet-600 hover:bg-white/90">
                  Créer un prompt personnalisé
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}