"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WorldMap } from './ui/world-map';

const About = () => {
  // Create a ref to attach to the component's main container.
  const ref = useRef(null);

  // useScroll hook tracks the scroll progress of the target element (ref).
  // The offset defines the start and end points for the animation.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  // useTransform maps the scroll progress to an opacity value.
  // This makes the content appear as the section scrolls into view.
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  // Add a subtle scale animation for a more dynamic entrance.
  const scale = useTransform(scrollYProgress, [0.9, 1], [0.85, 1]);

  return (
    // The main container is now attached to the ref and has a height of h-screen.
    // It's positioned relatively to act as a container for the animated content.
    <div ref={ref} className="relative h-screen">

      {/* This motion.div centers the content and controls its appearance. */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full items-center justify-center p-4 md:p-8"
      >
        {/* This is the new "screen" container for the map.
          - It has a max-width and a responsive height to avoid filling the screen.
          - Styling (bg, border, shadow, rounded corners) creates the "monitor" look.
          - overflow-hidden ensures the map stays within the rounded corners.
        */}
        <motion.div 
          style={{ scale }}
          className="w-full max-w-5xl h-[60vh] md:h-[70vh] bg-gray-900/30 backdrop-blur-sm border-2 border-cyan-400/40 rounded-2xl shadow-xl shadow-cyan-500/20 overflow-hidden"
        >
          <WorldMap
            dots={[
              {
                start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
              },
              {
                start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              },
              {
                start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 28.6139, lng: 77.209 }, // New Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
              },
            ]}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
