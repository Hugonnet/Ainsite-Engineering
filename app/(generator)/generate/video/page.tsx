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
import type { VideoPromptConfig } from "@/types";
import { Video, Film, Clock, Music, Sparkles, Plus, X } from "lucide-react";

const videoStyles = [
  { value: "cinematic", label: "Cinématique", icon: "🎬", description: "Style film hollywoodien" },
  { value: "animation", label: "Animation", icon: "✨", description: "Style animé" },
  { value: "documentary", label: "Documentaire", icon: "📹", description: "Style documentaire" },
  { value: "social", label: "Social", icon: "📱", description: "Format réseaux sociaux" },
  { value: "commercial", label: "Commercial", icon: "💼", description: "Style publicitaire" },
];

const durations = [
  { value: "short", label: "Court", description: "15-30 secondes" },
  { value: "medium", label: "Moyen", description: "1-2 minutes" },
  { value: "long", label: "Long", description: "3-5 minutes" },
];

const audioOptions = [
  { value: "music", label: "Musique", icon: "🎵" },
  { value: "voiceover", label: "Voix off", icon: "🎙️" },
  { value: "ambient", label: "Ambiance", icon: "🔊" },
  { value: "none", label: "Sans audio", icon: "🔇" },
];

const stepLabels = ["Sujet", "Style", "Audio", "Détails", "Génération"];

export default function VideoGeneratorPage() {
  const router = useRouter();
  const { setPromptType, setWizardData, setGeneratedPrompt } = usePromptStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<VideoPromptConfig & { subject: string }>({
    style: "cinematic",
    duration: "medium",
    mood: "",
    transitions: [],
    audio: "music",
    elements: [],
    subject: "",
  });

  const [newElement, setNewElement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddElement = () => {
    if (newElement.trim()) {
      setFormData((prev) => ({
        ...prev,
        elements: [...prev.elements, newElement.trim()],
      }));
      setNewElement("");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const prompt = generatePrompt("video", formData);

      setPromptType("video");
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
        return formData.subject.trim().length > 10;
      case 1:
        return !!formData.style && formData.mood.trim().length > 3;
      case 2:
        return !!formData.audio;
      case 3:
        return !!formData.duration;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <WizardStep title="Sujet de la vidéo" description="Décrivez ce que vous souhaitez voir dans la vidéo">
            <div className="space-y-4">
              <Label htmlFor="subject">Description du sujet *</Label>
              <Textarea
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Ex: Un voyage à travers les montagnes avec des vues aériennes dramatiques et des transitions fluides"
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
                <Label>Style vidéo</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {videoStyles.map((style) => (
                    <Card
                      key={style.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.style === style.value
                          ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-950/30"
                          : "hover:border-zinc-300"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, style: style.value as VideoPromptConfig["style"] }))}
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
                  placeholder="Ex: épique, inspirant, dramatique, émotionnel..."
                />
              </div>
            </div>
          </WizardStep>
        );

      case 2:
        return (
          <WizardStep title="Audio" description="Choisissez le type d'audio pour votre vidéo">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Type d'audio</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {audioOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.audio === option.value
                          ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-950/30"
                          : "hover:border-zinc-300"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, audio: option.value as VideoPromptConfig["audio"] }))}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <div className="font-medium text-sm">{option.label}</div>
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
          <WizardStep title="Durée et éléments" description="Définissez la durée et ajoutez des éléments">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Durée</Label>
                <div className="grid grid-cols-3 gap-3">
                  {durations.map((duration) => (
                    <Card
                      key={duration.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.duration === duration.value
                          ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-950/30"
                          : "hover:border-zinc-300"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, duration: duration.value as VideoPromptConfig["duration"] }))}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="font-medium">{duration.label}</div>
                        <div className="text-xs text-zinc-500">{duration.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Éléments visuels (optionnel)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.elements.map((element, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/50 rounded-full text-sm"
                    >
                      {element}
                      <button onClick={() => setFormData((prev) => ({
                        ...prev,
                        elements: prev.elements.filter((_, i) => i !== index),
                      }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newElement}
                    onChange={(e) => setNewElement(e.target.value)}
                    placeholder="Ex: drone shot, slow motion, time-lapse..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddElement()}
                  />
                  <Button onClick={handleAddElement} variant="outline">+</Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {["plan large", "gros plan", "travelling", "slow motion", "time-lapse", "transition fluide"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setFormData((prev) => ({ ...prev, elements: [...prev.elements, suggestion] }))}
                      className="px-3 py-1 text-xs bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-full transition-colors"
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
          <WizardStep title="Récapitulatif" description="Vérifiez vos choix avant de générer">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Film className="h-4 w-4" />
                    <span className="text-sm">Style</span>
                  </div>
                  <div className="font-medium">
                    {videoStyles.find((s) => s.value === formData.style)?.label}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Durée</span>
                  </div>
                  <div className="font-medium">
                    {durations.find((d) => d.value === formData.duration)?.label}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Music className="h-4 w-4" />
                    <span className="text-sm">Audio</span>
                  </div>
                  <div className="font-medium">
                    {audioOptions.find((a) => a.value === formData.audio)?.label}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm">Éléments</span>
                  </div>
                  <div className="font-medium">{formData.elements.length} définis</div>
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
      title="Créer un prompt Vidéo"
      description="Générez un prompt pour les outils de création vidéo IA"
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