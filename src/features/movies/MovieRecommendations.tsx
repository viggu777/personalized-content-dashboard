"use client";

import { skipToken } from "@reduxjs/toolkit/query/react";

import { MovieResults } from "./MovieResults";
import {
  useGetMovieRecommendationsQuery,
  useGetTrendingMoviesQuery,
} from "./tmdbApi";

export function MovieRecommendations() {
  const { data: trending } = useGetTrendingMoviesQuery();
  const seed = trending?.[0];

  const { data, isLoading, isError, refetch } = useGetMovieRecommendationsQuery(
    seed ? seed.id : skipToken,
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">
        Recommended
        {seed && (
          <span className="font-normal text-zinc-500 dark:text-zinc-400">
            {" "}
            · more like {seed.title}
          </span>
        )}
      </h2>
      <MovieResults
        movies={data}
        isLoading={!trending || isLoading}
        isError={isError}
        onRetry={refetch}
        emptyMessage="No recommendations available."
      />
    </div>
  );
}

export default MovieRecommendations;
