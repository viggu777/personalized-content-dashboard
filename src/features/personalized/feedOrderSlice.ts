import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export interface FeedOrderState {
  order: string[];
}

const initialState: FeedOrderState = {
  order: [],
};

const feedOrderSlice = createSlice({
  name: "feedOrder",
  initialState,
  reducers: {
    setFeedOrder(state, action: PayloadAction<string[]>) {
      state.order = action.payload;
    },
  },
});

export const { setFeedOrder } = feedOrderSlice.actions;

export const selectFeedOrder = (state: RootState) => state.feedOrder.order;

export default feedOrderSlice.reducer;
