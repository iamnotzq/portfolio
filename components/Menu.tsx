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
import { slideData } from '@/lib/projects-data';
import { Timeline } from './ui/timeline';


interface MenuProps {
    activeItem: string | null;
    setActiveItem: (id: string | null) => void;
    id?: string;
    setPointerText: (text: string) => void;
    setPointerVisible: (visible: boolean) => void;
    menuPointerText: string;
    projectsPointerText: string;
    aboutPointerText: string;
    contactPointerText: string;
}

const data = [
  {
    title: "2024 - 2025",
    content: (
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Props Factory</h3>
        <h4 className="text-md font-semibold text-neutral-300 mb-4">Full Stack Developer & Assistant Project Manager</h4>
        <ul className="list-disc list-inside text-xs md:text-sm text-neutral-200 space-y-2">
          <li>Engineered and launched a comprehensive Expo React Native application from concept to deployment, now utilized company-wide for core operations.</li>
          <li>Key features include worker check-in/out, expense claim tracking, payroll access, user data management, and real-time project monitoring.</li>
          <li>Independently designed and developed the corporate website, incorporating a dynamic blog and a cloud-based image gallery to enhance online presence.</li>
        </ul>
      </div>
    ),
  },
  {
      title: "2021 - 2024",
      content: (
        <div>
          <h3 className="text-lg font-bold text-white mb-1">University of Wollongong</h3>
          <h4 className="text-md font-semibold text-neutral-300 mb-4">Bachelor in Computer Science (Big Data)</h4>
          <ul className="list-disc list-inside text-xs md:text-sm text-neutral-200 space-y-2">
            <li>Graduated with Distinction, demonstrating high academic achievement.</li>
            <li>Awarded a competitive semester exchange to Wollongong, Australia, selected as one of fewer than 10 students from the entire Computer Science cohort.</li>
          </ul>
        </div>
      ),
    },
  {
    title: "2023",
    content: (
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Lagoon Laundry</h3>
        <h4 className="text-md font-semibold text-neutral-300 mb-4">Part-time Customer Service & Assistant Developer</h4>
        <p className="text-xs font-normal md:text-sm text-neutral-200">
          Contributed to the development and design of a new Point-of-Sale (POS) system, enhancing operational efficiency and improving the customer experience.
        </p>
      </div>
    ),
  },
  {
    title: "2018",
    content: (
      <div>
          <h3 className="text-lg font-bold text-white mb-1">Aural Aid</h3>
          <h4 className="text-md font-semibold text-neutral-300 mb-4">Internship - Product Designer</h4>
          <ul className="list-disc list-inside text-xs md:text-sm text-neutral-200 space-y-2">
              <li>Spearheaded a new product design initiative, mastering 'Grasshopper' software to produce innovative design solutions.</li>
              <li>Executed a complete overhaul of the company website, improving UI/UX and receiving commendation from senior leadership.</li>
              <li>Authored detailed product manuals and developed custom product solutions, measurably increasing client satisfaction.</li>
          </ul>
      </div>
    ),
  },
  {
      title: "2015 - 2018",
      content: (
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Temasek Polytechnic</h3>
          <h4 className="text-md font-semibold text-neutral-300 mb-4">Diploma in Product & Industrial Design</h4>
          <p className="text-xs font-normal md:text-sm text-neutral-200">
            Acquired a strong foundation in the end-to-end product design lifecycle, from ideation and prototyping to final production and market analysis.
          </p>
        </div>
      ),
    }, {
    title: "Changelog",
    content: (
      <div>
        <p className="mb-4 text-xs font-normal  md:text-sm text-neutral-200">
          Deployed 5 new components on Aceternity today
        </p>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs  md:text-sm text-neutral-300">
            ✅ Card grid component
          </div>
          <div className="flex items-center gap-2 text-xs  md:text-sm text-neutral-300">
            ✅ Startup template Aceternity
          </div>
          <div className="flex items-center gap-2 text-xs  md:text-sm text-neutral-300">
            ✅ Random file upload lol
          </div>
          <div className="flex items-center gap-2 text-xs  md:text-sm text-neutral-300">
            ✅ Himesh Reshammiya Music CD
          </div>
          <div className="flex items-center gap-2 text-xs  md:text-sm text-neutral-300">
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
    
const AboutContent = ({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) => (
  <div className="flex flex-col p-4">
      <Timeline data={data} scrollContainerRef={scrollContainerRef} />
  </div>
);

const ContactContent = () => (
    <div className="h-full flex flex-col justify-center p-4">
        <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">Contact</h2>
        <p className="text-neutral-300 max-w-lg">
          Here's how to reach out. You can add your email, links to social profiles, or even a contact form component.
        </p>
    </div>
);

const ProjectsContent = () => (
    <div className="h-full w-full flex flex-col justify-start items-center overflow-hidden py-4 md:py-8 ">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-orbitron">
                My Work
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mb-8">
                A showcase of projects I've built.
            </p>
        </motion.div>
        <Carousel slides={slideData} />
    </div>
);


const Menu = ({
    activeItem,
    setActiveItem,
    id,
    setPointerText,
    setPointerVisible,
    menuPointerText,
    projectsPointerText,
    aboutPointerText,
    contactPointerText,
}: MenuProps) => {
    const ref = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"]
    });

    const opacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0.7, 1], [0.5, 1]);
    const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.7 ? "auto" : "none"));
    
    const menuItems = useMemo(() => [
        {
            id: "projects",
            title: <span className="font-orbitron"><span className="text-white">{'['}</span><span className="text-orange-400">"projects"</span><span className="text-white">{']'}</span></span>,
            description: <span className="text-green-500 ">// Explore a collection of my work.</span>,
            header: <div />,
            className: "md:col-span-5 md:row-span-1",
            icon: <IconBriefcase className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <ProjectsContent />,
            pointerText: projectsPointerText,
        },
        {
            id: "about",
            title: <span className="font-orbitron"><span className="text-yellow-400">about</span><span className="text-white">.me</span></span>,
            description: <span className="text-green-500">// Learn more about my journey.</span>,
            header: <div />,
            className: "md:col-span-3 md:row-span-1",
            icon: <IconUser className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <AboutContent scrollContainerRef={scrollContainerRef} />,
            pointerText: aboutPointerText,
        },
        {
            id: "contact",
            title: <span className="font-orbitron"><span className="text-blue-400">contact</span><span className="text-white">()</span></span>,
            description: <span className="text-green-500">// Let's get in touch.</span>,
            header: <div />,
            className: "md:col-span-2 md:row-span-1",
            icon: <IconMail className="h-4 w-4 text-neutral-400" />,
            isExpandable: true,
            content: <ContactContent />,
            pointerText: contactPointerText,
        },
    ], [scrollContainerRef, projectsPointerText, aboutPointerText, contactPointerText]);

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
        <motion.div 
            id={id} 
            ref={ref} 
            className="h-screen overflow-hidden"
            style={{ pointerEvents }}
            onMouseEnter={() => {
                if (!activeItem) {
                    setPointerText(menuPointerText);
                    setPointerVisible(true);
                }
            }}
            onMouseLeave={() => {
                setPointerVisible(false);
            }}
        >
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
                <div className="relative w-full h-full rounded-2xl ">
                        <BentoGrid className="w-full h-full md:grid-rows-2">
                            {sortedItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className={cn(getClassName(item), "relative", item.id === activeItem ? "z-30" : "z-10")}
                                    onMouseEnter={() => {
                                        if (item.id === activeItem) {
                                            setPointerVisible(false);
                                        } else {
                                            setPointerText(item.pointerText);
                                            setPointerVisible(true);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (item.id !== activeItem) {
                                            setPointerText(menuPointerText);
                                        }
                                    }}
                                >
                                    <BentoGridItem
                                        className={cn(
                                            "h-full w-full",
                                            "border-2 border-green-800/50 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                                        )}
                                        onClick={item.isExpandable ? () => {
                                            setActiveItem(item.id);
                                            setPointerVisible(false);
                                        } : undefined}
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
                                                        setPointerText(menuPointerText);
                                                        setPointerVisible(true);
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
                        
                        <div
                            className="absolute inset-0 z-20 pointer-events-none opacity-60"
                            style={{ mixBlendMode: 'screen' }}
                        >
                            <WorldMap dots={[]} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Menu;
