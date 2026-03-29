import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark } from "lucide-react";
import { articles } from "@/lib/articles";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.id);
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
      {/* Article Hero */}
      <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour au blog
            </Link>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500 text-white text-xs font-bold uppercase tracking-wider mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 max-w-4xl leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-rose-400 flex items-center justify-center border-2 border-white/20">
                  <User className="w-5 h-5" />
                </div>
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} de lecture
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar / Tools */}
            <div className="md:w-16 flex md:flex-col gap-4 order-2 md:order-1">
              <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500 transition-all">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 order-1 md:order-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl md:text-2xl text-slate-600 dark:text-zinc-400 font-medium leading-relaxed mb-10 italic border-l-4 border-blue-500 pl-6">
                  {article.excerpt}
                </p>
                <div className="text-lg text-slate-800 dark:text-zinc-200 leading-relaxed space-y-6">
                  <p>{article.content}</p>
                  <p>
                    Dans les mois à venir, l&apos;ingénierie de prompt continuera d&apos;évoluer vers des systèmes plus automatisés et plus proches du langage naturel pur. Cependant, la compréhension des mécanismes sous-jacents — comme le Chain of Thought ou le Few-Shot Prompting — restera un avantage compétitif majeur pour ceux qui cherchent à extraire le maximum de valeur des LLM.
                  </p>
                  <p>
                    Restez à l&apos;écoute pour notre prochain article où nous explorerons les agents autonomes et comment ils utilisent ces techniques pour résoudre des problèmes complexes sans intervention humaine constante.
                  </p>
                </div>
                
                {/* Image Illustration in content */}
                <div className="my-12 relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                   <Image
                    src={article.image}
                    alt="Process illustration"
                    fill
                    className="object-cover"
                   />
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles CTA */}
          <div className="mt-20 pt-12 border-t border-slate-100 dark:border-zinc-900">
            <h2 className="text-2xl font-bold mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.filter(a => a.id !== article.id).slice(0, 2).map(item => (
                <Link key={item.id} href={`/blog/${item.id}`} className="group block">
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-lg group-hover:text-blue-500 transition-colors">{item.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
