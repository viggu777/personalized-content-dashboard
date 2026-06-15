"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { pageMotion } from "@/utils/motion";

import { ErrorBoundary } from "./ErrorBoundary";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * App shell: fixed left sidebar, sticky top header, and a scrollable main
 * content area. Manages the open/closed state of the sidebar on mobile.
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content column — offset by the sidebar width on desktop. */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Animate only the content on each navigation (header/sidebar persist). */}
        <motion.main
          key={pathname}
          className="flex-1 p-4 sm:p-6 lg:p-8"
          {...pageMotion}
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </motion.main>
      </div>
    </div>
  );
}

export default DashboardLayout;
