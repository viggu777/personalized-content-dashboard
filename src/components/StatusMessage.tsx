import type { ReactNode } from "react";
import { FiRefreshCw } from "react-icons/fi";

import { cn } from "@/utils";

export interface StatusMessageProps {
  icon: ReactNode;
  title?: string;
  description: ReactNode;
  action?: ReactNode;
  tone?: "error" | "info";
  className?: string;
}

export function StatusMessage({
  icon,
  title,
  description,
  action,
  tone = "info",
  className,
}: StatusMessageProps) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 px-6 py-16 text-center dark:border-zinc-800",
        className,
      )}
    >
      <div className="mb-3 text-zinc-400 dark:text-zinc-500">{icon}</div>
      {title && <h3 className="font-medium">{title}</h3>}
      <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export interface RetryButtonProps {
  onClick: () => void;
  label?: string;
}

export function RetryButton({ onClick, label = "Retry" }: RetryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
    >
      <FiRefreshCw className="h-4 w-4" />
      {label}
    </button>
  );
}

export default StatusMessage;
