/** Content categories a user can subscribe to in Settings. */
export const CATEGORIES = [
  "Technology",
  "Sports",
  "Finance",
  "Entertainment",
  "Health",
  "Business",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** localStorage key under which selected categories are persisted. */
export const PREFERENCES_STORAGE_KEY = "preferences:selectedCategories";
