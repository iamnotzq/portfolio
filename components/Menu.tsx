// Menu.tsx

"use client";
import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    IconBriefcase,
    IconUser,
    IconMail,
    IconX,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { WorldMap } from './ui/world-map';
import { Carousel } from './ui/carousel';
import { cn } from "@/lib/utils";
// Import the data from the new file
import { slideData } from '@/lib/projects-data';
import { Timeline } from './ui/timeline';


interface MenuProps {
    activeItem: string | null;
    setActiveItem: (id: string | null) => void;
    id?: string;
}
const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-3.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/templates/startup-4.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more example of beautiful designs I built.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Deployed 5 new components on Aceternity today
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Card grid component
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Startup template Aceternity
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Random file upload lol
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Salman Bhai Fan Club registrations open
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

// CHANGE: Pass down the scroll container ref to AboutContent
const AboutContent = ({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) => (
  <div className="flex flex-col p-4">
      
      <Timeline data={data} scrollContainerRef={scrollContainerRef} />
  </div>
);

const ContactContent = () => (
    <div className="h-full flex flex-col justify-center p-4">
        <h2 className="text-3xl font-bold text-white mb-4">Contact</h2>
        <p className="text-neutral-300 max-w-lg">
          Here's how to reach out. You can add your email, links to social profiles, or even a contact form component.
        </p>
    </div>
);

const ProjectsContent = () => (
    <div className="h-full w-full flex flex-col justify-center items-center overflow-hidden">
        <Carousel slides={slideData} />
    </div>
);


const Menu = ({ activeItem, setActiveItem, id }: MenuProps) => {
    const ref = useRef(null);
    // CHANGE: Create a ref for the scrollable container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    const opacity = useTransform(scrollYProgress, [0.7, 1], [0.9, 1]);
    const scale = useTransform(scrollYProgress, [0.7, 1], [0.9, 1]);
    
    // CHANGE: We need to dynamically create the content based on the active item
    // to pass the ref correctly.
    const menuItems = useMemo(() => [
        {
            id: "projects",
            title: "Projects",
            description: "Explore a collection of my work.",
            header: <div />,
            className: "md:col-span-5 md:row-span-1",
            icon: <IconBriefcase className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <ProjectsContent />,
        },
        {
            id: "about",
            title: "About",
            description: "Learn more about my journey.",
            header: <div />,
            className: "md:col-span-3 md:row-span-1",
            icon: <IconUser className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <AboutContent scrollContainerRef={scrollContainerRef} />,
        },
        {
            id: "contact",
            title: "Contact",
            description: "Let's get in touch.",
            header: <div />,
            className: "md:col-span-2 md:row-span-1",
            icon: <IconMail className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <ContactContent />,
        },
    ], [scrollContainerRef]);


    const getClassName = (item: typeof menuItems[number]) => {
      if (!activeItem) return item.className;

      if (activeItem === 'projects') {
        if (item.id === 'about') return 'md:col-span-1 md:row-span-2';
        if (item.id === 'projects') return 'md:col-span-3 md:row-span-2';
        if (item.id === 'contact') return 'md:col-span-1 md:row-span-2';
      }

      if (activeItem === 'about') {
        if (item.id === 'about') return 'md:col-span-3 md:row-span-2 md:row-start-1';
        if (item.id === 'projects') return 'md:col-span-2 md:row-span-1 md:row-start-1';
        if (item.id === 'contact') return 'md:col-span-2 md:row-span-1 md:row-start-2';
      }

      if (activeItem === 'contact') {
        if (item.id === 'projects') return 'md:col-span-2 md:row-span-1 md:row-start-1 md:col-start-1';
        if (item.id === 'about') return 'md:col-span-2 md:row-span-1 md:row-start-2 md:col-start-1';
        if (item.id === 'contact') return 'md:col-span-3 md:row-span-2 md:row-start-1 md:col-start-3';
      }

      return item.className;
    };

    const sortedItems = useMemo(() => {
        if (!activeItem) return menuItems;

        const projects = menuItems.find(i => i.id === 'projects');
        const about = menuItems.find(i => i.id === 'about');
        const contact = menuItems.find(i => i.id === 'contact');

        if (activeItem === 'projects') {
            return [about, projects, contact].filter(Boolean) as typeof menuItems;
        }
        if (activeItem === 'about') {
            return [about, projects, contact].filter(Boolean) as typeof menuItems;
        }
        if (activeItem === 'contact') {
            return [projects, about, contact].filter(Boolean) as typeof menuItems;
        }

        return menuItems;
    }, [activeItem, menuItems]);


    return (
        <div id={id} ref={ref} className="h-screen overflow-hidden">
            {/* CHANGE: Add style tag to hide scrollbar */}
            <style>
                {`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 z-0"
            />
            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 h-full w-full"
            >
                <div className="relative w-full h-full p-12 ">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <BentoGrid className="w-full h-full md:grid-rows-2">
                            {sortedItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className={cn(getClassName(item), "relative pointer-events-auto", item.id === activeItem ? "z-30" : "z-10")}
                                >
                                    <BentoGridItem
                                        className={"h-full w-full"}
                                        onClick={item.isExpandable ? () => setActiveItem(item.id) : undefined}
                                        title={item.title}
                                        description={item.description}
                                        header={item.header}
                                        icon={item.icon}
                                    >
                                        {item.id === activeItem && (
                                            <div className="relative h-full">
                                                <motion.button
                                                    initial={{ opacity: 1 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.1, duration: 0.2 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveItem(null);
                                                    }}
                                                    className="absolute top-2 right-2 text-neutral-400 hover:text-white transition-colors z-20"
                                                >
                                                    <IconX className="h-6 w-6" />
                                                </motion.button>
                                                <motion.div
                                                    ref={scrollContainerRef}
                                                    initial={{ opacity: 1 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.1, duration: 0.2 }}
                                                    className="h-full w-full overflow-y-auto no-scrollbar"
                                                >
                                                    {item.content}
                                                </motion.div>
                                            </div>
                                        )}
                                    </BentoGridItem>
                                </motion.div>
                            ))}
                        </BentoGrid>
                        
                        {/* CHANGE: Moved WorldMap inside the new wrapper and adjusted positioning */}
                        <div
                            className="absolute inset-0 z-20 pointer-events-none"
                            style={{ mixBlendMode: 'screen' }}
                        >
                            <WorldMap dots={[]} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Menu;
