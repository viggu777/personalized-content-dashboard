import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";
import type { ContentItem, ContentRef } from "@/types";

export interface FavoritesState {
  /** Full content items the user has favorited. */
  favorites: ContentItem[];
}

const initialState: FavoritesState = {
  favorites: [],
};

/** Two items are the same favorite when both id and type match. */
const isSameItem = (a: ContentRef, b: ContentRef) =>
  a.id === b.id && a.type === b.type;

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    /** Add an item to favorites (no-op if already present). */
    addFavorite(state, action: PayloadAction<ContentItem>) {
      const exists = state.favorites.some((item) =>
        isSameItem(item, action.payload),
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    /** Remove an item from favorites by its reference (id + type). */
    removeFavorite(state, action: PayloadAction<ContentRef>) {
      state.favorites = state.favorites.filter(
        (item) => !isSameItem(item, action.payload),
      );
    },
    /** Replace all favorites (e.g. to hydrate from localStorage). */
    setFavorites(state, action: PayloadAction<ContentItem[]>) {
      state.favorites = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;

// Selectors
export const selectFavorites = (state: RootState) => state.favorites.favorites;

/** Returns a selector that reports whether a given item is favorited. */
export const selectIsFavorite = (ref: ContentRef) => (state: RootState) =>
  state.favorites.favorites.some((item) => isSameItem(item, ref));

export default favoritesSlice.reducer;
