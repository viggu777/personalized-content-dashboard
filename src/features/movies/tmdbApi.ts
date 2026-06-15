import { api } from "@/services/api";
import type { Movie } from "@/types";

interface MoviesResponse {
  movies: Movie[];
}

export const tmdbApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTrendingMovies: build.query<Movie[], void>({
      query: () => ({ url: "/movies/trending", method: "GET" }),
      transformResponse: (response: MoviesResponse) => response.movies,
      providesTags: ["Movies"],
    }),
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
