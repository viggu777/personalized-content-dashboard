import { DashboardLayout } from "@/components";
import { PersonalizedFeed } from "@/features/personalized";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your Feed</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            A personalized mix of news, movies, and social posts.
          </p>
        </div>

        <PersonalizedFeed />
      </div>
    </DashboardLayout>
  );
}
