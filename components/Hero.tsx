"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { TextHoverEffect } from './ui/text-hover-effect';
import { ShootingStars } from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';
import { AnimatedTooltip } from './ui/animated-tooltip';

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
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <ShootingStars />
      <StarsBackground />

      {/* Background Text - using font-orbitron */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <TextHoverEffect
            text="PORTFOLIO"
                />
      </div>
      
      {/* Foreground Content Container */}
      <div className="pointer-events-none relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start justify-center px-6 lg:px-8">
        
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pointer-events-auto font-orbitron text-left text-4xl text-neutral-300 md:text-5xl"
        >
            Hello!
        </motion.p>

        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pointer-events-auto font-orbitron mt-2 text-left text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl"
        >
            I'm Zhi Qiang.
        </motion.h1>

        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pointer-events-auto mt-4 max-w-4xl text-left text-3xl font-semibold text-neutral-400 md:text-4xl"
        >
            I bring ideas to life on web and mobile.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pointer-events-auto relative mt-8 max-w-2xl text-left text-xl font-normal text-neutral-300 md:text-2xl"
        >
          I have hands-on experience creating engaging landing pages with React and building full-featured mobile applications with Expo, delivering seamless user experiences across platforms.
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="pointer-events-auto mt-10 flex w-full justify-start"
        >
            <AnimatedTooltip items={skills} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="pointer-events-auto relative z-10 mt-8 flex flex-wrap items-center justify-start gap-4"
        >
          <a href="/resume.pdf" download>
            <button className="flex w-auto transform items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20">
              <Download className="h-5 w-5" />
              Resume
            </button>
          </a>
          <a href="#contact">
            <button className="w-auto transform rounded-lg border border-gray-700 bg-transparent px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10">
              Get In Touch
            </button>
          </a>
        </motion.div>

      </div> 
    </div>
  );
};

export default Hero;
