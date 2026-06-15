"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/hooks";

import { saveCategories } from "./preferencesSlice";
import { loadCategories } from "./preferencesStorage";

/**
 * Restores persisted preferences from localStorage into the store on mount.
 *
 * Renders nothing. Mounted once near the app root so preferences are available
 * everywhere after a reload. localStorage is client-only, so this runs after
 * hydration rather than via SSR preloaded state.
 */
export function PreferencesHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = loadCategories();
    if (saved.length > 0) {
      dispatch(saveCategories(saved));
    }
  }, [dispatch]);

  return null;
}

export default PreferencesHydrator;
