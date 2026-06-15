import { useSelector, type TypedUseSelectorHook } from "react-redux";

import type { RootState } from "@/store/store";

/** Typed `useSelector` hook — use throughout the app instead of the plain one. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
