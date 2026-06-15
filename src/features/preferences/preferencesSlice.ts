import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export interface PreferencesState {
  /** Categories the user has chosen to personalize their content. */
  selectedCategories: string[];
}

const initialState: PreferencesState = {
  selectedCategories: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    /** Replace the full set of selected categories. */
    saveCategories(state, action: PayloadAction<string[]>) {
      // De-duplicate to keep the list clean.
      state.selectedCategories = Array.from(new Set(action.payload));
    },
  },
});

export const { saveCategories } = preferencesSlice.actions;

// Selectors
export const selectSelectedCategories = (state: RootState) =>
  state.preferences.selectedCategories;

export default preferencesSlice.reducer;
