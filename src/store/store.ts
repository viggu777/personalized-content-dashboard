import { configureStore } from "@reduxjs/toolkit";

import { api } from "@/services/api";
import preferencesReducer from "@/features/preferences/preferencesSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import themeReducer from "@/features/theme/themeSlice";
import contentReducer from "@/features/content/contentSlice";
import feedOrderReducer from "@/features/personalized/feedOrderSlice";

import { listenerMiddleware } from "./listenerMiddleware";

export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
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

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
