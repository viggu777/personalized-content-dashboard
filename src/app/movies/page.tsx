import { DashboardLayout } from "@/components";
import { MovieRecommendations, TrendingMovies } from "@/features/movies";

export default function MoviesPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Movies</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            This year&apos;s top-rated movies (rating 7+), powered by TMDB.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Trending Movies</h2>
          <TrendingMovies />
        </section>

        <section>
          <MovieRecommendations />
        </section>
      </div>
    </DashboardLayout>
  );
}
