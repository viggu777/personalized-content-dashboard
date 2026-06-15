import { NextResponse, type NextRequest } from "next/server";

import { COMMUNITY_CATEGORIES } from "@/constants/community";
import type { CommunityPost } from "@/types";

/**
 * Server-side proxy for the Hacker News (Algolia) search API.
 *
 * Free, no auth, no app registration. Each category is a search query; results
 * are recent (last year) stories ranked by relevance/popularity. RTK Query
 * calls this route; this route calls Hacker News.
 */

const HN_SEARCH = "https://hn.algolia.com/api/v1/search";
const HN_ITEM = "https://news.ycombinator.com/item?id=";
const WINDOW_DAYS = 365;

function queryFor(category: string): string | null {
  const match = COMMUNITY_CATEGORIES.find(
    (c) => c.label.toLowerCase() === category.toLowerCase(),
  );
  return match ? match.query : null;
}

interface HnHit {
  objectID: string;
  title: string | null;
  author: string | null;
  points: number | null;
  num_comments: number | null;
  url: string | null;
}

interface HnResponse {
  hits?: HnHit[];
}

/** Bare hostname of a URL (e.g. "github.com"), or undefined. */
function hostname(url: string | null): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/** Use the source site's favicon as a lightweight thumbnail. */
function thumbnailFor(url: string | null): string | undefined {
  const host = hostname(url);
  return host
    ? `https://www.google.com/s2/favicons?domain=${host}&sz=128`
    : undefined;
}

function normalize(hit: HnHit): CommunityPost {
  return {
    type: "community",
    id: hit.objectID,
    title: hit.title ?? "(untitled)",
    author: hit.author ?? "unknown",
    source: hostname(hit.url) ?? "Hacker News",
    upvotes: hit.points ?? 0,
    commentCount: hit.num_comments ?? 0,
    permalink: `${HN_ITEM}${hit.objectID}`,
    url: hit.url ?? `${HN_ITEM}${hit.objectID}`,
    thumbnailUrl: thumbnailFor(hit.url),
  };
}

export async function GET(request: NextRequest) {
  const category =
    request.nextUrl.searchParams.get("category") ??
    COMMUNITY_CATEGORIES[0].label;

  const query = queryFor(category);
  if (!query) {
    return NextResponse.json({ message: "Unknown category." }, { status: 400 });
  }

  const since = Math.floor(Date.now() / 1000) - WINDOW_DAYS * 86400;
  const url = new URL(HN_SEARCH);
  url.searchParams.set("query", query);
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", "20");
  url.searchParams.set("numericFilters", `created_at_i>${since}`);

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: `Hacker News request failed (${res.status}).` },
        { status: 502 },
      );
    }

    const data = (await res.json()) as HnResponse;
    const posts = (data.hits ?? []).filter((h) => h.title).map(normalize);

    return NextResponse.json({ posts });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch community posts.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
