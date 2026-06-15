"use client";

import { useState } from "react";
import { FiAlertCircle, FiInbox } from "react-icons/fi";

import { CommunityPostCard } from "@/components/CommunityPostCard";
import { RetryButton, SkeletonGrid, StatusMessage } from "@/components";
import { COMMUNITY_CATEGORIES } from "@/constants/community";
import { cn } from "@/utils";

import { useGetCommunityPostsQuery } from "./communityApi";

const GRID = "grid grid-cols-1 gap-4 lg:grid-cols-2";

export function CommunityFeed() {
  const [category, setCategory] = useState(COMMUNITY_CATEGORIES[0].label);
  const { data, isLoading, isFetching, isError, refetch } =
    useGetCommunityPostsQuery(category);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Community categories">
        {COMMUNITY_CATEGORIES.map((c) => {
          const active = c.label === category;
          return (
            <button
              key={c.label}
              type="button"
              role="tab"
              onClick={() => setCategory(c.label)}
              aria-selected={active}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40",
                active
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <SkeletonGrid count={6} variant="post" className={GRID} />
      ) : isError ? (
        <StatusMessage
          tone="error"
          icon={<FiAlertCircle className="h-10 w-10" />}
          title="Couldn't load community posts"
          description="Something went wrong while fetching from Hacker News. Please try again."
          action={<RetryButton onClick={() => refetch()} />}
        />
      ) : !data || data.length === 0 ? (
        <StatusMessage
          icon={<FiInbox className="h-10 w-10" />}
          title="No posts found"
          description={`There are no posts in ${category} right now.`}
        />
      ) : (
        <div className={GRID} aria-busy={isFetching}>
          {data.map((post) => (
            <CommunityPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommunityFeed;
