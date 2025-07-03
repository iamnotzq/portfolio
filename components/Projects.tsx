"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Carousel } from './ui/carousel';

const Projects = () => {
    const slideData = [
        {
          title: "Mystic Mountains",
          button: "Explore Component",
          src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Urban Dreams",
          button: "Explore Component",
          src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Neon Nights",
          button: "Explore Component",
          src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Desert Whispers",
          button: "Explore Component",
          src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ];
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
          <Carousel slides={slideData} />
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
