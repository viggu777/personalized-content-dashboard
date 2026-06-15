"use client";

import { motion } from "framer-motion";
import { FiFilm, FiStar } from "react-icons/fi";

import type { Movie } from "@/types";
import { formatDate } from "@/utils";
import { cardMotion } from "@/utils/motion";

import { FavoriteButton } from "./FavoriteButton";

export interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { title, posterUrl, rating, releaseDate } = movie;

  return (
    <motion.article
      {...cardMotion}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- posters stream through our /api/movies/image proxy
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-600">
            <FiFilm className="h-10 w-10" />
          </div>
        )}

        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <FiStar className="h-3 w-3 text-amber-400" />
          {rating.toFixed(1)}
        </span>

        <FavoriteButton
          item={movie}
          className="absolute right-2 top-2 z-10 bg-white/90 shadow-sm backdrop-blur dark:bg-zinc-900/80"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold" title={title}>
          {title}
        </h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {releaseDate ? formatDate(releaseDate) : "Release date unknown"}
        </p>
      </div>
    </motion.article>
  );
}

export default MovieCard;
