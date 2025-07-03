"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { WorldMap } from './ui/world-map';
import { Carousel, CarouselSlideData } from './ui/carousel';

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
    const slideData: CarouselSlideData[] = [
        {
          title: "Interactive Portfolio",
          description: "A personal portfolio website built with a 3D globe and animated UI components.",
          year: 2024,
          techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
          button: "View Live",
          src: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "E-commerce Platform",
          description: "A full-stack e-commerce solution with a custom CMS and payment integration.",
          year: 2023,
          techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
          button: "View on GitHub",
          src: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Data Visualization Dashboard",
          description: "A web app for visualizing complex datasets with interactive charts and graphs.",
          year: 2023,
          techStack: ["Vue.js", "D3.js", "Python", "Flask", "PostgreSQL"],
          button: "Explore Demo",
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Mobile Task Manager",
          description: "A cross-platform mobile app for task management and team collaboration.",
          year: 2022,
          techStack: ["React Native", "Firebase", "GraphQL", "Jest"],
          button: "Download App",
          src: "https://images.unsplash.com/photo-1589792942203-f6a1a5a94034?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ];

    const backdropVariants = {
        visible: { opacity: 1, pointerEvents: "auto" as const },
        hidden: { opacity: 0, pointerEvents: "none" as const },
    };

    const modalVariants = {
        visible: { y: 0 },
        hidden: { y: "100%" },
    };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
        

        <motion.div
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={modalVariants}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 h-[90vh] bg-[#0E0E10] border-t border-white/[0.1] z-50 p-6 flex flex-col overflow-hidden pointer-events-auto"
        >
            {/* STEP 2: If Step 1 doesn't work, try commenting out this WorldMap component. */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <WorldMap dots={[]} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex-shrink-0 flex flex-col items-center text-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Projects</h2>
                    <p className="text-neutral-400 mt-1">A collection of my work and experiments.</p>
                    <button
                        onClick={onClose}
                        className="absolute -top-2 -right-2 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close projects modal"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex-grow flex items-center justify-center overflow-hidden">
                    <Carousel slides={slideData} />
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default ProjectsModal;
