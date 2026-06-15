import type { IconType } from "react-icons";
import {
  FiZap,
  FiRss,
  FiFilm,
  FiUsers,
  FiHeart,
  FiSettings,
} from "react-icons/fi";

/** A single sidebar navigation entry. */
export interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

/** Primary sidebar navigation. */
export const NAV_ITEMS: NavItem[] = [
  { label: "For You", href: "/", icon: FiZap },
  { label: "News", href: "/news", icon: FiRss },
  { label: "Movies", href: "/movies", icon: FiFilm },
  { label: "Community", href: "/community", icon: FiUsers },
  { label: "Favorites", href: "/favorites", icon: FiHeart },
  { label: "Settings", href: "/settings", icon: FiSettings },
];
