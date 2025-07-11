"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Compare } from "./compare";

// Define the prop types for our dynamic components.
// This makes the component's API clear and type-safe.
type ImageContentProps = {
  type: "image";
  props: {
    src: string;
    alt: string;
    className?: string;
  };
};

type CompareContentProps = {
  type: "compare";
  props: React.ComponentProps<typeof Compare>;
};

type CodeBlockContentProps = {
  type: "code";
  props: React.ComponentProps<typeof CodeBlock>;
};

type CustomContentProps = {
  type: "custom";
  props: {
    content: React.ReactNode;
  };
};

// A single content item for the scroll component can be one of the above types.
// We export this type so it can be used in other files for type safety.
export type ContentItem = {
  title: string;
  description: string | React.ReactNode;
  content:
    | ImageContentProps
    | CompareContentProps
    | CodeBlockContentProps
    | CustomContentProps;
};

/**
 * The main StickyScroll component. It takes an array of ContentItem objects
 * and renders them in a sticky scroll layout.
 */
export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: ContentItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  // This hook updates the active card based on the scroll progress.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  /**
   * Renders the correct component based on the content type specified
   * in the active card's data.
   * @param item The active ContentItem.
   * @returns A React component.
   */
  const renderContent = (item: ContentItem) => {
    switch (item.content.type) {
      case "image":
        return (
          <img
            {...item.content.props}
            className={cn("h-full w-full object-cover", item.content.props.className)}
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/800x600/000000/FFFFFF?text=Image+Not+Found`;
            }}
          />
        );
      case "compare":
        return <Compare {...item.content.props} />;
      case "code":
        return <CodeBlock {...item.content.props} />;
      case "custom":
        return item.content.props.content;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="relative flex flex-col lg:flex-row gap-10 p-10"
      ref={ref}
    >
      {/* Left Column for Text Descriptions */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div>
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="flex h-screen flex-col justify-center p-20 "
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.15 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-5xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0.5 }}
                animate={{ opacity: activeCard === index ? 1 : 0.15 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-xl mt-5 w-[35rem] text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      
      {/* Right Column for Sticky Visual Content */}
      <div className="w-full lg:w-1/2 hidden lg:block">
        <div className="sticky top-10 flex h-screen items-center justify-center">
          <div
            className={cn(
              "h-[30rem] w-[35rem] overflow-hidden rounded-lg bg-slate-900",
              contentClassName
            )}
          >
            {/* AnimatePresence ensures smooth transitions between different content types */}
            <AnimatePresence mode="wait">
              <motion.div
                key={content[activeCard].title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full w-full"
              >
                {renderContent(content[activeCard])}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
