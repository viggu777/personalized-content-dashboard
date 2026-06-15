import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store/store";

/** Typed `useDispatch` hook — use throughout the app instead of the plain one. */
export const useAppDispatch = () => useDispatch<AppDispatch>();
