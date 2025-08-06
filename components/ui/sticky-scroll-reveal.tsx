"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Compare } from "./compare";
import { Lens } from "./lens";

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
  width?: string; // Optional: custom width for the content
  height?: string; // Optional: custom height for the content
  content:
    | ImageContentProps
    | CompareContentProps
    | CodeBlockContentProps
    | CustomContentProps;
};

/**
 * The main StickyScroll component. It now renders two different layouts:
 * 1. A non-sticky, stacked layout for mobile devices.
 * 2. The original sticky-scroll layout for desktop devices.
 */
export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: ContentItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  // The ref is now attached to the desktop-only container.
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // The scroll hook is targeted to the desktop container.
    // On mobile, ref.current will be null, and the hook will not have an effect.
    target: ref,
    offset: ["start start", "end end"],
  });

  // If there is no content, we avoid rendering the component to prevent errors.
  if (!content || content.length === 0) {
    return null;
  }

  const cardLength = content.length;

  // This hook updates the active card based on the scroll progress for the desktop view.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (cardLength < 2) {
      return;
    }
    const cardsBreakpoints = content.map(
      (_, index) => index / (cardLength - 1)
    );
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
    const [hovering, setHovering] = useState(false);
    switch (item.content.type) {
      case "image":
        return (
          <Lens hovering={hovering} setHovering={setHovering}>
          <img
            {...item.content.props}
            className={cn("h-full w-full object-cover", item.content.props.className)}
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/800x600/000000/FFFFFF?text=Image+Not+Found`;
            }}
            />
            </Lens>
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

  // Default dimensions if not provided in the content data
  const DEFAULT_WIDTH = "45rem";
  const DEFAULT_HEIGHT = "30rem";

  return (
    // The main container. It holds both mobile and desktop layouts,
    // and their visibility is controlled by Tailwind's responsive classes.
    <div>
      {/* ====== Mobile Layout ====== */}
      {/* This layout is visible on screens smaller than 'lg'. */}
      {/* It stacks each content item (text and visual) vertically. */}
      <div className="flex flex-col gap-10 p-10 lg:hidden mb-40">
        {content.map((item, index) => (
          <div key={item.title + index}>
            <div
              style={{
                width: "100%", // On mobile, content should take full width
                height: item.height || DEFAULT_HEIGHT,
              }}
              className={cn(
                "overflow-hidden rounded-lg bg-slate-900",
                contentClassName
              )}
            >
              {renderContent(item)}
            </div>
            {/* Text Content (Left side on desktop) */}
            <div className="mt-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-100">{item.title}</h2>
              <p className="text-base mt-2 text-slate-300">
                {item.description}
              </p>
            </div>
            
            
          </div>
        ))}
      </div>

      {/* ====== Desktop Layout ====== */}
      {/* This is the original sticky layout, now only visible on 'lg' screens and up. */}
      <motion.div
        className="hidden lg:flex flex-row gap-10 p-10"
        ref={ref}
      >
        {/* Left Column for Text Descriptions */}
        <div className="w-1/2 flex justify-center items-start pt-20">
          <div className="w-full max-w-xl">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                className="flex h-screen flex-col justify-center"
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.15 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-2xl lg:text-4xl 2xl:text-5xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.15 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-base lg:text-xl mt-5 w-full text-slate-300"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
            <div className="h-40" />
          </div>
        </div>
        
        {/* Right Column for Sticky Visual Content */}
        <div className="w-1/2">
          <div className="sticky top-10 flex h-screen items-center justify-center">
            <motion.div
              key={`content-container-${activeCard}`}
              animate={{
                width: content[activeCard]?.width || DEFAULT_WIDTH,
                height: content[activeCard]?.height || DEFAULT_HEIGHT,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "overflow-hidden rounded-lg bg-slate-900",
                contentClassName
              )}
            >
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
