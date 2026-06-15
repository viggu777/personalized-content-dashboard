import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /** Flip between light and dark. */
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
    /** Set dark mode explicitly (e.g. to hydrate from a persisted value). */
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleTheme, setDarkMode } = themeSlice.actions;

// Selectors
export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export default themeSlice.reducer;
