"use client";

import { motion } from "framer-motion";
import { FiArrowUp, FiArrowUpRight, FiMessageSquare, FiImage } from "react-icons/fi";

import type { CommunityPost } from "@/types";
import { formatCompactNumber } from "@/utils";
import { cardMotion } from "@/utils/motion";

import { FavoriteButton } from "./FavoriteButton";

export interface CommunityPostCardProps {
  post: CommunityPost;
}

/**
 * Presentational card for a single community post: thumbnail, title, author,
 * upvotes, comment count, and an "Open Discussion" link to the thread.
 */
export function CommunityPostCard({ post }: CommunityPostCardProps) {
  const {
    title,
    author,
    source,
    upvotes,
    commentCount,
    permalink,
    thumbnailUrl,
  } = post;

  return (
    <motion.article
      {...cardMotion}
      className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Thumbnail with placeholder. */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- thumbnails come from external domains
          <img
            src={thumbnailUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-600">
            <FiImage className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            {source}
          </span>{" "}
          · by {author}
        </div>

        <h3 className="line-clamp-2 font-semibold leading-snug">{title}</h3>

        <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <FiArrowUp className="h-3.5 w-3.5" />
            {formatCompactNumber(upvotes)}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiMessageSquare className="h-3.5 w-3.5" />
            {formatCompactNumber(commentCount)}
          </span>
          <FavoriteButton item={post} className="ml-auto -my-1 p-1.5" />
          <a
            href={permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:gap-1.5 hover:underline dark:text-indigo-400"
          >
            Open Discussion
            <FiArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default CommunityPostCard;
