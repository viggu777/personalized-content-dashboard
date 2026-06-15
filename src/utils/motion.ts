import type { MotionProps } from "framer-motion";

/**
 * Shared entrance + hover animation for content cards: a subtle fade/rise on
 * mount and a gentle lift on hover. Spring-based so it feels smooth, not abrupt.
 */
export const cardMotion: MotionProps = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  whileHover: { y: -4 },
  transition: { type: "spring", stiffness: 260, damping: 22 },
};

/** Page-content transition: a quick, clean fade on each navigation. */
export const pageMotion: MotionProps = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
};
