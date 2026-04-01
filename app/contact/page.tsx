"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Message envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(data.error || "Erreur lors de l'envoi");
      }
    } catch (error) {
      setSubmitMessage("Erreur de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-lg text-muted-foreground">
          Un projet ? N'hésitez pas à nous consulter gratuitement 🙂
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <Card>
          <CardHeader>
            <CardTitle>Envoyez-nous un message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </Button>
              {submitMessage && (
                <p className={`text-sm ${submitMessage.includes("succès") ? "text-green-600" : "text-red-600"}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Informations de contact */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notre adresse</CardTitle>
            </CardHeader>
            <CardContent>
              <p>160 Rue de la Croix</p>
              <p>01460 Béard-Géovreissiat</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nous joindre</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Téléphone : 06.76.90.96.17</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nous écrire</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email : contact@ainsite.net</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section prestations inspirée */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Nos prestations</h2>
        <p className="text-muted-foreground mb-6">
          Nous proposons des sites e-commerce propulsés par les solutions open source Prestashop ou Woocommerce,
          ainsi que des applications mobiles et bien d'autres services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Création de sites internet</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Nous concevons et développons des sites web de toutes natures : site vitrine, site corporate ou site-e-commerce.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Nous vous proposons systématiquement un contrat de maintenance global de votre site incluant les MAJ de contenus et de sécurité.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tous nos sites sont hébergés sur serveurs dédiés pour une bande passante importante et une sécurité accrue.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}