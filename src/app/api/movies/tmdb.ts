import type { Movie } from "@/types";

/**
 * Server-side TMDB helpers shared by the movie route handlers.
 *
 * Runs on the server only so credentials stay secret and CORS is avoided.
 * Supports either a v4 read access token (Bearer) or a v3 API key.
 *
 * Trending is fully dynamic via TMDB's Discover API — no hardcoded lists.
 */

const TMDB_BASE = "https://api.themoviedb.org/3";

/** How many movies to surface. */
const MOVIE_LIMIT = 12;
/** Minimum rating (TMDB vote_average ≈ IMDb scale, 0–10). */
const MIN_RATING = 7;
/** Minimum vote count so the rating is meaningful (drops obscure entries). */
const MIN_VOTES = 50;

interface TmdbMovie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
}

interface TmdbListResponse {
  results?: TmdbMovie[];
  success?: boolean;
  status_message?: string;
}

/** True when either a v4 token or a v3 API key is configured. */
export const hasTmdbCredentials = () =>
  Boolean(process.env.TMDB_ACCESS_TOKEN || process.env.TMDB_API_KEY);

function normalizeMovie(movie: TmdbMovie): Movie {
  return {
    type: "movie",
    id: String(movie.id),
    title: movie.title ?? movie.name ?? "Untitled",
    overview: movie.overview ?? "",
    // Route posters through our own image proxy so they load on any network
    // (the browser never has to reach image.tmdb.org directly).
    posterUrl: movie.poster_path
      ? `/api/movies/image?path=${encodeURIComponent(movie.poster_path)}`
      : undefined,
    rating: movie.vote_average ?? 0,
    releaseDate: movie.release_date ?? "",
  };
}

/** Authenticated GET against TMDB; returns the raw `results` array. */
async function tmdbGet(
  path: string,
  params: Record<string, string> = {},
): Promise<TmdbMovie[]> {
  const token = process.env.TMDB_ACCESS_TOKEN; // v4 read access token (Bearer)
  const apiKey = process.env.TMDB_API_KEY; // v3 API key (query param)
  if (!token && !apiKey) {
    throw new Error("TMDB credentials are not configured.");
  }

  const url = new URL(`${TMDB_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const headers: Record<string, string> = { accept: "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (apiKey) {
    url.searchParams.set("api_key", apiKey);
  }

  const res = await fetch(url, { headers, cache: "no-store" });
  const data = (await res.json()) as TmdbListResponse;

  if (!res.ok || data.success === false) {
    throw new Error(data.status_message ?? "TMDB request failed.");
  }
  return data.results ?? [];
}

/**
 * Trending = this year's most popular movies with a rating ≥ 7, newest year
 * first, limited to 12. Pure Discover filters — no manual movie list.
 */
export async function fetchTrendingMovies(): Promise<Movie[]> {
  const year = new Date().getUTCFullYear();
  const results = await tmdbGet("/discover/movie", {
    include_adult: "false",
    language: "en-US",
    sort_by: "popularity.desc",
    primary_release_year: String(year),
    "vote_average.gte": String(MIN_RATING),
    "vote_count.gte": String(MIN_VOTES),
    page: "1",
  });
  return results.map(normalizeMovie).slice(0, MOVIE_LIMIT);
}

/** Real TMDB recommendations for a given movie id. */
export async function fetchMovieRecommendations(
  movieId: string,
): Promise<Movie[]> {
  const results = await tmdbGet(
    `/movie/${encodeURIComponent(movieId)}/recommendations`,
    { language: "en-US", page: "1" },
  );
  return results
    .map(normalizeMovie)
    .filter((m) => m.posterUrl)
    .slice(0, MOVIE_LIMIT);
}
