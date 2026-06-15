import { api } from "@/services/api";
import type { Movie } from "@/types";

/** Shape returned by the `/api/movies/*` route handlers. */
interface MoviesResponse {
  movies: Movie[];
}

/**
 * TMDB endpoints injected into the root API slice (same pattern as `newsApi`).
 * Trending uses TMDB Discover; recommendations use TMDB's real recommendations.
 */
export const tmdbApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTrendingMovies: build.query<Movie[], void>({
      query: () => ({ url: "/movies/trending", method: "GET" }),
      transformResponse: (response: MoviesResponse) => response.movies,
      providesTags: ["Movies"],
    }),
    // Real TMDB recommendations for a given movie id.
    getMovieRecommendations: build.query<Movie[], string>({
      query: (movieId) => ({
        url: "/movies/recommendations",
        method: "GET",
        params: { movieId },
      }),
      transformResponse: (response: MoviesResponse) => response.movies,
      providesTags: ["Movies"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTrendingMoviesQuery, useGetMovieRecommendationsQuery } =
  tmdbApi;
