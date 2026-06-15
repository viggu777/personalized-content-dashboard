"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/hooks";

import { setFavorites } from "./favoritesSlice";
import { loadFavorites } from "./favoritesStorage";

/**
 * Restores persisted favorites from localStorage into the store on mount.
 * Renders nothing; mounted once near the app root.
 */
export function FavoritesHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = loadFavorites();
    if (saved.length > 0) {
      dispatch(setFavorites(saved));
    }
  }, [dispatch]);

  return null;
}

export default FavoritesHydrator;
