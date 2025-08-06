// components/project/project-features.tsx
import { Feature, ICONS, Skeleton } from "@/lib/projects-data";
import { BentoGrid, BentoGridItem } from "../ui/project-grid";
import { Lens } from "../ui/lens";
import { useState } from "react";

interface ProjectFeaturesProps {
  features: Feature[];
}

export const ProjectFeatures = ({ features }: ProjectFeaturesProps) => {
    
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className="text-center px-4 pt-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-orbitron">
                Key Features
            </h2>
            <p className="mt-4 text-neutral-400 text-base md:text-xl max-w-2xl mx-auto">
                Explore the core functionalities and technical highlights that make this project stand out.
            </p>
        </div>

        <div className="flex-grow w-full max-w-7xl mx-auto p-4 flex items-center">
            <BentoGrid className="w-full">
                  {features.map((item, i) => {
                    const [hovering, setHovering] = useState(false);
                    // Conditionally render an image or the skeleton loader
                    const headerContent = item.imageUrl ? (
                        <Lens hovering={hovering} setHovering={setHovering}>
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="flex-1 w-full h-full min-h-[10rem] rounded-xl object-cover"
                            />
                            </Lens>
                    ) : (
                        <Skeleton />
                    );

                    return (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={headerContent} // Pass the dynamic header content
                            icon={ICONS[item.icon] || <></>}
                            className={item.className}
                        />
                    );
                })}
            </BentoGrid>
        </div>
    </section>
  );
};
