"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AnimatedTooltip } from './animated-tooltip';
import { Skill } from "@/lib/constants";

// --- Define the structure for a single timeline entry's content ---
interface TimelineContent {
  heading: React.ReactNode;
  subheading: React.ReactNode;
  listItems: React.ReactNode[];
  skillsTitle?: string;
  skills?: Skill[];
  images?: { src: string; alt: string; className?: string }[];
}

// --- Define the structure for a single timeline entry ---
interface TimelineEntry {
  title: string;
  content: TimelineContent;
}

// --- This new component centralizes styling and renders the structured data ---
const TimelineContentComponent = ({ content }: { content: TimelineContent }) => {
  // Centralized styling configuration. Edit styles here!
  const styles = {
    heading: "text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2",
    subheading: "text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-neutral-300 mb-2 md:mb-4",
    list: "list-disc list-outside text-xs md:text-sm lg:text-base text-neutral-200 space-y-3",
    listItem: "mb-4", // Added margin bottom to list items for better spacing if needed
    skillsTitle: "text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mt-6 mb-3",
    imageGrid: "grid grid-cols-2 md:grid-flow-dense gap-4 mt-4",
    image: "w-full h-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    skillsContainer: "flex flex-row flex-wrap items-center justify-start mb-6",
  };

  return (
    <div>
      <h3 className={styles.heading}>{content.heading}</h3>
      <h4 className={styles.subheading}>{content.subheading}</h4>

      <ul className={styles.list}>
        {content.listItems.map((item, index) => (
          <li key={index} className={styles.listItem}>{item}</li>
        ))}
      </ul>

      {content.images && content.images.length > 0 && (
        <div className={styles.imageGrid}>
          {content.images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`${styles.image} ${image.className || ''}`}
            />
          ))}
        </div>
      )}

      {content.skills && content.skills.length > 0 && (
        <>
          <h5 className={styles.skillsTitle}>{content.skillsTitle || "Key Skills & Technologies"}</h5>
          <div className={styles.skillsContainer}>
            <AnimatedTooltip items={content.skills} />
          </div>
        </>
      )}
    </div>
  );
};


// This component renders the timeline UI.
export const Timeline = ({ data, scrollContainerRef }: { data: TimelineEntry[], scrollContainerRef: React.RefObject<HTMLDivElement | null> }) => {
    const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Effect to calculate the height of the timeline for animations.
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]); // Rerun on data change

  // Framer Motion hook to track scroll progress within the container.
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Transformations for animations based on scroll progress.
  const heightTransform = useTransform(scrollYProgress, [0, 1], [50, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans "
    >
        {/* --- REVISED "ABOUT ME" SECTION --- */}
        <div className="max-w-7xl mx-auto pt-4 md:pt-8 lg:pt-12 md:px-6 px-2 lg:px-8 xl:px-12 ">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 font-orbitron">
            <span className="text-yellow-400">about</span><span className="text-white">.me</span>
            </h2>
            <p className="md:text-sm lg:text-base text-xs text-neutral-300 mb-3 md:mb-6 leading-relaxed">
              I am a versatile developer who thrives on <span className=" font-bold text-neutral-50">contributing ideas</span> and <span className=" font-bold text-neutral-50">architecting robust systems</span>. With a unique background in <span className=" font-bold text-neutral-50">full-stack development, big data, and product design</span>, I enjoy visualizing how complex components fit together to solve real-world problems. My experience in <span className=" font-bold text-neutral-50">project management</span>, liaising with stakeholders, managing timelines, and coordinating execution, has given me the hands-on ability to deliver <span className=" font-bold text-neutral-50">end-to-end projects</span>, from mobile apps to websites.
            </p>
            <div className="text-neutral-300 p-2 md:p-4 rounded-lg bg-black/30 border border-green-800/50 ">
                <p className="font-mono text-xs lg:text-sm leading-relaxed">
                    <span className="text-green-500">{"// ZhiQiang.tsx"}</span><br/>
                    <span className="text-yellow-400">const</span> me = {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">core</span>: [<span className="text-orange-400">"Full-Stack"</span>, <span className="text-orange-400">"Big Data"</span>],<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">plus</span>: [<span className="text-orange-400">"Project Management"</span>, <span className="text-orange-400">"Product Design"</span>],<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">method</span>: <span className="text-blue-400">planAndExecute</span>(),<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">comms</span>: <span className="text-blue-400">liaiseWith</span>([<span className="text-orange-400">"stakeholders"</span>, <span className="text-orange-400">"clients"</span>]),<br />
                    &nbsp;&nbsp;<span className="text-purple-400">attributes</span>: [<span className="text-orange-400">"Driven"</span>, <span className="text-orange-400">"Hardworking"</span>, <span className="text-orange-400">"Fast Learner"</span>, <span className="text-orange-400">"Flexible"</span>],<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">skills</span>: {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">languages</span>: [<span className="text-orange-400">"JavaScript"</span>, <span className="text-orange-400">"TypeScript"</span>, <span className="text-orange-400">"Python"</span>],<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">frontend</span>: [<span className="text-orange-400">"React/Native"</span>, <span className="text-orange-400">"Expo"</span>],<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">backend</span>: [<span className="text-orange-400">"Node.js"</span>, <span className="text-orange-400">"MySQL"</span>, <span className="text-orange-400">"Firebase"</span>, <span className="text-orange-400">"Google Cloud"</span>],<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">tools</span>: [<span className="text-orange-400">"GitHub"</span>, <span className="text-orange-400">"Figma"</span>],<br/>
                    &nbsp;&nbsp;{'}'},<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">goal</span>: <span className="text-orange-400">"Deliver impactful solutions."</span><br/>
                    {'}'};
                </p>
            </div>
        </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
  <div
    key={index}
    className="flex justify-start pt-10 lg:pt-20"
  >
    {/* --- Title Column (1/3 width on large screens) --- */}
    <div className="sticky top-40 self-start z-40 flex flex-col items-center lg:flex-row lg:w-1/3">
      <div className="absolute left-3 lg:left-3 h-5 w-5 lg:h-10 lg:w-10 rounded-full bg-black flex items-center justify-center">
        <div className="h-2 w-2 lg:h-4 lg:w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
      </div>
      <h3 className="hidden lg:block lg:pl-20 text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-500">
        {item.title}
      </h3>
    </div>

    {/* --- Content Column (2/3 width on large screens) --- */}
    <div className="relative w-full pl-20 pr-4 lg:w-2/3 lg:pl-4">
      {/* Title for mobile view */}
      <h3 className="lg:hidden block text-2xl md:text-4xl mb-4 text-left font-bold text-neutral-500">
        {item.title}
      </h3>
      <TimelineContentComponent content={item.content} />
    </div>
  </div>
))}
        {/* --- Timeline line and animation --- */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute lg:left-8 left-5 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] :via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
