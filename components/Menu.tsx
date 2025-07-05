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


interface MenuProps {
    activeItem: string | null;
    setActiveItem: (id: string | null) => void;
    id?: string;
}

const AboutContent = () => (
    <div className="h-full flex flex-col justify-center p-4">
        <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
        <p className="text-neutral-300 max-w-lg">
          This is where you can share your story. Talk about your professional journey, the skills you've acquired, and what you're passionate about. Make it personal and engaging!
        </p>
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


const menuItems = [
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
        content: <AboutContent />,
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
];

const Menu = ({ activeItem, setActiveItem, id }: MenuProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    const opacity = useTransform(scrollYProgress, [0.7, 1], [0.9, 1]);
    const scale = useTransform(scrollYProgress, [0.7, 1], [0.9, 1]);

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
    }, [activeItem]);


    return (
        <div id={id} ref={ref} className="h-screen overflow-hidden">
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 z-0"
            />
            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 h-full w-full"
            >
                <div className="relative w-full h-full p-12 ">
                    <BentoGrid className="w-full h-full md:grid-rows-2">
                        {sortedItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                // Add `pointer-events-auto` to make the menu items clickable again.
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
                                                initial={{ opacity: 1 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1, duration: 0.2 }}
                                                className="h-full"
                                            >
                                                {item.content}
                                            </motion.div>
                                        </div>
                                    )}
                                </BentoGridItem>
                            </motion.div>
                        ))}
                    </BentoGrid>
                    
                    <div
                        className="absolute inset-6 z-20 pointer-events-none opacity-80"
                        style={{ mixBlendMode: 'screen' }}
                    >
                        <WorldMap dots={[]} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Menu;
