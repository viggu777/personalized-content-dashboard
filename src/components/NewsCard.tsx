"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiImage } from "react-icons/fi";

import type { NewsArticle } from "@/types";
import { formatDate } from "@/utils";
import { cardMotion } from "@/utils/motion";

import { FavoriteButton } from "./FavoriteButton";

export interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const { title, description, url, imageUrl, source, publishedAt } = article;

  return (
    <motion.article
      {...cardMotion}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- news images come from arbitrary external domains
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-600">
            <FiImage className="h-10 w-10" />
          </div>
        )}
        <FavoriteButton
          item={article}
          className="absolute right-2 top-2 z-10 bg-white/90 shadow-sm backdrop-blur dark:bg-zinc-900/80"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            {source}
          </span>
          {publishedAt && (
            <>
              <span aria-hidden>•</span>
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </>
          )}
        </div>

        <h3 className="line-clamp-2 font-semibold leading-snug">{title}</h3>

        {description && (
          <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-indigo-600 hover:gap-2 hover:underline dark:text-indigo-400"
        >
          Read more
          <FiArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

export default NewsCard;
