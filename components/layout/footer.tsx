import Link from "next/link";
import { Sparkles, GithubIcon, TwitterIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50/50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-rose-400 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-rose-400 bg-clip-text text-transparent">
                Ainsite Engineering
              </span>
            </Link>

            <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-md">
              Générez des prompts optimisés pour l'IA en quelques clics.
              L'outil indispensable pour les créateurs, développeurs et agences web.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Produit</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/generate" className="text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Générateur
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Ainsite Engineering. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}