import Link from "next/link";
import { FiArrowLeft, FiCompass } from "react-icons/fi";

/** Rendered for unmatched routes (404). */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <FiCompass className="h-7 w-7" />
      </span>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to feed
      </Link>
    </div>
  );
}
