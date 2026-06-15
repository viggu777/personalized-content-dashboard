import { api } from "@/services/api";
import type { CommunityPost } from "@/types";

/** Shape returned by the `/api/community` route handler. */
interface CommunityResponse {
  posts: CommunityPost[];
}

/**
 * Community endpoints injected into the root API slice (same pattern as
 * `newsApi` / `tmdbApi`). The query arg is the category label; RTK Query caches
 * per-category and refetches when the selection changes.
 */
export const communityApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCommunityPosts: build.query<CommunityPost[], string>({
      query: (category) => ({
        url: "/community",
        method: "GET",
        params: { category },
      }),
      transformResponse: (response: CommunityResponse) => response.posts,
      providesTags: ["Community"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCommunityPostsQuery } = communityApi;
