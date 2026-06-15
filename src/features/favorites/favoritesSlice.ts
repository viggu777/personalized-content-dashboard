import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";
import type { ContentItem, ContentRef } from "@/types";

export interface FavoritesState {
  favorites: ContentItem[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const isSameItem = (a: ContentRef, b: ContentRef) =>
  a.id === b.id && a.type === b.type;

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<ContentItem>) {
      const exists = state.favorites.some((item) =>
        isSameItem(item, action.payload),
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<ContentRef>) {
      state.favorites = state.favorites.filter(
        (item) => !isSameItem(item, action.payload),
      );
    },
    setFavorites(state, action: PayloadAction<ContentItem[]>) {
      state.favorites = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.favorites;

export const selectIsFavorite = (ref: ContentRef) => (state: RootState) =>
  state.favorites.favorites.some((item) => isSameItem(item, ref));

export default favoritesSlice.reducer;
