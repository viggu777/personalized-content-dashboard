"use client";

import { useEffect, useRef } from "react";

import {
  selectDarkMode,
  setDarkMode,
  toggleTheme as toggleThemeAction,
} from "@/features/theme/themeSlice";

import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Bridges the `theme` Redux slice to the DOM.
 *
 * - On mount, hydrates the slice from the `dark` class applied by the no-flash
 *   script in the root layout (which itself reads localStorage / system pref).
 * - Whenever `darkMode` changes, syncs the `<html>` class and localStorage.
 *
 * Components should use this for reading/toggling the theme so there is a
 * single source of truth (the store).
 */
export function useTheme() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  // Hydrate the store from the DOM once on mount.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    dispatch(setDarkMode(isDark));
  }, [dispatch]);

  // Sync store -> DOM + localStorage, skipping the initial commit so we don't
  // clobber the value the no-flash script already applied.
  const isFirstSync = useRef(true);
  useEffect(() => {
    if (isFirstSync.current) {
      isFirstSync.current = false;
      return;
    }
    document.documentElement.classList.toggle("dark", darkMode);
    try {
      localStorage.setItem(STORAGE_KEY, darkMode ? "dark" : "light");
    } catch {
      // Ignore storage errors (e.g. private mode).
    }
  }, [darkMode]);

  return {
    theme: (darkMode ? "dark" : "light") as Theme,
    darkMode,
    toggleTheme: () => dispatch(toggleThemeAction()),
    setTheme: (next: Theme) => dispatch(setDarkMode(next === "dark")),
  };
}
