import { CATEGORIES, PREFERENCES_STORAGE_KEY } from "@/constants/categories";

const VALID = new Set<string>(CATEGORIES);

export function loadCategories(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is string => typeof item === "string" && VALID.has(item),
    );
  } catch {
    return [];
  }
}

export function persistCategories(categories: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify(categories),
    );
  } catch {
  }
}
