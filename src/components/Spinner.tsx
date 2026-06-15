"use client";

import { motion } from "framer-motion";

import { cn } from "@/utils";

export interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <motion.span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block h-4 w-4 rounded-full border-2 border-zinc-300 border-t-indigo-600 dark:border-zinc-700 dark:border-t-indigo-400",
        className,
      )}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: "linear", duration: 0.7 }}
    />
  );
}

export default Spinner;
