// components/project/project-demo.tsx
import { DemoScreenshot } from "@/lib/projects-data";
import { DraggableCardContainer, DraggableCardBody } from "../ui/draggable-card";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectDemoProps {
  screenshots: DemoScreenshot[];
  displayType: 'macbook' | 'mobile';
}

export const ProjectDemo = ({ screenshots, displayType }: ProjectDemoProps) => {

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="text-center px-4 pt-12">
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-orbitron">
          Project in Action
        </h2>
        <p className="my-4 text-neutral-400 text-base md:text-xl max-w-2xl mx-auto">
          Here are some screenshots showcasing the project&apos;s interface. Drag the cards around to get a better view.
        </p>
      </div>

      <DraggableCardContainer className="relative flex h-[70vh] w-full items-center justify-center overflow-clip">
        {screenshots.map((item, i) => (
          <DraggableCardBody key={i} className={item.className} displayType={displayType}>
         
            <div className={cn(
                "pointer-events-none relative z-10 w-full rounded-lg shadow-2xl overflow-hidden",
                {
                    "aspect-video": displayType === 'macbook', // 16:9 ratio for widescreen
                    "aspect-[9/20]": displayType === 'mobile'  // 9:16 ratio for portrait
                }
            )}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  quality={100} // Set image quality to maximum
                />
            </div>

            <h3 className="mt-4 text-center text-xl font-bold  text-neutral-300">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
};
