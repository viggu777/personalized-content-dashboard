export * from "./content";

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiError {
  status?: number;
  message: string;
  data?: unknown;
}

export type RequestStatus = "idle" | "pending" | "succeeded" | "failed";
