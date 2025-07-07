// app/project/[slug]/page.tsx

"use client";

import { slideData } from "@/lib/projects-data";
import { notFound, useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';

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

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [project, setProject] = useState<(typeof slideData)[0] | null>(null);

  useEffect(() => {
    const currentProject = slideData.find((p) => p.slug === params.slug);
    if (currentProject) {
      setProject(currentProject);
    } else {
      notFound();
    }
  }, [params.slug]);

  const handleNavMenuClick = (id: 'about' | 'contact' | 'projects') => {
    router.push(`/#${id}`);
  };

  if (!project) {
    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
            Loading Project...
        </div>
    );
  }

  return (
    <div className="bg-transparent text-white w-full min-h-screen">
      
      {/* MODIFICATION: Added a solid black background layer at the very back. */}
      <div className="fixed inset-0 -z-30 bg-black"></div>

      {/* MODIFICATION: Gradient is now semi-transparent and layered on top of the black background. */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(0, 15, 10)"
        gradientBackgroundEnd="rgb(0, 25, 30)"
        firstColor="10, 80, 70"
        secondColor="0, 60, 110"
        thirdColor="10, 120, 100"
        fourthColor="0, 90, 40"
        fifthColor="0, 25, 30"
        containerClassName="fixed inset-0 -z-20 opacity-50"
        interactive={false}
      />
      
      {/* Beams are at -z-10, so they appear on top of the gradient. */}
      <BackgroundBeams className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* The Navbar is fixed and will stay at the top during scroll */}
      <NavbarComponent onMenuClick={handleNavMenuClick} />

      {/* Main content area, with z-10 to appear above the background effects. */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <div className="space-y-20 sm:space-y-28">
          <ProjectHero title={project.title} imageUrl={project.imageUrl} />
          <ProjectOverview
            overview={project.overview}
            year={project.year}
            role={project.role}
            techStack={project.techStack}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
          />
          <ProjectFeatures features={project.features} />
          <ProjectDemo demo={project.demo} />
          <ProjectLearnings learnings={project.learnings} />
          <ProjectFooter />
        </div>
      </main>
    </div>
  );
}
