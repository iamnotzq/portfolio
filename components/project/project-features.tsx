// components/project/project-features.tsx
import { Feature, ICONS, Skeleton } from "@/lib/projects-data";
import { BentoGrid, BentoGridItem } from "../ui/project-grid";

interface ProjectFeaturesProps {
  features: Feature[];
}

export const ProjectFeatures = ({ features }: ProjectFeaturesProps) => {
  return (
    <section className="min-h-screen w-full py-20 sm:py-28 flex flex-col justify-center items-center">
        <div className="text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Key Features
            </h2>
            <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto">
                Explore the core functionalities and technical highlights that make this project stand out.
            </p>
        </div>

        <div className="flex-grow w-full max-w-7xl mx-auto p-4 flex items-center">
            <BentoGrid className="w-full">
                {features.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={<Skeleton />}
                    icon={ICONS[item.icon] || <></>}
                    className={item.className}
                />
                ))}
            </BentoGrid>
        </div>
    </section>
  );
};
