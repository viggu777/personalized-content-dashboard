/**
 * Shared, app-wide TypeScript types.
 *
 * Feature-specific types should live next to their feature in `src/features/*`.
 */

export * from "./content";

/** Generic shape for a paginated API response. */
export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

/** Normalised error returned by the axios base query. */
export interface ApiError {
  status?: number;
  message: string;
  data?: unknown;
}

/** Loading state helper used across UI components. */
export type RequestStatus = "idle" | "pending" | "succeeded" | "failed";
