"use client";

import { FiAlertCircle, FiFilm } from "react-icons/fi";

import { MovieCard } from "@/components/MovieCard";
import { RetryButton, SkeletonGrid, StatusMessage } from "@/components";
import type { Movie } from "@/types";

interface MovieResultsProps {
  movies?: Movie[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  emptyMessage: string;
}

const GRID =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";

export function MovieResults({
  movies,
  isLoading,
  isError,
  onRetry,
  emptyMessage,
}: MovieResultsProps) {
  if (isLoading) {
    return <SkeletonGrid count={6} variant="poster" className={GRID} />;
  }

  if (isError) {
    return (
      <StatusMessage
        tone="error"
        icon={<FiAlertCircle className="h-10 w-10" />}
        title="Couldn't load movies"
        description="Something went wrong while fetching from TMDB. Please try again."
        action={<RetryButton onClick={onRetry} />}
      />
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <StatusMessage
        icon={<FiFilm className="h-10 w-10" />}
        description={emptyMessage}
      />
    );
  }

  return (
    <div className={GRID}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieResults;
