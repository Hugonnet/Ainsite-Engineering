"use client";

import Link from "next/link";
import { Sparkles, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/70 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-rose-400 text-white shadow-md transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-rose-400 bg-clip-text text-transparent">
            Ainsite Engineering
          </span>
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/generate"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Créer un prompt
          </Link>
          <Link
            href="/history"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Historique
          </Link>
          <Link
            href="/templates"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-slate-600 dark:text-zinc-400"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/generate"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
            >
              Créer un prompt
            </Link>
            <Link
              href="/history"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
            >
              Historique
            </Link>
            <Link
              href="/templates"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
            >
              Templates
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
            >
              Contact
            </Link>
            <div className="border-t border-slate-200 dark:border-zinc-800 pt-3 mt-2">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="w-full p-2 text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 flex items-center gap-2 transition-colors"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="h-4 w-4" />
                      Mode sombre
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4" />
                      Mode clair
                    </>
                  )}
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}