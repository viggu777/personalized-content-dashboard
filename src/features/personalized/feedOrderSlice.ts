import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export interface FeedOrderState {
  /** Ordered list of feed item keys (`${type}-${id}`) reflecting user order. */
  order: string[];
}

const initialState: FeedOrderState = {
  order: [],
};

const feedOrderSlice = createSlice({
  name: "feedOrder",
  initialState,
  reducers: {
    /** Replace the custom feed order. */
    setFeedOrder(state, action: PayloadAction<string[]>) {
      state.order = action.payload;
    },
  },
});

export const { setFeedOrder } = feedOrderSlice.actions;

export const selectFeedOrder = (state: RootState) => state.feedOrder.order;

export default feedOrderSlice.reducer;
