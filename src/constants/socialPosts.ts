import type { SocialPost } from "@/types";

/**
 * Sample social posts.
 *
 * The app has no social API, so these seed the `content` slice and represent
 * the "social" source of the personalized feed (read back from Redux).
 * Dates are fixed (not generated) to keep the data deterministic.
 */
export const SAMPLE_SOCIAL_POSTS: SocialPost[] = [
  {
    type: "social",
    id: "s1",
    author: "Ada Lovelace",
    handle: "@ada",
    content:
      "Shipped a new analytical-engine routine today. Loops are still the most underrated abstraction. 🔁",
    createdAt: "2026-06-12T09:30:00Z",
    likes: 1280,
  },
  {
    type: "social",
    id: "s2",
    author: "Grace Hopper",
    handle: "@amazinggrace",
    content:
      "Reminder: it's easier to ask forgiveness than permission. Go build the thing.",
    createdAt: "2026-06-11T14:10:00Z",
    likes: 4230,
  },
  {
    type: "social",
    id: "s3",
    author: "Alan Kay",
    handle: "@alankay",
    content:
      "The best way to predict the future is to invent it. What are you prototyping this week?",
    createdAt: "2026-06-10T18:45:00Z",
    likes: 980,
  },
  {
    type: "social",
    id: "s4",
    author: "Margaret Hamilton",
    handle: "@mhamilton",
    content:
      "Error handling isn't an afterthought — it's the feature that keeps the rocket flying. 🚀",
    createdAt: "2026-06-09T11:20:00Z",
    likes: 3110,
  },
  {
    type: "social",
    id: "s5",
    author: "Linus T.",
    handle: "@torvalds",
    content: "Talk is cheap. Show me the code.",
    createdAt: "2026-06-08T22:05:00Z",
    likes: 7600,
  },
  {
    type: "social",
    id: "s6",
    author: "Katherine Johnson",
    handle: "@kjohnson",
    content:
      "Double-check the math, then double-check it again. Precision compounds.",
    createdAt: "2026-06-07T08:00:00Z",
    likes: 2050,
  },
];
