// Hero.tsx

"use client";
import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import { TextHoverEffect } from './ui/text-hover-effect';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { SKILLS } from '@/lib/constants';

const Hero = ({
  id,
  onMenuClick,
  setPointerText,
  setPointerVisible,
  pointerText,
  resumeButtonText,
  connectButtonText,
  pointerPosition,
}: {
  id?: string;
  onMenuClick: (id: "contact") => void;
  setPointerText: (text: string) => void;
  setPointerVisible: (visible: boolean) => void;
  pointerText: string;
  resumeButtonText: string;
  connectButtonText: string;
  pointerPosition: { x: number; y: number };
}) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.5]);

  return (
    <div 
      id={id} 
      className="relative h-screen w-full sticky top-0 pointer-events-auto"
      onMouseEnter={() => {
        setPointerText(pointerText);
        setPointerVisible(true);
      }}
      onMouseLeave={() => {
        setPointerVisible(false);
      }}
    >
      
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto"
      >
        <TextHoverEffect text="PORTFOLIO" cursorPosition={pointerPosition} />
      </motion.div>

     
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 flex h-full flex-col items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-none mx-auto flex w-full max-w-7xl flex-col items-start px-6 lg:px-8">
         
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pointer-events-auto font-orbitron text-left text-4xl text-neutral-300 md:text-5xl"
          >
           <span className="text-green-600">// Hello, world!</span>
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
           From project plans to{" "}
            <span className="text-green-500">production code &lt;/&gt;</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pointer-events-auto relative mt-8 max-w-3xl text-left text-xl font-normal text-neutral-300 md:text-2xl"
          >
            My experience in both{" "}
            <span className="text-blue-400 font-semibold">project management</span> and{" "}
            <span className="text-blue-400 font-semibold">development</span> has enabled me to
            deliver impactful solutions, including a{" "}
            <span className="text-green-400 font-semibold">production mobile app</span> and{" "}
            <span className="text-green-400 font-semibold">company website</span>. I'm a{" "}
            <span className="text-yellow-400 font-semibold">hands-on problem solver</span>,
            ready to contribute my skills to a great team.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="pointer-events-auto mt-10 flex w-full justify-start"
            onMouseEnter={() => setPointerVisible(false)}
            onMouseLeave={() => setPointerVisible(true)}
          >
            <AnimatedTooltip items={SKILLS} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="pointer-events-auto relative z-10 mt-8 flex flex-wrap items-center justify-start gap-4"
          >
            <a
              href="/resume.pdf"
              download
              className=" font-orbitron flex w-auto transform items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20"
              onMouseEnter={() => setPointerText(resumeButtonText)}
              onMouseLeave={() => setPointerText(pointerText)}
            >
              <Download className="h-5 w-5" />
              Resume
            </a>
            <button
              onClick={() => onMenuClick("contact")}
              className="font-orbitron w-auto transform rounded-lg border-2 border-gray-700 bg-transparent px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10"
              onMouseEnter={() => setPointerText(connectButtonText)}
              onMouseLeave={() => setPointerText(pointerText)}
            >
              Let's Connect
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
