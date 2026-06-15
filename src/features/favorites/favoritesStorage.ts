import type { ContentItem } from "@/types";

const FAVORITES_STORAGE_KEY = "favorites";

export function loadFavorites(): ContentItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
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

export function persistFavorites(items: ContentItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
}
