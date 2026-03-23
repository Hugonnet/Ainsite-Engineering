"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  Sparkles,
  History,
  Heart,
  LayoutTemplate,
  Settings,
  HelpCircle,
} from "lucide-react";

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Créer un prompt", href: "/generate", icon: Sparkles },
  { name: "Historique", href: "/history", icon: History },
  { name: "Favoris", href: "/favorites", icon: Heart },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
];

const secondaryNavigation = [
  { name: "Paramètres", href: "/settings", icon: Settings },
  { name: "Aide", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-4 px-3">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Pro Upgrade Card */}
        <div className="p-3 mt-4">
          <div className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-4 text-white">
            <h3 className="font-semibold mb-1">Passer à Pro</h3>
            <p className="text-sm text-white/80 mb-3">
              Débloquez des templates avancés et l'IA générative.
            </p>
            <button className="w-full bg-white text-violet-600 font-medium rounded-lg py-2 text-sm hover:bg-white/90 transition-colors">
              Découvrir
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}