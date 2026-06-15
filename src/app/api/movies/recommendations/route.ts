import { NextResponse, type NextRequest } from "next/server";

import { fetchMovieRecommendations, hasTmdbCredentials } from "../tmdb";

/** GET /api/movies/recommendations?movieId=123 — TMDB recommendations for a movie. */
export async function GET(request: NextRequest) {
  if (!hasTmdbCredentials()) {
    return NextResponse.json(
      { message: "TMDB credentials are not configured on the server." },
      { status: 500 },
    );
  }

  const movieId = request.nextUrl.searchParams.get("movieId");
  if (!movieId) {
    return NextResponse.json(
      { message: "movieId query parameter is required." },
      { status: 400 },
    );
  }

  try {
    const movies = await fetchMovieRecommendations(movieId);
    return NextResponse.json({ movies });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch recommendations.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
