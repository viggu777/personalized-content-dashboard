import { DashboardLayout } from "@/components";
import { CommunityFeed } from "@/features/community";

export default function CommunityPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Community Feed
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Top discussions from Hacker News.
          </p>
        </div>

        <CommunityFeed />
      </div>
    </DashboardLayout>
  );
}
