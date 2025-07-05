// components/project/project-hero.tsx
import Image from "next/image";

interface ProjectHeroProps {
  title: string;
  imageUrl: string;
}

export const ProjectHero = ({ title, imageUrl }: ProjectHeroProps) => {
  return (
    <div className="relative w-full h-[60vh] max-h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/20">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 sm:p-12">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          {title}
        </h1>
      </div>
    </div>
  );
};
