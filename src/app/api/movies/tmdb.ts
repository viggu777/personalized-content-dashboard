import type { Movie } from "@/types";

const TMDB_BASE = "https://api.themoviedb.org/3";

const MOVIE_LIMIT = 12;
const MIN_RATING = 7;
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

export const hasTmdbCredentials = () =>
  Boolean(process.env.TMDB_ACCESS_TOKEN || process.env.TMDB_API_KEY);

function normalizeMovie(movie: TmdbMovie): Movie {
  return {
    type: "movie",
    id: String(movie.id),
    title: movie.title ?? movie.name ?? "Untitled",
    overview: movie.overview ?? "",
    posterUrl: movie.poster_path
      ? `/api/movies/image?path=${encodeURIComponent(movie.poster_path)}`
      : undefined,
    rating: movie.vote_average ?? 0,
    releaseDate: movie.release_date ?? "",
  };
}

async function tmdbGet(
  path: string,
  params: Record<string, string> = {},
): Promise<TmdbMovie[]> {
  const token = process.env.TMDB_ACCESS_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;
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
