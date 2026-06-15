"use client";

import { FiAlertCircle, FiInbox } from "react-icons/fi";

import { NewsCard } from "@/components/NewsCard";
import { RetryButton, SkeletonGrid, StatusMessage } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectSelectedCategories } from "@/features/preferences/preferencesSlice";

import { useGetNewsQuery } from "./newsApi";

const GRID = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3";

/**
 * Fetches news for the user's selected categories and renders the appropriate
 * loading / error / empty / success state.
 */
export function NewsFeed() {
  const categories = useAppSelector(selectSelectedCategories);
  const { data, isLoading, isFetching, isError, refetch } =
    useGetNewsQuery(categories);

  if (isLoading) {
    return <SkeletonGrid count={6} variant="feed" className={GRID} />;
  }

  if (isError) {
    return (
      <StatusMessage
        tone="error"
        icon={<FiAlertCircle className="h-10 w-10" />}
        title="Couldn't load news"
        description="Something went wrong while fetching the latest headlines. Please try again."
        action={<RetryButton onClick={() => refetch()} />}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <StatusMessage
        icon={<FiInbox className="h-10 w-10" />}
        title="No articles found"
        description="There are no headlines for your selected categories right now. Try adjusting your preferences in Settings."
      />
    );
  }

  return (
    <div className={GRID} aria-busy={isFetching}>
      {data.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default NewsFeed;
