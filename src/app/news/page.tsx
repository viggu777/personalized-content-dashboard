import { DashboardLayout } from "@/components";
import { NewsFeed } from "@/features/news";

export default function NewsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">News</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            The latest headlines from your selected categories.
          </p>
        </div>

        <NewsFeed />
      </div>
    </DashboardLayout>
  );
}
