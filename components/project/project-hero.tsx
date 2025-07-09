// components/project/project-hero.tsx
import { MacbookScroll } from "../ui/macbook-scroll";
import { MobileScroll } from "../ui/mobile-scroll";

interface ProjectHeroProps {
  title: string;
  imageUrl: string;
  displayType: 'macbook' | 'mobile';
}

export const ProjectHero = ({ title, imageUrl, displayType }: ProjectHeroProps) => {
  // The 'overflow-hidden' class has been removed from this div
  // to allow the sticky positioning in the child component to work correctly.
  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
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
