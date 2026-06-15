import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";

import type { ApiError } from "@/types";

import { axiosInstance } from "./axiosInstance";

/** Arguments accepted by the axios base query. */
export interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

/**
 * A RTK Query `baseQuery` implementation backed by our shared Axios instance.
 *
 * This lets every RTK Query endpoint reuse the same interceptors, base URL,
 * and timeout configuration as imperative Axios calls.
 */
export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const result = await axiosInstance({ url, method, data, params, headers });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          message: err.message,
          data: err.response?.data,
        },
      };
    }
  };

export default axiosBaseQuery;
