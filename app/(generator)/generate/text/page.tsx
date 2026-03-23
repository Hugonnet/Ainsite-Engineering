"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WizardContainer, WizardStep, WizardNavigation } from "@/components/wizard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { usePromptStore } from "@/store/prompt-store";
import { generatePrompt } from "@/lib/prompt-engine";
import type { TextPromptConfig } from "@/types";
import {
  FileText,
  Target,
  Users,
  Languages,
  Hash,
  AlignLeft,
  PenTool,
} from "lucide-react";

const contentTypes = [
  { value: "article", label: "Article", icon: "📝", description: "Article de blog ou contenu web" },
  { value: "email", label: "Email", icon: "✉️", description: "Email marketing ou professionnel" },
  { value: "copywriting", label: "Copywriting", icon: "✍️", description: "Texte persuasif pour conversion" },
  { value: "script", label: "Script", icon: "🎬", description: "Script vidéo ou audio" },
  { value: "social", label: "Social", icon: "📱", description: "Post réseaux sociaux" },
  { value: "seo", label: "SEO", icon: "🔍", description: "Contenu optimisé SEO" },
];

const tones = [
  { value: "professional", label: "Professionnel" },
  { value: "casual", label: "Décontracté" },
  { value: "creative", label: "Créatif" },
  { value: "technical", label: "Technique" },
  { value: "persuasive", label: "Persuasif" },
];

const lengths = [
  { value: "short", label: "Court", description: "~300 mots" },
  { value: "medium", label: "Moyen", description: "~800 mots" },
  { value: "long", label: "Long", description: "~1500 mots" },
];

const stepLabels = ["Type", "Sujet", "Cible", "Style", "Génération"];

export default function TextGeneratorPage() {
  const router = useRouter();
  const { setPromptType, setWizardData, setGeneratedPrompt } = usePromptStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TextPromptConfig & { subject: string; context: string }>({
    contentType: "article",
    tone: "professional",
    language: "Français",
    length: "medium",
    targetAudience: "",
    keywords: [],
    subject: "",
    context: "",
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const prompt = generatePrompt("text", formData);

      setPromptType("text");
      setWizardData(formData);
      setGeneratedPrompt(prompt);

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
        return formData.contentType !== "";
      case 1:
        return formData.subject.trim().length > 10;
      case 2:
        return formData.targetAudience.trim().length > 5;
      case 3:
        return formData.tone !== "" && formData.length !== "";
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <WizardStep title="Type de contenu" description="Sélectionnez le type de contenu textuel à créer">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {contentTypes.map((type) => (
                <Card
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.contentType === type.value
                      ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/30"
                      : "hover:border-zinc-300"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, contentType: type.value as TextPromptConfig["contentType"] }))}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-zinc-500 mt-1">{type.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </WizardStep>
        );

      case 1:
        return (
          <WizardStep title="Sujet principal" description="Décrivez le sujet et le contexte de votre contenu">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet *</Label>
                <Textarea
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                  placeholder="Ex: Les meilleures pratiques pour développer une application SaaS en 2024"
                  className="min-h-[100px]"
                />
                <p className="text-xs text-zinc-500">{formData.subject.length}/500 caractères</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Contexte additionnel (optionnel)</Label>
                <Textarea
                  id="context"
                  value={formData.context}
                  onChange={(e) => setFormData((prev) => ({ ...prev, context: e.target.value }))}
                  placeholder="Ajoutez des informations contextuelles supplémentaires..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Mots-clés à inclure (optionnel)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      <Hash className="h-3 w-3" />
                      {keyword}
                      <button
                        onClick={() => handleRemoveKeyword(index)}
                        className="ml-1 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Ajouter un mot-clé"
                    onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
                  />
                  <Button onClick={handleAddKeyword} variant="outline">Ajouter</Button>
                </div>
              </div>
            </div>
          </WizardStep>
        );

      case 2:
        return (
          <WizardStep title="Public cible" description="Définissez à qui s'adresse votre contenu">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="audience">Public cible *</Label>
                <Textarea
                  id="audience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="Ex: Développeurs web juniors, entrepreneurs tech, marketers..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Langue</Label>
                <Input
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                  placeholder="Français"
                />
              </div>
            </div>
          </WizardStep>
        );

      case 3:
        return (
          <WizardStep title="Ton et longueur" description="Choisissez le style et la taille de votre contenu">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Ton du contenu</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {tones.map((tone) => (
                    <Card
                      key={tone.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.tone === tone.value
                          ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/30"
                          : "hover:border-zinc-300"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, tone: tone.value as TextPromptConfig["tone"] }))}
                    >
                      <CardContent className="p-3 text-center">
                        <span className="font-medium text-sm">{tone.label}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Longueur</Label>
                <div className="grid grid-cols-3 gap-3">
                  {lengths.map((length) => (
                    <Card
                      key={length.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.length === length.value
                          ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/30"
                          : "hover:border-zinc-300"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, length: length.value as TextPromptConfig["length"] }))}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="font-medium text-sm">{length.label}</div>
                        <div className="text-xs text-zinc-500">{length.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </WizardStep>
        );

      case 4:
        return (
          <WizardStep title="Récapitulatif" description="Vérifiez vos choix avant de générer">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Type</span>
                  </div>
                  <div className="font-medium">
                    {contentTypes.find((t) => t.value === formData.contentType)?.label}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <PenTool className="h-4 w-4" />
                    <span className="text-sm">Ton</span>
                  </div>
                  <div className="font-medium">
                    {tones.find((t) => t.value === formData.tone)?.label}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <AlignLeft className="h-4 w-4" />
                    <span className="text-sm">Longueur</span>
                  </div>
                  <div className="font-medium">
                    {lengths.find((l) => l.value === formData.length)?.label}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Cible</span>
                  </div>
                  <div className="font-medium text-sm truncate">
                    {formData.targetAudience.slice(0, 30)}...
                  </div>
                </CardContent>
              </Card>
            </div>

            {formData.keywords.length > 0 && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-2">
                    <Hash className="h-4 w-4" />
                    <span className="text-sm">Mots-clés</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </WizardStep>
        );

      default:
        return null;
    }
  };

  return (
    <WizardContainer
      title="Créer un prompt Texte"
      description="Générez un prompt optimisé pour la rédaction de contenu"
      currentStep={currentStep}
      totalSteps={5}
      stepLabels={stepLabels}
    >
      {renderStepContent()}

      <WizardNavigation
        onBack={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
        onNext={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
        onSubmit={handleSubmit}
        canGoBack={currentStep > 0}
        canGoNext={canProceed()}
        isLastStep={currentStep === 4}
        isFirstStep={currentStep === 0}
        isSubmitting={isSubmitting}
      />
    </WizardContainer>
  );
}