"use client";
import React from 'react';
import { WorldMap } from './ui/world-map';
import { Carousel, CarouselSlideData } from './ui/carousel';

// The data is now more robust and portfolio-focused.
const slideData: CarouselSlideData[] = [
    {
      title: "Interactive Portfolio",
      description: "Developed a personal portfolio from scratch, featuring a 3D interactive globe, scroll-based animations, and a dynamic project showcase. Focused on creating a smooth, engaging user experience with a modern aesthetic.",
      year: 2024,
      role: "Lead Developer",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
      src: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      liveUrl: "#", // Replace with your live URL
      githubUrl: "#", // Replace with your GitHub URL
    },
    {
      title: "E-commerce Platform",
      description: "Engineered a full-stack e-commerce solution with a custom CMS for product management, secure payment integration using Stripe, and a responsive user-facing storefront. Built for scalability and ease of use.",
      year: 2023,
      role: "Full-Stack Engineer",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      src: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Data Visualization Dashboard",
      description: "Created a powerful web application for visualizing complex financial datasets. Implemented interactive charts and graphs with D3.js, allowing users to filter, sort, and export data dynamically.",
      year: 2023,
      role: "Frontend Developer",
      techStack: ["Vue.js", "D3.js", "Python", "Flask", "PostgreSQL"],
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

const Projects = () => {
  return (
    <section
      id="projects"
     
      className="relative flex h-[95vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0E0E10] p-6"
    >
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <WorldMap dots={[]} />
        </div>
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <div className="flex flex-shrink-0 flex-col items-center text-center">
                <h2 className="text-3xl font-bold text-white">Projects</h2>
                <p className="text-neutral-400 mt-1">A collection of my work and experiments.</p>
            </div>
        <div className="relative z-10 mt-6 flex-grow w-full flex items-center justify-center min-h-0">
        
                <Carousel slides={slideData} />
            </div>
        </div>
    </section>
  );
};

export default Projects;
