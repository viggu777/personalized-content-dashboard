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
    clearContent() {
      return initialState;
    },
  },
});

export const { setNews, setRecommendations, setSocialPosts, clearContent } =
  contentSlice.actions;

export const selectNews = (state: RootState) => state.content.news;
export const selectRecommendations = (state: RootState) =>
  state.content.recommendations;
export const selectSocialPosts = (state: RootState) =>
  state.content.socialPosts;

export default contentSlice.reducer;
