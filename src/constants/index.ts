/**
 * Application-wide constants.
 *
 * Keep magic strings/numbers here so they have a single source of truth.
 */

/** Base URL for the backend API. Configure via `NEXT_PUBLIC_API_BASE_URL`. */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

/** Default request timeout for HTTP calls, in milliseconds. */
export const REQUEST_TIMEOUT_MS = 15_000;

/** App metadata. */
export const APP_NAME = "PCD";
