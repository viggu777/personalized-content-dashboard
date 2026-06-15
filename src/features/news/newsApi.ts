import { api } from "@/services/api";
import type { NewsArticle } from "@/types";

/** Shape returned by the `/api/news` route handler. */
interface NewsResponse {
  articles: NewsArticle[];
}

/**
 * News endpoints injected into the root API slice.
 *
 * `getNews` takes the list of selected categories and returns normalized
 * articles. Passing the categories as the query arg means RTK Query caches
 * per-selection and refetches automatically when the selection changes.
 */
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
