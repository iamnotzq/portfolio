// app/project/[slug]/page.tsx

"use client";

import { slideData, ProjectData } from "@/lib/projects-data";
import { notFound, useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

// Import all necessary components
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectOverview } from "@/components/project/project-overview";
import { ProjectFeatures } from "@/components/project/project-features";
import { ProjectDemo } from "@/components/project/project-demo";
import { ProjectLearnings } from "@/components/project/project-learnings";
import { ProjectFooter } from "@/components/project/project-footer";
import NavbarComponent from "@/components/Navbar";
import ProjectDocumentation from "@/components/project/project-documentation";
import { Cover } from "@/components/ui/cover";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  
  // State to manage the multi-step loading animation
  const [loadingState, setLoadingState] = useState('loading'); // loading -> completed -> finished
  const [loadingText, setLoadingText] = useState("Entering the data stream...");

  useEffect(() => {
    // Phase 1: Initial "loading" text
    const loadingTimer = setTimeout(() => {
      const currentProject = slideData.find((p) => p.slug === params.slug);
      if (currentProject) {
        setProject(currentProject); // Set the project data
        
        // Phase 2: Switch to "completed" text
        setLoadingText("Connection established.");
        setLoadingState('completed');

        // Phase 3: Wait a moment, then finish to trigger fade-out
        const completedTimer = setTimeout(() => {
          setLoadingState('finished');
        }, 1500); // Show "completed" message for 1.5 seconds

        return () => clearTimeout(completedTimer);
      } else {
        notFound();
      }
    }, 3000); // Show "loading" message for 3 seconds

    return () => clearTimeout(loadingTimer);
  }, [params.slug]);

  const handleNavMenuClick = (id: 'about' | 'contact' | 'projects') => {
    router.push(`/#${id}`);
  };

  return (
    <>
      {/* AnimatePresence handles the smooth fade-out of the loading screen */}
      <AnimatePresence>
        {loadingState !== 'finished' && (
          <motion.div
            key="loading-screen"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${
              loadingState === 'completed' ? 'bg-black/50 backdrop-blur-sm' : 'bg-black'
            }`}
          >
            {loadingState === 'loading' ? (
              <h1 className={`text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white font-orbitron`}>
                <Cover active={true}>{loadingText}</Cover>
              </h1>
            ) : (
              // When 'completed', show simple text with a fade-in
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-4xl md:text-4xl lg:text-6xl font-semibold text-neutral-200 font-orbitron`}
              >
                {loadingText}
              </motion.h1>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render the main content only when the project data is loaded */}
      {project && (
        <div className="bg-transparent text-white w-full min-h-screen">
          <div className="fixed inset-0 -z-30 bg-black"></div>

          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(0, 10, 5)"
            gradientBackgroundEnd="rgb(0, 20, 10)"
            firstColor="10, 220, 110"
            secondColor="0, 150, 80"
            thirdColor="5, 100, 120"
            fourthColor="50, 255, 150"
            fifthColor="0, 150, 80"
            containerClassName="fixed inset-0 -z-20 opacity-20"
            interactive={false}
          />
          
          <BackgroundBeams className="fixed top-0 left-0 w-full h-full -z-10" />

          <NavbarComponent onMenuClick={handleNavMenuClick} />

          <main className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
              <div className="space-y-20 sm:space-y-28">
                <ProjectHero 
                  title={project.title} 
                  imageUrl={project.imageUrl}
                  displayType={project.displayType}
                />
                <ProjectOverview
                  overview={project.overview}
                  year={project.year}
                  role={project.role}
                  techStack={project.techStack}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                />
                <ProjectFeatures features={project.features} />
              </div>
            </div>
            <ProjectDemo screenshots={project.demoScreenshots} />
            <ProjectDocumentation documentation={project.documentation} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProjectLearnings learnings={project.learnings} />
              <ProjectFooter />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
