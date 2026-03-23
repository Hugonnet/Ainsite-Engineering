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
import type { ImagePromptConfig } from "@/types";
import { Image, Palette, LayoutGrid, Sun, Maximize, Plus, X } from "lucide-react";

const imageStyles = [
  { value: "realistic", label: "Réaliste", icon: "📷", description: "Photo-réalisme" },
  { value: "artistic", label: "Artistique", icon: "🎨", description: "Style artistique" },
  { value: "abstract", label: "Abstrait", icon: "🔷", description: "Formes abstraites" },
  { value: "minimalist", label: "Minimaliste", icon: "⬜", description: "Design épuré" },
  { value: "cinematic", label: "Cinématique", icon: "🎬", description: "Ambiance film" },
];

const aspectRatios = [
  { value: "1:1", label: "Carré", description: "1:1" },
  { value: "16:9", label: "Paysage", description: "16:9" },
  { value: "9:16", label: "Portrait", description: "9:16" },
  { value: "4:3", label: "Standard", description: "4:3" },
];

const stepLabels = ["Sujet", "Style", "Composition", "Détails", "Génération"];

export default function ImageGeneratorPage() {
  const router = useRouter();
  const { setPromptType, setWizardData, setGeneratedPrompt } = usePromptStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ImagePromptConfig & { subject: string }>({
    style: "realistic",
    mood: "",
    colors: [],
    composition: "",
    aspectRatio: "16:9",
    details: [],
    subject: "",
  });

  const [newColor, setNewColor] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddColor = () => {
    if (newColor.trim()) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()],
      }));
      setNewColor("");
    }
  };

  const handleAddDetail = () => {
    if (newDetail.trim()) {
      setFormData((prev) => ({
        ...prev,
        details: [...prev.details, newDetail.trim()],
      }));
      setNewDetail("");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const prompt = generatePrompt("image", formData);

      setPromptType("image");
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
        return formData.subject.trim().length > 5;
      case 1:
        return !!formData.style && formData.mood.trim().length > 3;
      case 2:
        return formData.composition.trim().length > 5;
      case 3:
        return !!formData.aspectRatio;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <WizardStep title="Sujet de l'image" description="Décrivez ce que vous souhaitez voir dans l'image">
            <div className="space-y-4">
              <Label htmlFor="subject">Description du sujet *</Label>
              <Textarea
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Ex: Un développeur travaillant sur son laptop dans un café moderne avec une ambiance chaleureuse"
                className="min-h-[120px]"
              />
              <p className="text-xs text-zinc-500">{formData.subject.length}/500 caractères</p>
            </div>
          </WizardStep>
        );

      case 1:
        return (
          <WizardStep title="Style et ambiance" description="Définissez le style visuel et l'ambiance">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Style</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {imageStyles.map((style) => (
                    <Card
                      key={style.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.style === style.value
                          ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                          : "hover:border-zinc-300"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, style: style.value as ImagePromptConfig["style"] }))}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-1">{style.icon}</div>
                        <div className="font-medium text-sm">{style.label}</div>
                        <div className="text-xs text-zinc-500">{style.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">Ambiance / Mood</Label>
                <Input
                  id="mood"
                  value={formData.mood}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mood: e.target.value }))}
                  placeholder="Ex: chaleureux, professionnel, créatif, futuriste..."
                />
              </div>

              <div className="space-y-2">
                <Label>Couleurs dominantes (optionnel)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.colors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-sm"
                    >
                      {color}
                      <button onClick={() => setFormData((prev) => ({
                        ...prev,
                        colors: prev.colors.filter((_, i) => i !== index),
                      }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Ex: bleu nuit, or, blanc..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddColor()}
                  />
                  <Button onClick={handleAddColor} variant="outline">+</Button>
                </div>
              </div>
            </div>
          </WizardStep>
        );

      case 2:
        return (
          <WizardStep title="Composition" description="Définissez la composition et le format">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="composition">Description de la composition</Label>
                <Textarea
                  id="composition"
                  value={formData.composition}
                  onChange={(e) => setFormData((prev) => ({ ...prev, composition: e.target.value }))}
                  placeholder="Ex: Vue de face, personnage centré, arrière-plan flou..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Ratio d'aspect</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {aspectRatios.map((ratio) => (
                    <Card
                      key={ratio.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.aspectRatio === ratio.value
                          ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                          : "hover:border-zinc-300"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, aspectRatio: ratio.value as ImagePromptConfig["aspectRatio"] }))}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="font-medium">{ratio.label}</div>
                        <div className="text-xs text-zinc-500">{ratio.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </WizardStep>
        );

      case 3:
        return (
          <WizardStep title="Détails additionnels" description="Ajoutez des détails pour enrichir le prompt">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Détails visuels (optionnel)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.details.map((detail, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm"
                    >
                      {detail}
                      <button onClick={() => setFormData((prev) => ({
                        ...prev,
                        details: prev.details.filter((_, i) => i !== index),
                      }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    placeholder="Ex: éclairage doux, haute résolution, 4K..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddDetail()}
                  />
                  <Button onClick={handleAddDetail} variant="outline">+</Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["haute résolution", "éclairage naturel", "détails nets", "profondeur de champ", "qualité studio"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setFormData((prev) => ({ ...prev, details: [...prev.details, suggestion] }))}
                    className="px-3 py-1 text-xs bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-full transition-colors"
                  >
                    + {suggestion}
                  </button>
                ))}
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
                    <Image className="h-4 w-4" />
                    <span className="text-sm">Style</span>
                  </div>
                  <div className="font-medium">
                    {imageStyles.find((s) => s.value === formData.style)?.label}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Maximize className="h-4 w-4" />
                    <span className="text-sm">Ratio</span>
                  </div>
                  <div className="font-medium">
                    {aspectRatios.find((r) => r.value === formData.aspectRatio)?.label}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="text-sm text-zinc-500 mb-2">Sujet</div>
                <div className="text-sm">{formData.subject}</div>
              </CardContent>
            </Card>
          </WizardStep>
        );

      default:
        return null;
    }
  };

  return (
    <WizardContainer
      title="Créer un prompt Image"
      description="Générez un prompt pour Midjourney, DALL·E et autres"
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