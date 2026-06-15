"use client";

import Link from "next/link";
import { FiHeart } from "react-icons/fi";

import { FeedCard, type FeedItem } from "@/components/FeedCard";
import { StatusMessage } from "@/components";
import { useAppSelector } from "@/hooks";

import { selectFavorites } from "./favoritesSlice";

const GRID = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3";

const linkClass =
  "font-medium text-indigo-600 hover:underline dark:text-indigo-400";

export function FavoritesList() {
  const favorites = useAppSelector(selectFavorites);

  const items = favorites.filter(
    (item): item is FeedItem => item.type !== "recommendation",
  );

  if (items.length === 0) {
    return (
      <StatusMessage
        className="py-20"
        icon={<FiHeart className="h-10 w-10" />}
        title="No favorites yet"
        description={
          <>
            Tap the heart on any card to save it here. Browse{" "}
            <Link href="/news" className={linkClass}>
              News
            </Link>
            ,{" "}
            <Link href="/movies" className={linkClass}>
              Movies
            </Link>
            , or{" "}
            <Link href="/community" className={linkClass}>
              Community
            </Link>{" "}
            to get started.
          </>
        }
      />
    );
  }

  return (
    <div className={GRID}>
      {items.map((item) => (
        <FeedCard key={`${item.type}-${item.id}`} item={item} />
      ))}
    </div>
  );
}

export default FavoritesList;
