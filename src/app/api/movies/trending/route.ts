import { NextResponse } from "next/server";

import { fetchTrendingMovies, hasTmdbCredentials } from "../tmdb";

/** GET /api/movies/trending — this year's top movies (rating ≥ 7) from TMDB. */
export async function GET() {
  if (!hasTmdbCredentials()) {
    return NextResponse.json(
      { message: "TMDB credentials are not configured on the server." },
      { status: 500 },
    );
  }

  try {
    const movies = await fetchTrendingMovies();
    return NextResponse.json({ movies });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch trending movies.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
