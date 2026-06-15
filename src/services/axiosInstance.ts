import axios from "axios";

import { API_BASE_URL, REQUEST_TIMEOUT_MS } from "@/constants";

/**
 * Shared Axios instance.
 *
 * Use this for any imperative HTTP calls. RTK Query routes its requests
 * through the same instance via `axiosBaseQuery`, so interceptors defined
 * here apply everywhere.
 */
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach auth token, etc.
axiosInstance.interceptors.request.use((config) => {
  // Example: read token from storage and attach it.
  // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — central place for global error handling.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
