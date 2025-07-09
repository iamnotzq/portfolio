// components/project/project-demo.tsx
import { DemoScreenshot } from "@/lib/projects-data";
import { DraggableCardContainer, DraggableCardBody } from "../ui/draggable-card";

interface ProjectDemoProps {
  screenshots: DemoScreenshot[];
}

export const ProjectDemo = ({ screenshots }: ProjectDemoProps) => {
  return (
    <section className="min-h-screen w-full py-20 sm:py-28 flex flex-col justify-center items-center">
      <div className="text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-orbitron">
          Project in Action
        </h2>
        <p className="my-4 text-neutral-400 text-lg max-w-2xl mx-auto">
          Here are some screenshots showcasing the project's interface. Drag the cards around to get a better view.
        </p>
      </div>

      <DraggableCardContainer className="relative flex h-[70vh] w-full items-center justify-center overflow-clip">
        {screenshots.map((item, i) => (
          <DraggableCardBody key={i} className={item.className}>
            <img
              src={item.image}
              alt={item.title}
              className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-lg shadow-2xl"
            />
            <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
};
