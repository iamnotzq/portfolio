"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

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
  }, [ref]);

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
      className="w-full font-sans md:px-10"
    >
        {/* --- REVISED "ABOUT ME" SECTION --- */}
        <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10">
            <h2 className="text-5xl font-bold text-white mb-4 font-orbitron">
            <span className="text-yellow-400">about</span><span className="text-white">.me</span>
            </h2>
            {/* --- ADDED TEXT DESCRIPTION --- */}
            <p className="text-neutral-300 mb-6 leading-relaxed">
              I am a versatile developer who thrives on <span className=" font-bold text-neutral-50">contributing ideas</span> and <span className=" font-bold text-neutral-50">architecting robust systems</span>. With a unique background in <span className=" font-bold text-neutral-50">full-stack development, big data, and product design</span>, I enjoy visualizing how complex components fit together to solve real-world problems. My experience in <span className=" font-bold text-neutral-50">project management</span>, liaising with stakeholders, managing timelines, and coordinating execution, has given me the hands-on ability to deliver <span className=" font-bold text-neutral-50">end-to-end projects</span>, from mobile apps to websites.
            </p>
            <div className="text-neutral-300 p-4 rounded-lg bg-black/30 border border-green-800/50 ">
                <p className="font-mono text-sm leading-relaxed">
                    <span className="text-green-500">{"// ZhiQiang.tsx"}</span><br/>
                    <span className="text-yellow-400">const</span> me = {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">core</span>: [<span className="text-orange-400">"Full-Stack"</span>, <span className="text-orange-400">"Big Data"</span>],<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">plus</span>: [<span className="text-orange-400">"Project Management"</span>, <span className="text-orange-400">"Product Design"</span>],<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">method</span>: <span className="text-blue-400">planAndExecute</span>(),<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">comms</span>: <span className="text-blue-400">liaiseWith</span>([<span className="text-orange-400">"stakeholders"</span>, <span className="text-orange-400">"clients"</span>]),<br />
                    &nbsp;&nbsp;<span className="text-purple-400">attributes</span>: [<span className="text-orange-400">"Driven"</span>, <span className="text-orange-400">"Hardworking"</span>, <span className="text-orange-400">"Fast Learner"</span>, <span className="text-orange-400">"Flexible"</span>],<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">skills</span>: 
                    [<span className="text-orange-400">"JavaScript"</span>, <span className="text-orange-400">"TypeScript"</span>, <span className="text-orange-400">"React/Native"</span>, <span className="text-orange-400">"Node.js"</span>, <span className="text-orange-400">"Python"</span>, <span className="text-orange-400">"Expo"</span>, <span className="text-orange-400">"MySQL"</span>, <span className="text-orange-400">"Firebase"</span>, <span className="text-orange-400">"Google Cloud"</span>, <span className="text-orange-400">"GitHub"</span>, <span className="text-orange-400">"Figma"</span>],<br/>
                    
                    &nbsp;&nbsp;<span className="text-purple-400">goal</span>: <span className="text-orange-400">"Deliver impactful solutions."</span><br/>
                    {'}'};
                </p>
            </div>
        </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full  bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        {/* --- Timeline line and animation --- */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] :via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
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
