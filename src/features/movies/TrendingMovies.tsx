"use client";

import { MovieResults } from "./MovieResults";
import { useGetTrendingMoviesQuery } from "./tmdbApi";

/** This year's top movies (rating ≥ 7) from TMDB Discover. */
export function TrendingMovies() {
  const { data, isLoading, isError, refetch } = useGetTrendingMoviesQuery();

  return (
    <MovieResults
      movies={data}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      emptyMessage="No trending movies right now."
    />
  );
}

export default TrendingMovies;
