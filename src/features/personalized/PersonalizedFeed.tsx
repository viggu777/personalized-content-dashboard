"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiAlertCircle, FiInbox } from "react-icons/fi";

import { FeedCard, type FeedItem } from "@/components/FeedCard";
import {
  CardSkeleton,
  RetryButton,
  SkeletonGrid,
  StatusMessage,
} from "@/components";
import { selectSocialPosts } from "@/features/content/contentSlice";
import { useGetTrendingMoviesQuery } from "@/features/movies/tmdbApi";
import { useGetNewsQuery } from "@/features/news/newsApi";
import { selectSelectedCategories } from "@/features/preferences/preferencesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { DraggableFeedCard } from "./DraggableFeedCard";
import { selectFeedOrder, setFeedOrder } from "./feedOrderSlice";

const PAGE_SIZE = 8;
const GRID = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3";

const keyOf = (item: FeedItem) => `${item.type}-${item.id}`;

function interleave(...lists: FeedItem[][]): FeedItem[] {
  const out: FeedItem[] = [];
  const max = Math.max(0, ...lists.map((l) => l.length));
  for (let i = 0; i < max; i++) {
    for (const list of lists) {
      if (i < list.length) out.push(list[i]);
    }
  }
  return out;
}

function applyOrder(items: FeedItem[], order: string[]): FeedItem[] {
  if (order.length === 0) return items;
  const byKey = new Map(items.map((i) => [keyOf(i), i] as const));
  const used = new Set<string>();
  const ordered: FeedItem[] = [];
  for (const key of order) {
    const item = byKey.get(key);
    if (item) {
      ordered.push(item);
      used.add(key);
    }
  }
  for (const item of items) {
    if (!used.has(keyOf(item))) ordered.push(item);
  }
  return ordered;
}

export function PersonalizedFeed() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectSelectedCategories);
  const socialPosts = useAppSelector(selectSocialPosts);
  const savedOrder = useAppSelector(selectFeedOrder);

  const news = useGetNewsQuery(categories);
  const movies = useGetTrendingMoviesQuery();

  const items = useMemo<FeedItem[]>(
    () => interleave(news.data ?? [], movies.data ?? [], socialPosts),
    [news.data, movies.data, socialPosts],
  );

  const displayItems = useMemo(
    () => applyOrder(items, savedOrder),
    [items, savedOrder],
  );

  const moveCard = useCallback(
    (from: number, to: number) => {
      const next = displayItems.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      dispatch(setFeedOrder(next.map(keyOf)));
    },
    [displayItems, dispatch],
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible((v) => Math.min(v + PAGE_SIZE, displayItems.length));
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [displayItems.length]);

  const initialLoading =
    items.length === 0 && (news.isLoading || movies.isLoading);
  const allFailed =
    items.length === 0 &&
    !news.isLoading &&
    !movies.isLoading &&
    news.isError &&
    movies.isError;

  if (initialLoading) {
    return <SkeletonGrid count={PAGE_SIZE} variant="feed" className={GRID} />;
  }

  if (allFailed) {
    return (
      <StatusMessage
        tone="error"
        icon={<FiAlertCircle className="h-10 w-10" />}
        title="Couldn't load your feed"
        description="Something went wrong while fetching news and movies. Please try again."
        action={
          <RetryButton
            onClick={() => {
              news.refetch();
              movies.refetch();
            }}
          />
        }
      />
    );
  }

  if (items.length === 0) {
    return (
      <StatusMessage
        icon={<FiInbox className="h-10 w-10" />}
        title="Your feed is empty"
        description="There's nothing to show yet. Pick some categories in Settings to personalize it."
      />
    );
  }

  const shown = displayItems.slice(0, visible);
  const hasMore = visible < displayItems.length;

  const cards = shown.map((item, index) =>
    mounted ? (
      <DraggableFeedCard
        key={keyOf(item)}
        item={item}
        index={index}
        moveCard={moveCard}
      />
    ) : (
      <FeedCard key={keyOf(item)} item={item} />
    ),
  );

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Tip: drag the handle at the top of a card to reorder your feed — the
        order is saved automatically.
      </p>

      {mounted ? (
        <DndProvider backend={HTML5Backend}>
          <div className={GRID}>{cards}</div>
        </DndProvider>
      ) : (
        <div className={GRID}>{cards}</div>
      )}

      {hasMore && (
        <div ref={sentinelRef} className={GRID} aria-hidden>
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} variant="feed" />
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonalizedFeed;
