"use client";
import React from 'react';
import { motion } from "motion/react";
import { TextHoverEffect } from './ui/text-hover-effect';
import { SparklesCore } from "./ui/sparkles";

const Hero = () => {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      {/* Decorative lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
     
      {/* Main content container - This now wraps all content below it */}
      <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
        
        {/* The "DEVELOPER" text */}
        <div className="h-80">
            <TextHoverEffect text="DEVELOPER" />
        </div>

        {/* Sparkles container */}
        <div className="relative -mt-20 h-40 w-[40rem]">
            {/* Gradients for effect */}
            <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
            <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
            <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
    
            {/* Sparkles Component - Corrected for light background */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="h-full w-full"
              particleColor="#000000" // Changed to black for visibility on white background
            />
    
            {/* Radial Gradient to fade out sparkles, corrected for light background */}
            <div className="absolute inset-0 h-full w-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          I’ve built mobile-first solutions using Expo and React Native, and delivered fast-loading websites for real-world clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div> {/* This closing div is now in the correct place */}
    </div>
  );
};

export default Hero;
