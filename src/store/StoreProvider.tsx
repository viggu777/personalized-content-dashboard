"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, type AppStore } from "./store";

/**
 * Client-side Redux provider.
 *
 * The store is created once per browser session and held in a ref so it is not
 * re-instantiated on re-renders. Rendered from the root layout (a server
 * component) to wrap the whole app.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
