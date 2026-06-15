import { api } from "@/services/api";
import type { NewsArticle } from "@/types";

interface NewsResponse {
  articles: NewsArticle[];
}

export const newsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNews: build.query<NewsArticle[], string[]>({
      query: (categories) => ({
        url: "/news",
        method: "GET",
        params: { categories: categories.join(",") },
      }),
      transformResponse: (response: NewsResponse) => response.articles,
      providesTags: ["News"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetNewsQuery } = newsApi;
