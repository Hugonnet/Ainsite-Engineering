"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WizardContainer, WizardStep, WizardNavigation } from "@/components/wizard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { usePromptStore } from "@/store/prompt-store";
import { generatePrompt, calculatePromptQuality, getContextualSuggestions } from "@/lib/prompt-engine";
import type { WebAppConfig } from "@/types";
import {
  Code2,
  Layers,
  Palette,
  Settings2,
  Sparkles,
  ArrowRight,
  Plus,
  X,
} from "lucide-react";

const appTypes = [
  { value: "saas", label: "Application SaaS", description: "Logiciel en tant que service" },
  { value: "mvp", label: "MVP", description: "Produit minimum viable" },
  { value: "internal", label: "Outil interne", description: "Dashboard ou outil métier" },
  { value: "ecommerce", label: "E-commerce", description: "Boutique en ligne" },
  { value: "portfolio", label: "Portfolio", description: "Site vitrine personnel" },
  { value: "custom", label: "Personnalisé", description: "Autre type d'application" },
];

const techStacks = [
  { value: "nextjs", label: "Next.js", popular: true },
  { value: "astro", label: "Astro" },
  { value: "react", label: "React SPA" },
  { value: "vue", label: "Vue.js / Nuxt" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte / SvelteKit" },
];

const uiStyles = [
  { value: "dashboard", label: "Dashboard", icon: "📊", description: "Interface avec graphiques et KPIs" },
  { value: "minimalist", label: "Minimaliste", icon: "✨", description: "Design épuré et moderne" },
  { value: "corporate", label: "Corporate", icon: "🏢", description: "Style professionnel et formel" },
  { value: "creative", label: "Créatif", icon: "🎨", description: "Design original et audacieux" },
  { value: "dark", label: "Dark Mode", icon: "🌙", description: "Interface sombre par défaut" },
];

const stepLabels = ["Type", "Stack", "Style", "Features", "Détails", "Génération"];

export default function WebAppGeneratorPage() {
  const router = useRouter();
  const { setPromptType, setWizardData, setGeneratedPrompt } = usePromptStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<WebAppConfig & { objective: string; context: string; constraints: string }>({
    appType: "saas",
    stack: ["nextjs"],
    style: "minimalist",
    features: [],
    pages: [],
    integrations: [],
    objective: "",
    context: "",
    constraints: "",
  });

  const [newFeature, setNewFeature] = useState("");
  const [newPage, setNewPage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddPage = () => {
    if (newPage.trim()) {
      setFormData((prev) => ({
        ...prev,
        pages: [...prev.pages, newPage.trim()],
      }));
      setNewPage("");
    }
  };

  const handleRemovePage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index),
    }));
  };

  const handleStackChange = (stack: WebAppConfig["stack"][number], checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      stack: checked
        ? [...prev.stack, stack]
        : prev.stack.filter((s) => s !== stack),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Generate prompt
      const prompt = generatePrompt("webapp", formData);

      // Store in Zustand
      setPromptType("webapp");
      setWizardData(formData);
      setGeneratedPrompt(prompt);

      // Navigate to result page
      router.push("/generate/result");
    } catch (error) {
      console.error("Error generating prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!formData.appType;
      case 1:
        return formData.stack.length > 0;
      case 2:
        return !!formData.style;
      case 3:
        return formData.features.length > 0;
      case 4:
        return formData.objective.trim().length > 10;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <WizardStep title="Type d'application" description="Sélectionnez le type d'application web que vous souhaitez créer">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {appTypes.map((type) => (
                <Card
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.appType === type.value
                      ? "ring-2 ring-violet-500 bg-violet-50 dark:bg-violet-950/30"
                      : "hover:border-zinc-300"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, appType: type.value as WebAppConfig["appType"] }))}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-zinc-500">{type.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </WizardStep>
        );

      case 1:
        return (
          <WizardStep title="Stack technique" description="Choisissez les technologies que vous souhaitez utiliser">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techStacks.map((stack) => (
                <label
                  key={stack.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    formData.stack.includes(stack.value as WebAppConfig["stack"][number])
                      ? "ring-2 ring-violet-500 bg-violet-50 dark:bg-violet-950/30 border-violet-500"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.stack.includes(stack.value as WebAppConfig["stack"][number])}
                    onChange={(e) => handleStackChange(stack.value as WebAppConfig["stack"][number], e.target.checked)}
                    className="h-4 w-4 text-violet-600 focus:ring-violet-500"
                  />
                  <div>
                    <span className="font-medium">{stack.label}</span>
                    {stack.popular && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-violet-100 text-violet-700 rounded">
                        Populaire
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </WizardStep>
        );

      case 2:
        return (
          <WizardStep title="Style UI" description="Définissez le style visuel de votre application">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uiStyles.map((style) => (
                <Card
                  key={style.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.style === style.value
                      ? "ring-2 ring-violet-500 bg-violet-50 dark:bg-violet-950/30"
                      : "hover:border-zinc-300"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, style: style.value as WebAppConfig["style"] }))}
                >
                  <CardContent className="p-4">
                    <div className="text-2xl mb-2">{style.icon}</div>
                    <div className="font-medium">{style.label}</div>
                    <div className="text-sm text-zinc-500">{style.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </WizardStep>
        );

      case 3:
        return (
          <WizardStep title="Fonctionnalités clés" description="Listez les fonctionnalités principales de votre application">
            <div className="space-y-4">
              {/* Existing features */}
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 rounded-full text-sm"
                  >
                    {feature}
                    <button
                      onClick={() => handleRemoveFeature(index)}
                      className="ml-1 hover:text-violet-900 dark:hover:text-violet-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add feature */}
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Ex: Authentification utilisateur"
                  onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                />
                <Button onClick={handleAddFeature} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Suggested features */}
              <div className="mt-4">
                <Label className="text-sm text-zinc-500 mb-2 block">Suggestions :</Label>
                <div className="flex flex-wrap gap-2">
                  {["Authentification", "Tableau de bord", "Notifications", "Paiements", "Export PDF", "Recherche"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setFormData((prev) => ({ ...prev, features: [...prev.features, suggestion] }))}
                      className="px-3 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
                    >
                      + {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </WizardStep>
        );

      case 4:
        return (
          <WizardStep title="Détails du projet" description="Ajoutez des précisions sur votre projet">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="objective">Objectif principal *</Label>
                <Textarea
                  id="objective"
                  value={formData.objective}
                  onChange={(e) => setFormData((prev) => ({ ...prev, objective: e.target.value }))}
                  placeholder="Décrivez l'objectif principal de votre application..."
                  className="min-h-[100px]"
                />
                <p className="text-xs text-zinc-500">
                  {formData.objective.length}/500 caractères
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Contexte (optionnel)</Label>
                <Textarea
                  id="context"
                  value={formData.context}
                  onChange={(e) => setFormData((prev) => ({ ...prev, context: e.target.value }))}
                  placeholder="Ajoutez du contexte sur votre situation, public cible, etc."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="constraints">Contraintes techniques (optionnel)</Label>
                <Textarea
                  id="constraints"
                  value={formData.constraints}
                  onChange={(e) => setFormData((prev) => ({ ...prev, constraints: e.target.value }))}
                  placeholder="Ex: Budget limité, deadline courte, intégrations spécifiques..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Pages */}
              <div className="space-y-2">
                <Label>Pages principales (optionnel)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.pages.map((page, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm"
                    >
                      {page}
                      <button
                        onClick={() => handleRemovePage(index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newPage}
                    onChange={(e) => setNewPage(e.target.value)}
                    placeholder="Ex: Accueil, Profil, Paramètres"
                    onKeyPress={(e) => e.key === "Enter" && handleAddPage()}
                  />
                  <Button onClick={handleAddPage} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </WizardStep>
        );

      case 5:
        return (
          <WizardStep title="Récapitulatif" description="Vérifiez vos choix avant de générer le prompt">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Code2 className="h-4 w-4" />
                      <span className="text-sm">Type</span>
                    </div>
                    <div className="font-medium">
                      {appTypes.find((t) => t.value === formData.appType)?.label}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Layers className="h-4 w-4" />
                      <span className="text-sm">Stack</span>
                    </div>
                    <div className="font-medium">
                      {formData.stack.map((s) => techStacks.find((t) => t.value === s)?.label).join(", ")}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Palette className="h-4 w-4" />
                      <span className="text-sm">Style</span>
                    </div>
                    <div className="font-medium">
                      {uiStyles.find((s) => s.value === formData.style)?.label}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Settings2 className="h-4 w-4" />
                      <span className="text-sm">Fonctionnalités</span>
                    </div>
                    <div className="font-medium">{formData.features.length} définies</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-violet-600 mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-medium">Prêt à générer</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Cliquez sur "Générer le prompt" pour créer un prompt optimisé avec tous les éléments
                    nécessaires pour concevoir votre application web.
                  </p>
                </CardContent>
              </Card>
            </div>
          </WizardStep>
        );

      default:
        return null;
    }
  };

  return (
    <WizardContainer
      title="Créer un prompt pour Application Web"
      description="Définissez votre projet étape par étape"
      currentStep={currentStep}
      totalSteps={6}
      stepLabels={stepLabels}
    >
      {renderStepContent()}

      <WizardNavigation
        onBack={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
        onNext={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
        onSubmit={handleSubmit}
        canGoBack={currentStep > 0}
        canGoNext={canProceed()}
        isLastStep={currentStep === 5}
        isFirstStep={currentStep === 0}
        isSubmitting={isSubmitting}
      />
    </WizardContainer>
  );
}