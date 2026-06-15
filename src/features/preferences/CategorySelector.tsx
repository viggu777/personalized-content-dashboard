"use client";

import { FiCheck } from "react-icons/fi";

import { CATEGORIES } from "@/constants/categories";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { cn } from "@/utils";

import { saveCategories, selectSelectedCategories } from "./preferencesSlice";

export function CategorySelector() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelectedCategories);

  const toggle = (category: string) => {
    const next = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];
    dispatch(saveCategories(next));
  };

  const clearAll = () => dispatch(saveCategories([]));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((category) => {
          const active = selected.includes(category);
          return (
            <button
              key={category}
              type="button"
              role="checkbox"
              aria-checked={active}
              onClick={() => toggle(category)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40",
                active
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400",
              )}
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                  active
                    ? "border-white bg-white/20"
                    : "border-zinc-300 dark:border-zinc-600",
                )}
              >
                {active && <FiCheck className="h-3 w-3" />}
              </span>
              {category}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">
          {selected.length === 0
            ? "No categories selected"
            : `${selected.length} selected`}
        </span>
        <button
          type="button"
          onClick={clearAll}
          disabled={selected.length === 0}
          className="font-medium text-indigo-600 hover:underline disabled:cursor-not-allowed disabled:text-zinc-400 disabled:no-underline dark:text-indigo-400 dark:disabled:text-zinc-600"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default CategorySelector;
