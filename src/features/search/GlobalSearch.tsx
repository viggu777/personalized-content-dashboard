"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { FiFilm, FiMessageCircle, FiRss, FiSearch, FiX } from "react-icons/fi";

import { Spinner } from "@/components/Spinner";
import { selectSocialPosts } from "@/features/content/contentSlice";
import { useGetTrendingMoviesQuery } from "@/features/movies/tmdbApi";
import { useGetNewsQuery } from "@/features/news/newsApi";
import { selectSelectedCategories } from "@/features/preferences/preferencesSlice";
import { useAppSelector, useDebounce } from "@/hooks";
import type { Movie, NewsArticle, SocialPost } from "@/types";

const MAX_RESULTS = 8;

type SearchResult =
  | { kind: "news"; item: NewsArticle }
  | { kind: "movie"; item: Movie }
  | { kind: "social"; item: SocialPost };

function relevance(primary: string, secondary: string, term: string): number {
  const title = primary.toLowerCase();
  let score = 0;
  if (title === term) score = 4;
  else if (title.startsWith(term)) score = 3;
  else if (new RegExp(`\\b${escapeRegExp(term)}`).test(title)) score = 2;
  else if (title.includes(term)) score = 1;

  if (secondary.toLowerCase().includes(term)) {
    score = score === 0 ? 0.5 : score + 0.5;
  }
  return score;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();

  const debounced = useDebounce(query, 500);
  const term = debounced.trim().toLowerCase();
  const hasQuery = term.length > 0;

  const categories = useAppSelector(selectSelectedCategories);
  const news = useGetNewsQuery(hasQuery ? categories : skipToken);
  const movies = useGetTrendingMoviesQuery(hasQuery ? undefined : skipToken);
  const socialPosts = useAppSelector(selectSocialPosts);

  const results = useMemo<SearchResult[]>(() => {
    if (!hasQuery) return [];

    const scored: Array<{ result: SearchResult; score: number }> = [];

    for (const item of news.data ?? []) {
      const score = relevance(
        item.title,
        `${item.description} ${item.source}`,
        term,
      );
      if (score > 0) scored.push({ result: { kind: "news", item }, score });
    }
    for (const item of movies.data ?? []) {
      const score = relevance(item.title, item.overview, term);
      if (score > 0) scored.push({ result: { kind: "movie", item }, score });
    }
    for (const item of socialPosts) {
      const score = relevance(
        item.content,
        `${item.author} ${item.handle}`,
        term,
      );
      if (score > 0) scored.push({ result: { kind: "social", item }, score });
    }

    return scored
      .map((entry, index) => ({ ...entry, index }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, MAX_RESULTS)
      .map((entry) => entry.result);
  }, [hasQuery, term, news.data, movies.data, socialPosts]);

  const isLoading = hasQuery && (news.isLoading || movies.isLoading);

  useEffect(() => {
    function onDocMouseDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const showDropdown = open && hasQuery;

  return (
    <div ref={containerRef} className="relative flex-1 sm:max-w-md">
      <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      <input
        type="search"
        value={query}
        placeholder="Search news, movies, posts..."
        aria-label="Search"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={listboxId}
        aria-autocomplete="list"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:bg-zinc-950"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:hover:text-zinc-200"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {results.length > 0 ? (
            <>
              <ul id={listboxId} role="listbox" aria-label="Search results" className="space-y-0.5">
                {results.map((result) => (
                  <li key={`${result.kind}-${result.item.id}`} role="option" aria-selected={false}>
                    <ResultRow
                      result={result}
                      onNavigate={() => setOpen(false)}
                    />
                  </li>
                ))}
              </ul>
              {isLoading && (
                <div className="flex items-center justify-center gap-2 px-3 pt-2 text-xs text-zinc-400 dark:text-zinc-500">
                  <Spinner className="h-3 w-3" />
                  Searching more…
                </div>
              )}
            </>
          ) : isLoading ? (
            <div
              role="status"
              className="flex items-center justify-center gap-2 px-3 py-6 text-sm text-zinc-500 dark:text-zinc-400"
            >
              <Spinner />
              Searching…
            </div>
          ) : (
            <p className="px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No results for &ldquo;{debounced.trim()}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ResultRow({
  result,
  onNavigate,
}: {
  result: SearchResult;
  onNavigate: () => void;
}) {
  const base =
    "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-zinc-100 focus:outline-none focus-visible:bg-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800";

  const { icon, title, meta, href, external } = describe(result);

  const content = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{title}</span>
        <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">
          {meta}
        </span>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={base}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className={base}>
      {content}
    </Link>
  );
}

function describe(result: SearchResult): {
  icon: React.ReactNode;
  title: string;
  meta: string;
  href: string;
  external: boolean;
} {
  switch (result.kind) {
    case "news":
      return {
        icon: <FiRss className="h-4 w-4" />,
        title: result.item.title,
        meta: `News · ${result.item.source}`,
        href: result.item.url,
        external: true,
      };
    case "movie":
      return {
        icon: <FiFilm className="h-4 w-4" />,
        title: result.item.title,
        meta: `Movie · ★ ${result.item.rating.toFixed(1)}`,
        href: "/movies",
        external: false,
      };
    case "social":
      return {
        icon: <FiMessageCircle className="h-4 w-4" />,
        title: result.item.content,
        meta: `Social · ${result.item.author}`,
        href: "/",
        external: false,
      };
  }
}

export default GlobalSearch;
