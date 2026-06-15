import type { MotionProps } from "framer-motion";

export const cardMotion: MotionProps = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  whileHover: { y: -4 },
  transition: { type: "spring", stiffness: 260, damping: 22 },
};

export const pageMotion: MotionProps = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
};
