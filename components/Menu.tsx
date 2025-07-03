"use client";
import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    IconBriefcase,
    IconUser,
    IconMail,
    IconX,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { WorldMap } from './ui/world-map';

const handleScroll = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
};

// Content for the "About" panel
const AboutContent = () => (
    <div className="h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
        <p className="text-neutral-300 max-w-lg">
          This is where you can share your story. Talk about your professional journey, the skills you've acquired, and what you're passionate about. Make it personal and engaging!
        </p>
    </div>
);

// Content for the "Contact" panel
const ContactContent = () => (
    <div className="h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-white mb-4">Contact</h2>
        <p className="text-neutral-300 max-w-lg">
          Here's how to reach out. You can add your email, links to social profiles, or even a contact form component.
        </p>
    </div>
);

// Moved items array outside the component to keep it stable.
const menuItems = [
    {
        id: "projects",
        title: "Projects",
        description: "Explore a collection of my work and experiments.",
        header: <div />,
        className: "md:col-span-3",
        icon: <IconBriefcase className="h-4 w-4 text-neutral-400" />,
        onClick: () => handleScroll("projects"),
        isExpandable: false,
    },
    {
        id: "about",
        title: "About",
        description: "Learn more about my journey, skills, and passion.",
        header: <div />,
        className: "md:col-span-2",
        icon: <IconUser className="h-4 w-4 text-neutral-400" />,
        isExpandable: true,
        content: <AboutContent />,
    },
    {
        id: "contact",
        title: "Contact",
        description: "Let's get in touch and build something great together.",
        header: <div />,
        className: "md:col-span-1",
        icon: <IconMail className="h-4 w-4 text-neutral-400" />,
        isExpandable: true,
        content: <ContactContent />,
    },
];

const Menu = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    const opacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0.7, 1], [0.9, 1]);
    
    // This function dynamically determines the CSS class for each grid item.
    const getClassName = (item: typeof menuItems[number]) => {
        if (!selectedId) {
            return item.className;
        }
        if (item.id === selectedId) {
            return "md:col-span-2 md:row-span-2";
        }
        return "md:col-span-1 md:row-span-1";
    };

    // Reorder items based on which is selected to control layout.
    const sortedItems = useMemo(() => {
        if (!selectedId) return menuItems;

        const selectedItem = menuItems.find((item) => item.id === selectedId);
        if (!selectedItem) return menuItems;

        // This logic now creates a specific order when 'contact' is selected
        // to ensure the CSS grid auto-placement algorithm works as expected.
        if (selectedId === 'contact') {
            const projectsItem = menuItems.find(item => item.id === 'projects');
            const aboutItem = menuItems.find(item => item.id === 'about');
            // MODIFIED: This order places 'projects' before 'about' to flip their positions.
            return [projectsItem, selectedItem, aboutItem].filter(Boolean);
        }

        // Otherwise, place the selected item at the start to align it to the left.
        const otherItems = menuItems.filter((item) => item.id !== selectedId);
        return [selectedItem, ...otherItems];
    }, [selectedId]);


    return (
        <div ref={ref} className="h-screen sticky top-0">
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 z-0 bg-transparent"
            />
            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 h-full w-full"
            >
                <div className="relative w-full h-full p-12">
                    <BentoGrid className="w-full h-full md:grid-rows-2">
                        {/* Map over the newly sorted items array */}
                        {sortedItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout // Enables smooth layout animations
                                // Spring animation is fast and snappier
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className={getClassName(item)}
                            >
                                <BentoGridItem
                                    className="h-full w-full"
                                    onClick={item.isExpandable ? () => setSelectedId(item.id) : item.onClick}
                                    title={item.title}
                                    description={item.description}
                                    header={item.header}
                                    icon={item.icon}
                                >
                                    {/* If item is selected, render its content inside */}
                                    {item.id === selectedId && (
                                        <div className="relative h-full">
                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                // Delay removed for a faster feel
                                                transition={{ delay: 0, duration: 0.15 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedId(null);
                                                }}
                                                className="absolute top-2 right-2 text-neutral-400 hover:text-white transition-colors z-20"
                                            >
                                                <IconX className="h-6 w-6" />
                                            </motion.button>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                // Delay removed for a faster feel
                                                transition={{ delay: 0, duration: 0.15 }}
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
                    
                    {/* WorldMap remains as a persistent overlay on top of the grid. */}
                    <div className="absolute inset-6 z-10 pointer-events-none opacity-80">
                        <WorldMap dots={[]} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Menu;
