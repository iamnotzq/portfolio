// components/project/project-demo.tsx
import { Demo } from "@/lib/projects-data";

interface ProjectDemoProps {
  demo: Demo;
}

export const ProjectDemo = ({ demo }: ProjectDemoProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white text-center mb-8">Live Demo</h2>
      <div className="w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 shadow-lg">
        {demo.type === 'video' ? (
          <video src={demo.src} controls className="w-full h-full object-cover" />
        ) : (
          <iframe src={demo.src} title="Project Demo" className="w-full h-full border-0" />
        )}
      </div>
    </section>
  );
};
