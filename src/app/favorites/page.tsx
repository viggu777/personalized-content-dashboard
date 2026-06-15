import { DashboardLayout } from "@/components";
import { FavoritesList } from "@/features/favorites";

export default function FavoritesPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Favorites</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Everything you&apos;ve saved, in one place.
          </p>
        </div>

        <FavoritesList />
      </div>
    </DashboardLayout>
  );
}
