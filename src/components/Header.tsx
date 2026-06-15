"use client";

import { FiMenu, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";

import { GlobalSearch } from "@/features/search";
import { useTheme } from "@/hooks";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 dark:border-zinc-800 dark:bg-zinc-950/80">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 lg:hidden dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <FiMenu className="h-5 w-5" />
      </button>

      <GlobalSearch />

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          aria-pressed={theme === "dark"}
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {theme === "dark" ? (
            <FiSun className="h-5 w-5" />
          ) : (
            <FiMoon className="h-5 w-5" />
          )}
        </button>

        <button
          type="button"
          aria-label="Account menu"
          className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:hover:bg-zinc-800"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
            VK
          </span>
          <span className="hidden text-sm font-medium sm:block">Vignesh</span>
          <FiChevronDown className="hidden h-4 w-4 text-zinc-400 sm:block" />
        </button>
      </div>
    </header>
  );
}

export default Header;
