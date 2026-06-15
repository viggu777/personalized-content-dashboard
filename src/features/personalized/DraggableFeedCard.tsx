"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { RxDragHandleDots2 } from "react-icons/rx";

import { FeedCard, type FeedItem } from "@/components/FeedCard";

/** React DnD item type for feed cards. */
export const FEED_CARD_TYPE = "FEED_CARD";

interface DragItem {
  index: number;
}

export interface DraggableFeedCardProps {
  item: FeedItem;
  index: number;
  /** Live-reorder (called while hovering over another card). */
  moveCard: (from: number, to: number) => void;
}

/**
 * A feed card wrapped as a React DnD sortable item. Dragging happens via the
 * grip handle (so links/heart stay clickable); reordering is live, and the
 * layout transition animates the other cards smoothly.
 */
export function DraggableFeedCard({
  item,
  index,
  moveCard,
}: DraggableFeedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: FEED_CARD_TYPE,
    item: () => ({ index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop<DragItem>({
    accept: FEED_CARD_TYPE,
    hover(dragged) {
      if (!ref.current) return;
      const dragIndex = dragged.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCard(dragIndex, hoverIndex);
      // Mutate the monitor item so subsequent hovers compare correctly.
      dragged.index = hoverIndex;
    },
  });

  // The whole card is the drop target + drag preview; only the handle drags.
  preview(drop(ref));
  drag(handleRef);

  return (
    <motion.div
      ref={ref}
      layout
      transition={{ type: "spring", stiffness: 600, damping: 40 }}
      animate={{ opacity: isDragging ? 0.4 : 1 }}
      className="relative"
    >
      <button
        ref={handleRef}
        type="button"
        aria-label="Drag to reorder"
        title="Drag to reorder"
        className="absolute left-1/2 top-2 z-20 -translate-x-1/2 cursor-grab rounded-full bg-white/90 p-1 text-zinc-500 shadow-sm backdrop-blur transition-colors hover:text-zinc-800 active:cursor-grabbing dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <RxDragHandleDots2 className="h-4 w-4" />
      </button>
      <FeedCard item={item} />
    </motion.div>
  );
}

export default DraggableFeedCard;
