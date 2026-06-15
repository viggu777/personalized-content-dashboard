"use client";

import { FiHeart } from "react-icons/fi";

import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from "@/features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import type { ContentItem } from "@/types";
import { cn } from "@/utils";

export interface FavoriteButtonProps {
  item: ContentItem;
  /** Extra classes for positioning/background (e.g. overlay on an image). */
  className?: string;
}

/**
 * Heart toggle for favoriting a content item. Reads its state from Redux and
 * dispatches add/remove; the persistence middleware mirrors it to localStorage.
 */
export function FavoriteButton({ item, className }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(
    selectIsFavorite({ id: item.id, type: item.type }),
  );

  const toggle = (event: React.MouseEvent) => {
    // Don't trigger any underlying link/navigation.
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite({ id: item.id, type: item.type }));
    } else {
      dispatch(addFavorite(item));
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "inline-flex items-center justify-center rounded-full p-2 text-zinc-500 transition-colors hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40 dark:text-zinc-400",
        className,
      )}
    >
      <FiHeart
        className={cn("h-4 w-4", isFavorite && "fill-current text-rose-500")}
      />
    </button>
  );
}

export default FavoriteButton;
