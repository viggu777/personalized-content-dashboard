import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { StoreProvider } from "@/store/StoreProvider";
import { PreferencesHydrator } from "@/features/preferences/PreferencesHydrator";
import { FavoritesHydrator } from "@/features/favorites/FavoritesHydrator";
import { FeedOrderHydrator } from "@/features/personalized/FeedOrderHydrator";
import { APP_NAME } from "@/constants";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Production-ready Next.js 15 application.",
};

/**
 * Applies the persisted theme before first paint to avoid a flash of the
 * wrong color scheme. Runs synchronously in <head>.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <PreferencesHydrator />
          <FavoritesHydrator />
          <FeedOrderHydrator />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
