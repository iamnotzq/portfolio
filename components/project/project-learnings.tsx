// components/project/project-learnings.tsx
import { Learning } from "@/lib/projects-data";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

interface ProjectLearningsProps {
  learnings: Learning[];
}

export const ProjectLearnings = ({ learnings }: ProjectLearningsProps) => {
  return (
    <section className="min-h-screen w-full py-20 sm:py-28 flex flex-col justify-center items-center">
      <div className="text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-orbitron">
          Learnings & Takeaways
        </h2>
        <p className="mt-4 mb-12 text-neutral-400 text-lg max-w-2xl mx-auto">
          Every project is a learning opportunity. Here are some of the key insights and skills I gained.
        </p>
      </div>
      
      <div className="w-full flex justify-center">
         <AnimatedTestimonials testimonials={learnings} />
      </div>
    </section>
  );
};
