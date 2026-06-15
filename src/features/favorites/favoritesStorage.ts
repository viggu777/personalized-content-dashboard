import type { ContentItem } from "@/types";

/**
 * localStorage read/write helpers for the favorites slice. Kept framework-free
 * so the persistence middleware and the hydrator can share them. All access is
 * guarded for SSR and storage failures.
 */

const FAVORITES_STORAGE_KEY = "favorites";

/** Read persisted favorites. Returns [] when unavailable or malformed. */
export function loadFavorites(): ContentItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Keep only entries that look like content items.
    return parsed.filter(
      (item): item is ContentItem =>
        Boolean(item) &&
        typeof item.id === "string" &&
        typeof item.type === "string",
    );
  } catch {
    return [];
  }
}

/** Persist favorites. */
export function persistFavorites(items: ContentItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors (quota, private mode, etc.).
  }
}
