"use client";

import { MovieResults } from "./MovieResults";
import { useGetTrendingMoviesQuery } from "./tmdbApi";

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
