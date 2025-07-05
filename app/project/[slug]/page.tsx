// app/project/[slug]/page.tsx

import { slideData } from "@/lib/projects-data";
import { notFound } from "next/navigation";

// Import the new components
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectOverview } from "@/components/project/project-overview";
import { ProjectFeatures } from "@/components/project/project-features";
import { ProjectDemo } from "@/components/project/project-demo";
import { ProjectLearnings } from "@/components/project/project-learnings";
import { ProjectFooter } from "@/components/project/project-footer";

// This function tells Next.js which slugs to pre-render at build time.
export async function generateStaticParams() {
  return slideData.map((project) => ({
    slug: project.slug,
  }));
}

// The component is an async function to correctly handle params.
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const project = slideData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
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
