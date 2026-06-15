import { Spinner } from "@/components/Spinner";

/** Route-level loading fallback shown while a segment streams in. */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Spinner className="h-8 w-8" />
    </div>
  );
}
