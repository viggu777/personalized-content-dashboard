import { api } from "@/services/api";
import type { CommunityPost } from "@/types";

interface CommunityResponse {
  posts: CommunityPost[];
}

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
