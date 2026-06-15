import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "./axiosBaseQuery";

/**
 * Root RTK Query API slice.
 *
 * Feature endpoints are added later with `api.injectEndpoints(...)` so that
 * each feature stays self-contained and code-splittable. Keep this file free
 * of concrete endpoints.
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  // Register cache tags here as features are added.
  tagTypes: ["News", "Movies", "Community"],
  endpoints: () => ({}),
});

export default api;
