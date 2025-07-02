"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  // Create a ref to attach to the component's main container.
  const ref = useRef(null);

  // useScroll hook tracks the scroll progress of the target element (ref).
  // The offset defines the start and end points for the animation.
  // "start end" means the animation starts when the top of the component hits the bottom of the viewport.
  // "start start" means the animation ends when the top of the component hits the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  // useTransform maps the scroll progress to an opacity value.
  // Here, the opacity will switch from 0 to 1 when the scroll progress is between 0.99 and 1.
  // This makes the background and content appear instantly when the section is fully in view.
  const opacity = useTransform(scrollYProgress, [0.99, 1], [0, 1]);

  return (
    // The main container is now attached to the ref and has a height of h-screen.
    // It's positioned relatively to act as a container for the animated background.
    <div ref={ref} className="relative h-screen">
      {/* This motion.div is the new background.
          It's positioned absolutely to fill the entire container.
          Its opacity is controlled by the `useTransform` hook, making it appear instantly on scroll. */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-0 bg-transparent"
      />
      {/* The content is placed in a motion container with a higher z-index
          and its opacity is linked to the same scroll progress as the background. */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">About Me</h2>
          <p className="mt-4 text-lg text-neutral-300">This section scrolls over the globe and the Hero section.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
