import type { PromptTemplate, PromptType } from '@/types';

export const templates: PromptTemplate[] = [
  // Templates Texte
  {
    id: 'seo-article',
    name: 'Article SEO',
    description: 'Génère un article optimisé pour le référencement avec mots-clés intégrés',
    type: 'text',
    category: 'content',
    template: `Tu es un expert en rédaction web et SEO avec 10 ans d'expérience.

[RÔLE]
Rédacteur web expert en SEO

[CONTEXTE]
Je souhaite créer un article optimisé pour les moteurs de recherche sur le sujet suivant : {sujet}.
Mots-clés cibles : {keywords}
Public cible : {audience}

[OBJECTIF]
Rédige un article complet et engageant de {length} mots qui :
- Intègre naturellement les mots-clés
- Respecte les bonnes pratiques SEO
- Apporte une vraie valeur ajoutée au lecteur

[CONTRAINTES]
- Titre H1 accrocheur avec mot-clé principal
- Structure avec H2 et H3
- Introduction percutante
- Paragraphes courts et aérés
- Call-to-action en conclusion

[FORMAT]
Article au format Markdown avec :
1. Titre
2. Introduction
3. Sections avec sous-titres
4. Conclusion avec CTA`,
    variables: ['sujet', 'keywords', 'audience', 'length'],
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Crée un email marketing persuasif et optimisé pour la conversion',
    type: 'text',
    category: 'marketing',
    template: `Tu es un copywriter expert en email marketing.

[RÔLE]
Copywriter spécialisé email marketing

[CONTEXTE]
Produit/Service : {product}
Objectif de l'email : {objective}
Public cible : {audience}

[OBJECTIF]
Crée un email qui :
- Captive immédiatement l'attention
- Présente clairement la proposition de valeur
- Génère des clics vers {cta_url}

[CONTRAINTES]
- Objet percutant (max 50 caractères)
- Texte pré-header optimisé
- Corps structuré (problème/solution/preuve/CTA)
- Ton : {tone}

[FORMAT]
1. Objet
2. Pré-header
3. Corps de l'email
4. Signature`,
    variables: ['product', 'objective', 'audience', 'cta_url', 'tone'],
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Rédige le contenu d\'une landing page optimisée pour la conversion',
    type: 'text',
    category: 'marketing',
    template: `Tu es un expert en copywriting pour landing pages.

[RÔLE]
Copywriter landing page

[CONTEXTE]
Produit : {product}
Bénéfice principal : {benefit}
Public cible : {audience}
Objectif : {objective}

[OBJECTIF]
Crée le contenu complet d'une landing page qui convertit.

[CONTRAINTES]
- Accroche puissante
- Avantages clairs
- Preuves sociales
- Objections traitées
- CTA visible et actionnable

[FORMAT]
Structure de landing page :
1. Hero section (H1 + sous-titre + CTA)
2. Section avantages
3. Témoignages
4. Démonstration
5. FAQ
6. CTA final`,
    variables: ['product', 'benefit', 'audience', 'objective'],
  },

  // Templates Image
  {
    id: 'product-photo',
    name: 'Photo Produit',
    description: 'Génère un prompt pour une photo produit professionnelle',
    type: 'image',
    category: 'commercial',
    template: `[SUBJECT]
{product_name}, {product_description}

[STYLE]
Photographie produit professionnelle, {style}

[COMPOSITION]
- Placement : {placement}
- Angle : {angle}
- Arrière-plan : {background}

[ÉCLAIRAGE]
{lighting}, studio photography

[PARAMÈTRES]
--ar {aspect_ratio} --q {quality} --s {style_strength}`,
    variables: ['product_name', 'product_description', 'style', 'placement', 'angle', 'background', 'lighting', 'aspect_ratio', 'quality', 'style_strength'],
  },
  {
    id: 'portrait-artistic',
    name: 'Portrait Artistique',
    description: 'Crée un prompt pour un portrait artistique unique',
    type: 'image',
    category: 'artistic',
    template: `[SUBJECT]
{subject_description}

[STYLE]
{art_style}, {medium}

[AMBIANCE]
{mood}, {atmosphere}

[COMPOSITION]
Portrait {composition}, {framing}

[COULEURS]
Palette : {color_palette}

[PARAMÈTRES]
--ar {aspect_ratio} --style raw --s 750`,
    variables: ['subject_description', 'art_style', 'medium', 'mood', 'atmosphere', 'composition', 'framing', 'color_palette', 'aspect_ratio'],
  },

  // Templates Web App
  {
    id: 'saas-mvp',
    name: 'SaaS MVP',
    description: 'Génère les spécifications complètes pour un MVP SaaS',
    type: 'webapp',
    category: 'saas',
    template: `Tu es un architecte logiciel expert en développement de SaaS.

[RÔLE]
Architecte logiciel senior, expert en produits SaaS

[CONTEXTE]
Je souhaite développer un MVP SaaS pour : {problem}
Solution proposée : {solution}
Public cible : {audience}

[OBJECTIF]
Fournis une architecture complète et les spécifications pour développer ce MVP.

[CONTRAINTES TECHNIQUES]
- Stack : {stack}
- Budget : {budget}
- Timeline : {timeline}
- Hébergement : {hosting}

[LIVRABLES ATTENDUS]
1. Architecture technique détaillée
2. Stack technologique recommandée
3. Structure de la base de données
4. Pages et composants principaux
5. Authentification et sécurité
6. API endpoints nécessaires
7. Intégrations tierces
8. Roadmap de développement`,
    variables: ['problem', 'solution', 'audience', 'stack', 'budget', 'timeline', 'hosting'],
  },
  {
    id: 'dashboard-app',
    name: 'Application Dashboard',
    description: 'Spécifications pour une application dashboard avec visualisations',
    type: 'webapp',
    category: 'dashboard',
    template: `Tu es un expert en conception de dashboards et visualisation de données.

[RÔLE]
Designer UX/UI et développeur full-stack

[CONTEXTE]
Type de données : {data_type}
Utilisateurs : {users}
Objectif du dashboard : {objective}

[OBJECTIF]
Conçois un dashboard intuitif et performant.

[FONCTIONNALITÉS REQUISES]
{features}

[TECHNOLOGIES]
Frontend : {frontend_stack}
Backend : {backend_stack}
Base de données : {database}

[LIVRABLES]
1. Wireframes des écrans principaux
2. Composants UI nécessaires
3. Types de graphiques recommandés
4. Système de filtres et recherche
5. Gestion des permissions
6. Performance et optimisation`,
    variables: ['data_type', 'users', 'objective', 'features', 'frontend_stack', 'backend_stack', 'database'],
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce',
    description: 'Architecture complète pour une boutique e-commerce',
    type: 'webapp',
    category: 'ecommerce',
    template: `Tu es un expert en développement e-commerce.

[RÔLE]
Architecte e-commerce senior

[CONTEXTE]
Type de produits : {products}
Marché : {market}
Volume attendu : {volume}

[OBJECTIF]
Conçois une solution e-commerce complète et scalable.

[FONCTIONNALITÉS]
{features}

[CONTRAINTES]
- Paiements : {payment_providers}
- Expédition : {shipping}
- Stock : {inventory}

[LIVRABLES]
1. Architecture technique
2. Catalogue produits
3. Tunnel d'achat
4. Gestion commandes
5. Administration
6. Intégrations (paiement, livraison)`,
    variables: ['products', 'market', 'volume', 'features', 'payment_providers', 'shipping', 'inventory'],
  },

  // Templates Vidéo
  {
    id: 'video-promo',
    name: 'Vidéo Promotionnelle',
    description: 'Prompt pour générer une vidéo promotionnelle',
    type: 'video',
    category: 'marketing',
    template: `[SCÈNE]
{scene_description}

[STYLE]
{video_style}, {quality}

[MOUVEMENTS]
{camera_movements}

[DURÉE]
{duration}

[AUDIO]
{audio_type}

[ÉLÉMENTS]
{elements}`,
    variables: ['scene_description', 'video_style', 'quality', 'camera_movements', 'duration', 'audio_type', 'elements'],
  },
];

export function getTemplatesByType(type: PromptType): PromptTemplate[] {
  return templates.filter((t) => t.type === type);
}

export function getTemplatesByCategory(category: string): PromptTemplate[] {
  return templates.filter((t) => t.category === category);
}

export function getTemplateById(id: string): PromptTemplate | undefined {
  return templates.find((t) => t.id === id);
}