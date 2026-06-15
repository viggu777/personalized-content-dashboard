import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { SAMPLE_SOCIAL_POSTS } from "@/constants/socialPosts";
import type { RootState } from "@/store/store";
import type { NewsArticle, Recommendation, SocialPost } from "@/types";

export interface ContentState {
  news: NewsArticle[];
  recommendations: Recommendation[];
  socialPosts: SocialPost[];
}

const initialState: ContentState = {
  news: [],
  recommendations: [],
  // Seeded with sample posts (the app has no social API); the personalized
  // feed and global search read these from Redux.
  socialPosts: SAMPLE_SOCIAL_POSTS,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<NewsArticle[]>) {
      state.news = action.payload;
    },
    setRecommendations(state, action: PayloadAction<Recommendation[]>) {
      state.recommendations = action.payload;
    },
    setSocialPosts(state, action: PayloadAction<SocialPost[]>) {
      state.socialPosts = action.payload;
    },
    /** Reset all content (e.g. on sign-out). */
    clearContent() {
      return initialState;
    },
  },
});

export const { setNews, setRecommendations, setSocialPosts, clearContent } =
  contentSlice.actions;

// Selectors
export const selectNews = (state: RootState) => state.content.news;
export const selectRecommendations = (state: RootState) =>
  state.content.recommendations;
export const selectSocialPosts = (state: RootState) =>
  state.content.socialPosts;

export default contentSlice.reducer;
