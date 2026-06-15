/**
 * Content domain types.
 *
 * Each content item carries a `type` discriminator so a heterogeneous list
 * (e.g. favorites) can be narrowed safely.
 */

export type ContentType =
  | "news"
  | "recommendation"
  | "social"
  | "movie"
  | "community";

export interface NewsArticle {
  type: "news";
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  category: string;
  publishedAt: string;
}

export interface Recommendation {
  type: "recommendation";
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
}

export interface SocialPost {
  type: "social";
  id: string;
  author: string;
  handle: string;
  avatarUrl?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Movie {
  type: "movie";
  id: string;
  title: string;
  overview: string;
  posterUrl?: string;
  /** Average rating out of 10 (TMDB `vote_average`). */
  rating: number;
  releaseDate: string;
}

export interface CommunityPost {
  type: "community";
  id: string;
  title: string;
  author: string;
  /** Where the post comes from (e.g. the article domain or "Hacker News"). */
  source: string;
  upvotes: number;
  commentCount: number;
  /** Full URL to the discussion thread. */
  permalink: string;
  /** External link the post points to (may equal the permalink for self posts). */
  url: string;
  thumbnailUrl?: string;
}

/** Any item the app can display or favorite. */
export type ContentItem =
  | NewsArticle
  | Recommendation
  | SocialPost
  | Movie
  | CommunityPost;

/** Stable identity for a content item (id can collide across types). */
export interface ContentRef {
  id: string;
  type: ContentType;
}
