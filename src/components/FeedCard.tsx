"use client";

import { motion } from "framer-motion";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiFilm,
  FiHeart,
  FiImage,
  FiMessageCircle,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";

import type { CommunityPost, Movie, NewsArticle, SocialPost } from "@/types";
import { cn, formatCompactNumber, formatDate } from "@/utils";
import { cardMotion } from "@/utils/motion";

import { FavoriteButton } from "./FavoriteButton";

/** The content types the feed / favorites render. */
export type FeedItem = NewsArticle | Movie | SocialPost | CommunityPost;

export interface FeedCardProps {
  item: FeedItem;
}

const BADGES: Record<FeedItem["type"], { label: string; className: string }> = {
  news: { label: "News", className: "bg-blue-600" },
  movie: { label: "Movie", className: "bg-purple-600" },
  social: { label: "Social", className: "bg-emerald-600" },
  community: { label: "Community", className: "bg-orange-600" },
};

/** Media region (16:9) with a graceful placeholder. */
function Media({ src, fallback }: { src?: string; fallback: React.ReactNode }) {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-600">
        {fallback}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- feed media comes from external domains / proxy
    <img
      src={src}
      alt=""
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}

/** Consistent shell shared by every feed card type. */
function CardShell({
  item,
  media,
  metaTop,
  title,
  body,
  footer,
}: {
  item: FeedItem;
  media: React.ReactNode;
  metaTop?: React.ReactNode;
  title: string;
  body?: string;
  footer: React.ReactNode;
}) {
  const badge = BADGES[item.type];
  return (
    <motion.article
      {...cardMotion}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {media}
        <span
          className={cn(
            "absolute left-2 top-2 rounded-full px-2.5 py-1 text-xs font-medium text-white",
            badge.className,
          )}
        >
          {badge.label}
        </span>
        <FavoriteButton
          item={item}
          className="absolute right-2 top-2 z-10 bg-white/90 shadow-sm backdrop-blur dark:bg-zinc-900/80"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {metaTop && (
          <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            {metaTop}
          </div>
        )}
        <h3 className="line-clamp-2 font-semibold leading-snug">{title}</h3>
        {body && (
          <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
            {body}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
          {footer}
        </div>
      </div>
    </motion.article>
  );
}

/**
 * One card design that adapts to news, movie, social, and community items so
 * the combined feed and favorites read consistently.
 */
export function FeedCard({ item }: FeedCardProps) {
  switch (item.type) {
    case "news":
      return (
        <CardShell
          item={item}
          media={<Media src={item.imageUrl} fallback={<FiImage className="h-10 w-10" />} />}
          metaTop={
            <>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {item.source}
              </span>
              {item.publishedAt && (
                <>
                  <span aria-hidden>•</span>
                  <time dateTime={item.publishedAt}>
                    {formatDate(item.publishedAt)}
                  </time>
                </>
              )}
            </>
          }
          title={item.title}
          body={item.description}
          footer={
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 font-medium text-indigo-600 hover:gap-1.5 hover:underline dark:text-indigo-400"
            >
              Read more
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </a>
          }
        />
      );

    case "movie":
      return (
        <CardShell
          item={item}
          media={<Media src={item.posterUrl} fallback={<FiFilm className="h-10 w-10" />} />}
          metaTop={
            <span className="inline-flex items-center gap-1">
              <FiStar className="h-3.5 w-3.5 text-amber-400" />
              {item.rating.toFixed(1)}
            </span>
          }
          title={item.title}
          body={item.overview}
          footer={
            <span>
              {item.releaseDate
                ? formatDate(item.releaseDate)
                : "Release date unknown"}
            </span>
          }
        />
      );

    case "social":
      return (
        <CardShell
          item={item}
          media={
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-2xl font-semibold text-white">
                {item.author.charAt(0).toUpperCase()}
              </span>
            </div>
          }
          metaTop={
            <>
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
                {item.author}
              </span>
              <span aria-hidden>•</span>
              <span>{item.handle}</span>
            </>
          }
          title={item.content}
          footer={
            <>
              <span className="inline-flex items-center gap-1">
                <FiHeart className="h-3.5 w-3.5" />
                {formatCompactNumber(item.likes)}
              </span>
              {item.createdAt && (
                <time dateTime={item.createdAt}>
                  {formatDate(item.createdAt)}
                </time>
              )}
            </>
          }
        />
      );

    case "community":
      return (
        <CardShell
          item={item}
          media={
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 text-white">
              <FiMessageCircle className="h-10 w-10" />
            </div>
          }
          metaTop={
            <>
              <span className="font-medium text-orange-600 dark:text-orange-400">
                {item.source}
              </span>
              <span aria-hidden>•</span>
              <span>by {item.author}</span>
            </>
          }
          title={item.title}
          footer={
            <>
              <span className="inline-flex items-center gap-1">
                <FiArrowUp className="h-3.5 w-3.5" />
                {formatCompactNumber(item.upvotes)}
              </span>
              <span className="inline-flex items-center gap-1">
                <FiMessageSquare className="h-3.5 w-3.5" />
                {formatCompactNumber(item.commentCount)}
              </span>
              <a
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 font-medium text-indigo-600 hover:gap-1.5 hover:underline dark:text-indigo-400"
              >
                Open
                <FiArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </>
          }
        />
      );
  }
}

export default FeedCard;
