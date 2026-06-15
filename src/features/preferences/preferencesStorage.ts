import { CATEGORIES, PREFERENCES_STORAGE_KEY } from "@/constants/categories";

/**
 * localStorage read/write helpers for the preferences slice.
 *
 * Kept framework-free so both the persistence middleware and the hydrator can
 * share them. All access is guarded for SSR and storage failures.
 */

const VALID = new Set<string>(CATEGORIES);

/** Read and validate the persisted categories. Returns [] when unavailable. */
export function loadCategories(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Drop anything that is no longer a known category.
    return parsed.filter(
      (item): item is string => typeof item === "string" && VALID.has(item),
    );
  } catch {
    return [];
  }
}

/** Persist the selected categories. */
export function persistCategories(categories: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify(categories),
    );
  } catch {
    // Ignore storage errors (quota, private mode, etc.).
  }
}
