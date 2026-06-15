import {
  createListenerMiddleware,
  isAnyOf,
  type TypedStartListening,
} from "@reduxjs/toolkit";

import { saveCategories } from "@/features/preferences/preferencesSlice";
import { persistCategories } from "@/features/preferences/preferencesStorage";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "@/features/favorites/favoritesSlice";
import { persistFavorites } from "@/features/favorites/favoritesStorage";
import { setFeedOrder } from "@/features/personalized/feedOrderSlice";
import { persistFeedOrder } from "@/features/personalized/feedOrderStorage";

import type { AppDispatch, RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState, AppDispatch>;
const startAppListening = listenerMiddleware.startListening as AppStartListening;

// Persist selected categories to localStorage whenever they change.
startAppListening({
  actionCreator: saveCategories,
  effect: (_action, listenerApi) => {
    const { selectedCategories } = listenerApi.getState().preferences;
    persistCategories(selectedCategories);
  },
});

// Persist favorites to localStorage whenever they change.
startAppListening({
  matcher: isAnyOf(addFavorite, removeFavorite, setFavorites),
  effect: (_action, listenerApi) => {
    persistFavorites(listenerApi.getState().favorites.favorites);
  },
});

// Persist the custom feed order to localStorage whenever it changes.
startAppListening({
  actionCreator: setFeedOrder,
  effect: (_action, listenerApi) => {
    persistFeedOrder(listenerApi.getState().feedOrder.order);
  },
});
