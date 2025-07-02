"use client";
import React from 'react';
import { motion } from "motion/react";
import { TextHoverEffect } from './ui/text-hover-effect';
import { SparklesCore } from "./ui/sparkles";
import { ShootingStars } from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { Highlight, HeroHighlight } from './ui/hero-highlight';
import { Vortex } from './ui/vortex';

const skills = [
  {
    id: 1,
    name: "React Native",
    designation: "Cross-platform Apps",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  },
  {
    id: 2,
    name: "Expo",
    designation: "Development Toolkit",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/expo/expo-original.svg",
  },
  {
    id: 3,
    name: "JavaScript",
    designation: "Programming Language",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  },
  {
    id: 4,
    name: "TypeScript",
    designation: "Typed Superset of JS",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  },
  {
    id: 5,
    name: "Node.js",
    designation: "Backend Runtime",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  },
  {
    id: 6,
    name: "Next.js",
    designation: "React Framework",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
  },
];

const Hero = () => {
  return (
    <div className="absolute inset-0 flex w-full flex-col items-center justify-center">
      
      {/* Main content container - This now wraps all content below it */}
      <div className="relative z-20 flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
      <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-[100] mx-auto max-w-3xl py-4 text-center text-5xl font-normal   text-neutral-100"
        >Hello, I'm {' '}
      <Highlight className="text-white">
     Zhi Qiang{' '}
        </Highlight>
        </motion.p>
        <div className="h-50 w-fit">
            <TextHoverEffect text="PORTFOLIO" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-[100] mx-auto max-w-3xl py-4 text-center text-2xl font-normal   text-neutral-100"
        >
          I’ve built mobile-first solutions using Expo and React Native, and delivered fast-loading websites for real-world clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg  px-6 py-2 font-medium  transition-all duration-300 hover:-translate-y-0.5   bg-white  text-black  hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border  px-6 py-2 font-medium  transition-all duration-300 hover:-translate-y-0.5  border-gray-700  bg-black  text-white  hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>

       
      </div> 
      <ShootingStars />
      <StarsBackground />
      <div className="absolute bottom-10 z-30 flex w-full flex-row items-center justify-center">
        <AnimatedTooltip items={skills} />
      </div>
    </div>
  );
};

export default Hero;
