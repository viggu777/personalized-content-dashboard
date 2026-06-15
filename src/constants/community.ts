export interface CommunityCategory {
  label: string;
  query: string;
}

export const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  { label: "Technology", query: "technology" },
  { label: "Sports", query: "sports" },
  { label: "Finance", query: "finance" },
  { label: "Programming", query: "programming" },
];
