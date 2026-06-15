"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/hooks";

import { saveCategories } from "./preferencesSlice";
import { loadCategories } from "./preferencesStorage";

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
