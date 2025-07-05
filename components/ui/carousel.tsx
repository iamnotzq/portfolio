"use client";

import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  createContext,
} from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CarouselSlideData } from "@/lib/projects-data";
import { ExternalLink, Github, ArrowRight } from "lucide-react"; // Import icons

// --- 3D Card Components (remains the same) ---
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-auto w-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};


// --- Main Carousel Component ---

// Slide Component: Renders a single 3D card
const Slide = ({ slide, index, current, handleSlideClick }: { slide: CarouselSlideData, index: number, current: number, handleSlideClick: (index: number) => void }) => {
  const { slug, src, title, description, year, techStack, role, liveUrl, githubUrl } = slide;
  
  return (
    <li
      className="w-[80vmin] max-w-lg h-auto flex-shrink-0 px-4"
      onClick={() => handleSlideClick(index)}
      style={{
        transform: current === index ? "scale(1)" : "scale(0.85)",
        opacity: current === index ? 1 : 0.5,
        transition: "all 0.5s ease-in-out",
      }}
    >
      {/* The Link wrapper has been removed from here to prevent nested <a> tags */}
      <CardContainer containerClassName="w-full h-full">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col">
          {/* Top content section */}
          <div className="flex-shrink-0">
            <CardItem translateZ="50" className="w-full flex justify-between items-start">
              <h3 className="text-xl font-bold text-neutral-600 dark:text-white">
                {title}
              </h3>
              <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">
                {year}
              </span>
            </CardItem>
            <CardItem as="p" translateZ="55" className="text-sm font-bold text-neutral-600 dark:text-neutral-300 mt-2">{role}</CardItem>
            <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm w-full mt-2 dark:text-neutral-300">
              {description}
            </CardItem>
            <CardItem translateZ="70" className="w-full mt-4">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="text-xs font-medium text-sky-900 dark:text-sky-200 bg-sky-100 dark:bg-sky-900/50 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </CardItem>
          </div>
          
          {/* Image container */}
          <CardItem translateZ="80" className="w-full mt-4 flex-grow relative aspect-video">
            <img
              src={src}
              className="absolute inset-0 h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={title}
            />
          </CardItem>

          {/* Bottom content section - REVISED to avoid nested links */}
          <div className="flex justify-between items-center mt-6 flex-shrink-0">
            <CardItem
              translateZ={20}
              className="text-sm font-semibold text-sky-400 hover:text-sky-200 transition-colors"
            >
              <Link href={`/project/${slug}`} className="inline-flex items-center gap-1">
                View Details <ArrowRight className="h-4 w-4" />
              </Link>
            </CardItem>
            <div className="flex items-center gap-4">
                 <CardItem
                    translateZ={20}
                 >
                    <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors"
                        title="Live Demo"
                    >
                        <ExternalLink className="h-5 w-5" />
                    </a>
                 </CardItem>
                 <CardItem
                    translateZ={20}
                 >
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors"
                        title="View Code"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                 </CardItem>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </li>
  );
};

// CarouselControl Component: The next/previous buttons
const CarouselControl = ({ type, title, handleClick }: { type: string, title: string, handleClick: () => void }) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-600 dark:text-neutral-200" fill="none" viewBox="0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  );
};

// Carousel Component: The main export that ties everything together
export function Carousel({ slides }: { slides: CarouselSlideData[] }) {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLUListElement>(null);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (carouselRef.current && carouselRef.current.children[0]) {
      const slideWidth = (carouselRef.current.children[0] as HTMLElement).offsetWidth;
      const newTransform = `translateX(calc(50% - ${slideWidth / 2}px - ${current * slideWidth}px))`;
      carouselRef.current.style.transform = newTransform;
    }
  }, [current, slides]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full relative overflow-hidden py-5">
        <ul
          ref={carouselRef}
          className="flex items-center h-auto transition-transform duration-500 ease-in-out"
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
