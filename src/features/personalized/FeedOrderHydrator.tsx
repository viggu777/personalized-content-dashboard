"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/hooks";

import { setFeedOrder } from "./feedOrderSlice";
import { loadFeedOrder } from "./feedOrderStorage";

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
