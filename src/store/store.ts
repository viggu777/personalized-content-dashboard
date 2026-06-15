import { configureStore } from "@reduxjs/toolkit";

import { api } from "@/services/api";
import preferencesReducer from "@/features/preferences/preferencesSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import themeReducer from "@/features/theme/themeSlice";
import contentReducer from "@/features/content/contentSlice";
import feedOrderReducer from "@/features/personalized/feedOrderSlice";

import { listenerMiddleware } from "./listenerMiddleware";

/**
 * Configures and returns a fresh Redux store instance.
 *
 * A factory (rather than a singleton) keeps the store request-scoped, which is
 * the recommended pattern for the Next.js App Router / SSR.
 */
export const makeStore = () =>
  configureStore({
    reducer: {
      // RTK Query cache reducer.
      [api.reducerPath]: api.reducer,
      // Feature slices.
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      theme: themeReducer,
      content: contentReducer,
      feedOrder: feedOrderReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(api.middleware),
  });

// Inferred types from the store itself.
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
