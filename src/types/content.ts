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
  rating: number;
  releaseDate: string;
}

export interface CommunityPost {
  type: "community";
  id: string;
  title: string;
  author: string;
  source: string;
  upvotes: number;
  commentCount: number;
  permalink: string;
  url: string;
  thumbnailUrl?: string;
}

export type ContentItem =
  | NewsArticle
  | Recommendation
  | SocialPost
  | Movie
  | CommunityPost;

export interface ContentRef {
  id: string;
  type: ContentType;
}
