"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    IconBriefcase,
    IconUser,
    IconMail,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { WorldMap } from './ui/world-map';
import ProjectsModal from './ProjectsModal';

const Menu = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

    const [isModalOpen, setModalOpen] = useState(false);

    const items = [
        {
            title: "Projects",
            description: "Explore a collection of my work and experiments.",
            header: <div />,
            className: "md:col-span-2",
            icon: <IconBriefcase className="h-4 w-4 text-neutral-400" />,
            onClick: () => setModalOpen(true),
        },
        {
            title: "About",
            description: "Learn more about my journey, skills, and passion.",
            header: <div />,
            className: "md:col-span-1",
            icon: <IconUser className="h-4 w-4 text-neutral-400" />,
        },
        {
            title: "Contact",
            description: "Let's get in touch and build something great together.",
            header: <div />,
            className: "md:col-span-1",
            icon: <IconMail className="h-4 w-4 text-neutral-400" />,
        },
    ];

    return (
        <>
            <div ref={ref} className="relative h-screen">
                <motion.div
                    style={{ opacity }}
                    className="absolute inset-0 z-0 bg-transparent"
                />
                <motion.div
                    style={{ opacity }}
                    className="relative z-10 flex h-full items-center justify-center p-4"
                >
                    <div className="relative w-full max-w-6xl">
                        <BentoGrid className="w-full mx-auto">
                            {items.map((item, i) => (
                                <BentoGridItem
                                    key={i}
                                    title={item.title}
                                    description={item.description}
                                    header={item.header}
                                    className={item.className}
                                    icon={item.icon}
                                    onClick={item.onClick}
                                />
                            ))}
                        </BentoGrid>
                        <div className="absolute inset-0 z-10 pointer-events-none opacity-80">
                            <WorldMap
                                dots={[
                                   
                                ]}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <ProjectsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};

export default Menu;
