// components/project/project-learnings.tsx
import { CheckCircle } from "lucide-react";

interface ProjectLearningsProps {
  learnings: string[];
}

export const ProjectLearnings = ({ learnings }: ProjectLearningsProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white text-center mb-8">Learnings & Takeaways</h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {learnings.map((learning, index) => (
          <div key={index} className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-sky-400 mt-1 flex-shrink-0" />
            <p className="text-neutral-300 text-lg">{learning}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
