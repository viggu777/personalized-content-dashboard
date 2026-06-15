export const CATEGORIES = [
  "Technology",
  "Sports",
  "Finance",
  "Entertainment",
  "Health",
  "Business",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PREFERENCES_STORAGE_KEY = "preferences:selectedCategories";
