import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, Calendar } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Le Few-Shot Prompting : De la théorie à la pratique",
    excerpt: "Pourquoi donner quelques exemples à l'IA change radicalement la qualité de ses réponses complexes.",
    category: "Techniques de Base",
    author: "Sophie Durand",
    date: "24 Mars 2026",
    readTime: "6 min",
    image: "/blog/abstract-1.png"
  },
  {
    id: 2,
    title: "Think Step by Step : Maîtriser le Chain of Thought (CoT)",
    excerpt: "Comment décomposer le raisonnement de l'IA pour éviter les hallucinations dans les tâches logiques.",
    category: "Raisonnement IA",
    author: "Marc Leroy",
    date: "22 Mars 2026",
    readTime: "8 min",
    image: "/blog/abstract-2.png"
  },
  {
    id: 3,
    title: "Optimiser votre Fenêtre de Contexte",
    excerpt: "Astuces pour garder les informations essentielles sans dépasser les limites de jetons de votre modèle.",
    category: "Performance",
    author: "Léa Martin",
    date: "20 Mars 2026",
    readTime: "5 min",
    image: "/blog/hero.png"
  },
  {
    id: 4,
    title: "Tree of Thoughts (ToT) : L'IA à choix multiples",
    excerpt: "Une exploration profonde des techniques de recherche arborescente pour la résolution de problèmes.",
    category: "Avancé",
    author: "Thomas Bernard",
    date: "18 Mars 2026",
    readTime: "12 min",
    image: "/Users/ainsitenet/.gemini/antigravity/brain/9e81fd33-7179-427a-ac08-b97947d3565b/prompt_article_abstract_1_1774789628326.png"
  },
  {
    id: 5,
    title: "ReAct : Faire interagir l'IA avec le monde réel",
    excerpt: "Combiner la planification verbale avec l'utilisation d'outils pour des agents plus autonomes.",
    category: "Agents",
    author: "Julie Morel",
    date: "15 Mars 2026",
    readTime: "9 min",
    image: "/Users/ainsitenet/.gemini/antigravity/brain/9e81fd33-7179-427a-ac08-b97947d3565b/prompt_engineering_blog_hero_1774789606847.png"
  },
  {
    id: 6,
    title: "Le Negative Prompting en 2026",
    excerpt: "Comment dire à l'IA ce qu'elle ne doit PAS faire pour affiner ses résultats de manière chirurgicale.",
    category: "Précision",
    author: "Antoine Petit",
    date: "12 Mars 2026",
    readTime: "4 min",
    image: "/Users/ainsitenet/.gemini/antigravity/brain/9e81fd33-7179-427a-ac08-b97947d3565b/prompt_article_abstract_2_1774789651006.png"
  },
  {
    id: 7,
    title: "Prompt Chaining : Séquencer pour mieux régner",
    excerpt: "Pourquoi enchaîner plusieurs petits prompts vaut mieux qu'un seul énorme prompt complexe.",
    category: "Workflow",
    author: "Sarah Gomez",
    date: "10 Mars 2026",
    readTime: "7 min",
    image: "/Users/ainsitenet/.gemini/antigravity/brain/9e81fd33-7179-427a-ac08-b97947d3565b/prompt_article_abstract_1_1774789628326.png"
  },
  {
    id: 8,
    title: "Température et Top-P décryptés",
    excerpt: "Tout sur les paramètres de génération pour équilibrer créativité délirante et rigueur mathématique.",
    category: "Mathématiques",
    author: "Nicolas Vasseur",
    date: "08 Mars 2026",
    readTime: "6 min",
    image: "/Users/ainsitenet/.gemini/antigravity/brain/9e81fd33-7179-427a-ac08-b97947d3565b/prompt_engineering_blog_hero_1774789606847.png"
  },
  {
    id: 9,
    title: "L'art de l'itération infinie",
    excerpt: "Apprendre à raffiner ses prompts en se basant sur les échecs précédents de l'IA.",
    category: "Méthodologie",
    author: "Sophie Durand",
    date: "05 Mars 2026",
    readTime: "5 min",
    image: "/Users/ainsitenet/.gemini/antigravity/brain/9e81fd33-7179-427a-ac08-b97947d3565b/prompt_article_abstract_2_1774789651006.png"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Blog Hero */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-600 to-rose-500 bg-clip-text text-transparent">
              Le Mag de l&apos;Ingénierie de Prompt
            </h1>
            <p className="text-lg text-slate-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Découvrez les dernières techniques, astuces et recherches pour tirer le meilleur parti des modèles d&apos;intelligence artificielle actuels.
            </p>
          </div>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4 opacity-20">
          <div className="w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                key={article.id} 
                href={`/blog/${article.id}`} 
                className="group flex flex-col h-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Image Section with Zoom */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md rounded-full text-blue-600 dark:text-blue-400 border border-white/40 dark:border-white/10">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4 text-[10px] font-medium text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400/30 to-rose-400/30 border border-white/20 flex items-center justify-center">
                        <User className="w-3 h-3 text-slate-400" />
                      </div>
                      <span className="text-xs font-medium text-slate-500 dark:text-zinc-500">{article.author}</span>
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Restez à la pointe de l&apos;IA</h2>
              <p className="text-blue-100 mb-10 max-w-2xl mx-auto opacity-90">
                Inscrivez-vous à notre newsletter pour recevoir chaque semaine les derniers secrets du prompt engineering directement par email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" 
                />
                <button className="px-8 py-4 rounded-2xl bg-white text-blue-600 font-bold hover:bg-blue-50 transition-colors shadow-lg">
                  S&apos;abonner
                </button>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
