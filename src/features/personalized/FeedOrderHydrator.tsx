"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/hooks";

import { setFeedOrder } from "./feedOrderSlice";
import { loadFeedOrder } from "./feedOrderStorage";

/**
 * Restores the persisted feed order from localStorage into the store on mount.
 * Renders nothing; mounted once near the app root.
 */
export function FeedOrderHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = loadFeedOrder();
    if (saved.length > 0) {
      dispatch(setFeedOrder(saved));
    }
  }, [dispatch]);

  return null;
}

export default FeedOrderHydrator;
