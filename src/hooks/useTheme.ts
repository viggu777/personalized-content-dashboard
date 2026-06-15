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

export function useTheme() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    dispatch(setDarkMode(isDark));
  }, [dispatch]);

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
    }
  }, [darkMode]);

  return {
    theme: (darkMode ? "dark" : "light") as Theme,
    darkMode,
    toggleTheme: () => dispatch(toggleThemeAction()),
    setTheme: (next: Theme) => dispatch(setDarkMode(next === "dark")),
  };
}
