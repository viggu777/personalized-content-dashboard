"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

/**
 * Route-segment error boundary. Next.js renders this when a page or its data
 * throws during rendering. `reset()` retries the segment.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
        <FiAlertTriangle className="h-7 w-7" />
      </span>
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        An unexpected error occurred. You can try again, and if the problem
        persists, reload the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
      >
        <FiRefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
