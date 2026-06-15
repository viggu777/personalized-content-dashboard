import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export interface PreferencesState {
  selectedCategories: string[];
}

const initialState: PreferencesState = {
  selectedCategories: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    saveCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = Array.from(new Set(action.payload));
    },
  },
});

export const { saveCategories } = preferencesSlice.actions;

export const selectSelectedCategories = (state: RootState) =>
  state.preferences.selectedCategories;

export default preferencesSlice.reducer;
