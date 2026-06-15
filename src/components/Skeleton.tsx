import { cn } from "@/utils";

/** A single pulsing placeholder block. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded bg-zinc-100 dark:bg-zinc-800",
        className,
      )}
    />
  );
}

/** Card skeleton shape, matching each list's real card layout. */
export type CardSkeletonVariant = "feed" | "poster" | "post";

const CARD_SHELL =
  "overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900";

export function CardSkeleton({
  variant = "feed",
}: {
  variant?: CardSkeletonVariant;
}) {
  if (variant === "poster") {
    return (
      <div className={CARD_SHELL}>
        <Skeleton className="aspect-[2/3]" />
        <div className="space-y-2 p-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  if (variant === "post") {
    return (
      <div className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2.5 py-1">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  // "feed" (also used for news).
  return (
    <div className={CARD_SHELL}>
      <Skeleton className="aspect-video" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

/** A grid of card skeletons. `className` sets the grid layout. */
export function SkeletonGrid({
  count,
  variant = "feed",
  className,
}: {
  count: number;
  variant?: CardSkeletonVariant;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}

export default Skeleton;
