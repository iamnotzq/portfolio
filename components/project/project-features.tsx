// components/project/project-features.tsx
import Image from "next/image";
import { Feature } from "@/lib/projects-data";

interface ProjectFeaturesProps {
  features: Feature[];
}

export const ProjectFeatures = ({ features }: ProjectFeaturesProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 transition-all hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10">
            <div className="relative h-48 w-full">
              <Image src={feature.image} alt={feature.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
