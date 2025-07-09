// components/project/project-overview.tsx
import { ExternalLink, Github } from "lucide-react";

interface ProjectOverviewProps {
  overview: string;
  year: number;
  role: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export const ProjectOverview = ({ overview, year, role, techStack, liveUrl, githubUrl }: ProjectOverviewProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pt-4">
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">Project Overview</h2>
        <p className="text-lg text-neutral-300 leading-relaxed">
          {overview}
        </p>
      </div>
      <aside className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3 font-orbitron">Details</h3>
          <ul className="space-y-2 text-neutral-400">
            <li><strong>Year:</strong> {year}</li>
            <li><strong>Role:</strong> {role}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-3 font-orbitron">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="bg-neutral-800 text-sky-300 text-sm font-medium px-3 py-1.5 rounded-lg">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-3 font-orbitron">Links</h3>
          <div className="flex flex-col space-y-3">
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-300 hover:text-sky-400 transition-colors">
              <ExternalLink className="h-5 w-5" />
              <span>Live Demo</span>
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-300 hover:text-sky-400 transition-colors">
              <Github className="h-5 w-5" />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </aside>
    </section>
  );
};
