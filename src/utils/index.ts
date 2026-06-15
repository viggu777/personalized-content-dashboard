/**
 * Generic, framework-agnostic helper utilities.
 */

/**
 * Join conditional class names into a single string.
 * A tiny dependency-free alternative to `clsx`.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as a localized currency string. */
export function formatCurrency(value: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}

/** Pause execution for the given number of milliseconds. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Format a number compactly (e.g. 1200 → "1.2K", 1_500_000 → "1.5M"). */
export function formatCompactNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** Format an ISO date string as a short, readable date (e.g. "Jun 14, 2026"). */
export function formatDate(iso: string, locale = "en-US"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
