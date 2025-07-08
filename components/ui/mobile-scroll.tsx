"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * This component showcases a project image within a phone-like frame.
 * On scroll, the title fades, the phone moves to the center, and the image
 * scales up and sticks to the viewport, "following" the user's scroll.
 */
export const MobileScroll = ({
  src,
  title,
}: {
  src?: string;
  title?: string | React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Animation Definitions ---

  // The title fades out and moves up slightly as scrolling begins.
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -20]);

  // The phone group moves up to fill the space left by the title.
  const phoneGroupTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -90]);

  // The phone frame fades out after the repositioning.
  const phoneFrameOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);

  // The image scales up and stays scaled to "follow" the user.
  const imageScale = useTransform(scrollYProgress, [0.1, 0.6, 0.9], [1, 2, 2]);


  return (
    // This container defines the scrollable area for the animation.
    <div ref={containerRef} className="min-h-[180vh] relative pb-20 md:pb-40">
      {/* The sticky container uses flexbox to center its content. This is more
        robust than absolute positioning.
      */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        {/* This inner container holds our content. We add padding-top to it.
          The flexbox parent centers this whole block, and the padding pushes the
          content down, so the title (the first element) aligns perfectly
          with the screen's vertical center. The padding amount is roughly half
          the height of the phone component below the title.
        */}
        <div className="flex flex-col items-center pt-[13rem]">
          <motion.h2
            style={{
              opacity: titleOpacity,
              translateY: titleTranslateY,
            }}
            className="mb-20 text-center text-3xl font-bold text-white"
          >
            {title}
          </motion.h2>

          {/* This motion div wraps the phone and image to move them up together. */}
          <motion.div
            style={{
              translateY: phoneGroupTranslateY,
            }}
            className="relative h-[26rem] w-48"
          >
            {/* Layer 1: The phone frame (in the background). */}
            <motion.div
              style={{ opacity: phoneFrameOpacity }}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full rounded-[2rem] bg-[#171717] p-1.5 shadow-2xl">
                <div className="h-full w-full rounded-[1.8rem] bg-black"></div>
              </div>
            </motion.div>

            {/* Layer 2: The image (on top). It scales up and is not clipped. */}
            <motion.div
              style={{ scale: imageScale }}
              className="absolute inset-0 p-1.5"
            >
              <img
                src={src as string}
                alt="Project Screenshot"
                className="h-full w-full object-cover rounded-[1.8rem]"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/384x576/1F2937/FFFFFF?text=Image+Not+Found`;
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
