// components/project/project-hero.tsx
import { MacbookScroll } from "../ui/macbook-scroll";
import { MobileScroll } from "../ui/mobile-scroll";
import { cn } from "@/lib/utils";

interface ProjectHeroProps {
  title: string;
  imageUrl: string;
  displayType: 'macbook' | 'mobile';
}

export const ProjectHero = ({ title, imageUrl, displayType }: ProjectHeroProps) => {
  
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl",
        { "overflow-hidden ": displayType === 'macbook' }
      )}
    >
      {displayType === 'macbook' ? (
        <MacbookScroll
          title={title}
          src={imageUrl}
          showGradient={false}
        />
      ) : (
        <MobileScroll
          title={title}
          src={imageUrl}
        />
      )}
    </div>
  );
};
