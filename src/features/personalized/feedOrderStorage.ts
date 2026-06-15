/**
 * localStorage read/write helpers for the feed order. SSR- and error-guarded.
 */

const FEED_ORDER_STORAGE_KEY = "feedOrder";

/** Read the persisted feed order (array of item keys). */
export function loadFeedOrder(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FEED_ORDER_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((k): k is string => typeof k === "string");
  } catch {
    return [];
  }
}

/** Persist the feed order. */
export function persistFeedOrder(order: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FEED_ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Ignore storage errors.
  }
}
