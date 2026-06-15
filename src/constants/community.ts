/** A community category mapped to its Hacker News search query. */
export interface CommunityCategory {
  label: string;
  query: string;
}

/** Categories shown in the community (Hacker News) feed. */
export const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  { label: "Technology", query: "technology" },
  { label: "Sports", query: "sports" },
  { label: "Finance", query: "finance" },
  { label: "Programming", query: "programming" },
];
