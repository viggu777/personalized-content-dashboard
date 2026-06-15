# PCD — Personalized Content Dashboard

A production-ready **Next.js 15** content-aggregator dashboard. PCD pulls
**News**, **Movies**, and **Community** discussions into a single, personalized
feed you can search, reorder by drag-and-drop, favorite, and theme — all with a
clean, responsive SaaS UI.

Built with the App Router, TypeScript, Redux Toolkit + RTK Query, Tailwind CSS,
Framer Motion, and React DnD.

---

## ✨ Features

- **Personalized feed** — News, Movies, and Social posts merged into one
  interleaved stream with **infinite scroll** and skeleton loaders.
- **Drag-and-drop reordering** — reorder feed cards (React DnD); the order is
  persisted to Redux + `localStorage` and restored on reload.
- **Global search** — debounced (500 ms) search across News, Movies, and Social,
  with **relevance ranking** so the closest match surfaces first.
- **Favorites** — heart any card to save it; favorites persist across sessions
  and have a dedicated page.
- **Category preferences** — choose the topics you care about in Settings; they
  drive the News and feed queries and persist locally.
- **Dedicated sources** — standalone **News**, **Movies** (trending +
  recommendations), and **Community** (Hacker News) pages.
- **Dark mode** — system-aware, toggle in the header, no flash on load, persisted.
- **Polished UX** — Framer Motion page transitions, card hover/entrance
  animations, and consistent loading / empty / error states everywhere.
- **Resilient** — React error boundaries plus route-level `error`, `not-found`,
  and `loading` UIs.
- **Accessible** — semantic roles (combobox/listbox, tablist), `aria-*` state,
  keyboard-visible focus rings, and labelled controls.

---

## 🧰 Tech Stack

| Concern        | Library                                  |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 15 (App Router)                  |
| Language       | TypeScript                               |
| Styling        | Tailwind CSS v4 (class-based dark mode)  |
| State          | Redux Toolkit + React Redux              |
| Data fetching  | RTK Query (over a shared Axios instance) |
| HTTP client    | Axios                                    |
| Animation      | Framer Motion                            |
| Drag & drop    | React DnD (HTML5 backend)                |
| Icons          | React Icons                              |

**External data sources** (proxied server-side):
[NewsAPI](https://newsapi.org), [TMDB](https://www.themoviedb.org), and the
[Hacker News (Algolia) API](https://hn.algolia.com/api).

---

## 🚀 Setup Instructions

**Prerequisites:** Node.js 18.18+ (Node 20+ recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
#    then edit .env.local and fill in your keys (see below)

# 3. Run the dev server
npm run dev          # http://localhost:3000

# Other scripts
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
```

### Environment variables

All keys are **server-side only** — they are used by the API route handlers and
never shipped to the browser.

| Variable                   | Required | Purpose                                                  |
| -------------------------- | -------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | yes      | Base URL for the internal API (default `…/api`)          |
| `NEWS_API_KEY`             | News     | [NewsAPI](https://newsapi.org) key                       |
| `TMDB_ACCESS_TOKEN`        | Movies   | TMDB v4 read access token (preferred), **or** …          |
| `TMDB_API_KEY`             | Movies   | … TMDB v3 API key                                        |

The Community feed uses the public Hacker News API and needs **no key**. If a
key is missing, only that source's section shows its error state — the rest of
the app keeps working.

---

## 🏗️ Architecture Explanation

### Folder structure

```
src/
├── app/            # App Router routes, layouts, route-level error/loading/not-found
│   └── api/        # Server route handlers proxying NewsAPI, TMDB, Hacker News
├── components/     # Reusable, presentational UI (cards, Skeleton, StatusMessage,
│                   #   ErrorBoundary, layout shell)
├── features/       # Feature modules: slice + RTK Query endpoints + UI, co-located
│   ├── news/ movies/ community/ personalized/ favorites/
│   ├── preferences/ search/ theme/ content/
├── services/       # API layer: Axios instance, axios base query, root RTK Query api
├── store/          # Redux store factory, Provider, persistence middleware
├── hooks/          # Typed Redux hooks, useDebounce, useTheme
├── types/          # Shared, app-wide TypeScript types
├── utils/          # Generic helpers + Framer Motion presets
└── constants/      # Navigation, categories, seed data
```

### Data flow

```
UI component
   └─ RTK Query hook (useGetNewsQuery, …)
        └─ root api slice  (src/services/api.ts, endpoints injected per feature)
             └─ axiosBaseQuery  →  shared Axios instance
                  └─ Next.js Route Handler  (src/app/api/*)  ← keeps API keys secret
                       └─ external API (NewsAPI / TMDB / Hacker News)
```

- **Server route handlers as proxies.** Every external call goes through
  `src/app/api/*`, which holds the secrets, normalizes responses into the app's
  domain types, and sidesteps CORS. The client never sees a third-party key.
- **One Axios instance, one base query.** `axiosBaseQuery` adapts the shared
  Axios instance to RTK Query, so interceptors, base URL, and timeouts are
  reused by every endpoint.
- **Feature-sliced state.** Each feature owns its slice and/or injected
  endpoints (`api.injectEndpoints`) and its UI, keeping modules self-contained
  and code-splittable. The store is assembled in `src/store/store.ts`.
- **Discriminated unions.** `ContentItem` (`news | movie | social | community |
  recommendation`) carries a `type` tag so the heterogeneous feed, favorites,
  and search can narrow each item safely without `any`.
- **Persistence.** A Redux **listener middleware** mirrors preferences,
  favorites, and feed order to `localStorage` on change; lightweight hydrator
  components rehydrate them on mount. Theme is applied pre-paint by an inline
  script in the root layout to avoid a flash.
- **Request-scoped store.** `makeStore()` is a factory (not a singleton) created
  once per client session in `StoreProvider`, the recommended App Router pattern.
- **Resilience.** A client `ErrorBoundary` wraps page content (the shell
  survives a subtree crash), complemented by route-level `error.tsx`,
  `global-error.tsx`, `not-found.tsx`, and `loading.tsx`.

### Adding a feature

1. Create `src/features/<name>/`.
2. Add a slice (`createSlice`) and/or inject endpoints into the root `api`.
3. Register the slice reducer in `src/store/store.ts`.
4. Build the feature UI in the same folder and route it under `src/app/`.

---

## 📸 Screenshots

> Add screenshots / GIFs here once the app is running locally.

| View              | Preview                              |
| ----------------- | ------------------------------------ |
| Personalized feed | _`docs/screenshots/feed.png`_        |
| Search            | _`docs/screenshots/search.png`_      |
| Movies            | _`docs/screenshots/movies.png`_      |
| Favorites         | _`docs/screenshots/favorites.png`_   |
| Dark mode         | _`docs/screenshots/dark-mode.png`_   |

_Capture each view, drop the images under `docs/screenshots/`, and replace the
placeholders above._

---

## 📄 License

Released for educational / assignment purposes.
