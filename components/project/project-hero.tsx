// components/project/project-hero.tsx
import Image from "next/image";
import { MacbookScroll } from "../ui/macbook-scroll";

interface ProjectHeroProps {
  title: string;
  imageUrl: string;
}

export const ProjectHero = ({ title, imageUrl }: ProjectHeroProps) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
      <MacbookScroll
        title={
          title
        }
        
        src={imageUrl}
        showGradient={false}
      />
      
    </div>
  );
};
