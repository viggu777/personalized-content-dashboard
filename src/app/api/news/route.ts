import { NextResponse, type NextRequest } from "next/server";

import type { NewsArticle } from "@/types";

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

const CATEGORY_MAP: Record<string, string> = {
  Technology: "technology",
  Sports: "sports",
  Finance: "business",
  Entertainment: "entertainment",
  Health: "health",
  Business: "business",
};

interface NewsApiArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsApiResponse {
  status: "ok" | "error";
  articles?: NewsApiArticle[];
  message?: string;
}

function normalize(article: NewsApiArticle, category: string): NewsArticle {
  return {
    type: "news",
    id: article.url,
    title: article.title,
    description: article.description ?? "",
    url: article.url,
    imageUrl: article.urlToImage ?? undefined,
    source: article.source?.name ?? "Unknown",
    category,
    publishedAt: article.publishedAt,
  };
}

async function fetchForLabel(
  label: string | null,
  apiKey: string,
): Promise<{ label: string; raw: NewsApiArticle[] }> {
  const url = new URL(NEWS_API_URL);
  url.searchParams.set("country", "us");
  url.searchParams.set("pageSize", "20");
  if (label) {
    url.searchParams.set("category", CATEGORY_MAP[label]);
  }

  const res = await fetch(url, {
    headers: { "X-Api-Key": apiKey },
    cache: "no-store",
  });
  const data = (await res.json()) as NewsApiResponse;

  if (!res.ok || data.status !== "ok") {
    throw new Error(data.message ?? "NewsAPI request failed.");
  }

  return { label: label ?? "General", raw: data.articles ?? [] };
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "NEWS_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const categories = (request.nextUrl.searchParams.get("categories") ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c in CATEGORY_MAP);

  const tasks =
    categories.length > 0
      ? categories.map((label) => fetchForLabel(label, apiKey))
      : [fetchForLabel(null, apiKey)];

  try {
    const results = await Promise.all(tasks);

    const seen = new Set<string>();
    const articles: NewsArticle[] = [];
    for (const { label, raw } of results) {
      for (const a of raw) {
        if (!a.url || !a.title || a.title === "[Removed]") continue;
        if (seen.has(a.url)) continue;
        seen.add(a.url);
        articles.push(normalize(a, label));
      }
    }
    articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

    return NextResponse.json({ articles });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch news.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
