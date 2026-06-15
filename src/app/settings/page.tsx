import { DashboardLayout } from "@/components";
import { CategorySelector } from "@/features/preferences/CategorySelector";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Personalize your experience.
          </p>
        </div>

        <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-medium">Content categories</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Choose the topics you care about. Your selection is saved
            automatically and restored next time you visit.
          </p>
          <div className="mt-5">
            <CategorySelector />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
