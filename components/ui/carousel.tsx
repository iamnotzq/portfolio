/* eslint-disable */
// @ts-nocheck
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
import Image from "next/image";
// import { CarouselSlideData } from "@/lib/projects-data"; // This import is removed as the type will be defined locally.
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react"; // Import icons

// --- Define the data structure for a slide ---
// This interface is defined here to resolve the export error.
export interface CarouselSlideData {
  slug: string;
  src: string;
  title: string;
  description: string;
  year: string | number;
  techStack: string[];
  role: string;
  liveUrl?: string;
  githubUrl?: string;
}


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
  [key: string]: any; // Add index signature to allow other props
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
const Slide = ({ slide, index, current, handleSlideClick, handlePreviousClick, handleNextClick }: { slide: CarouselSlideData, index: number, current: number, handleSlideClick: (index: number) => void, handlePreviousClick: () => void, handleNextClick: () => void }) => {
  const { slug, src, title, description, year, techStack, role, liveUrl, githubUrl } = slide;
  
  return (
    <li
      className="w-[90vw] max-w-lg h-auto flex-shrink-0 px-4 relative"
      onClick={() => handleSlideClick(index)}
      style={{
        transform: current === index ? "scale(1)" : "scale(0.85)",
        opacity: current === index ? 1 : 0.5,
        transition: "all 0.5s ease-in-out",
      }}
    >
      {/* The Link wrapper has been removed from here to prevent nested <a> tags */}
      <CardContainer containerClassName="w-full h-full">
        <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-black/[0.1] w-full h-full rounded-xl p-4 lg:p-6 border flex flex-col">
          {/* Top content section */}
          <div className="flex-shrink-0">
            <CardItem translateZ="50" className="w-full flex justify-between items-start">
              <h3 className="text-sm md:text-xl font-bold text-white">
                {title}
              </h3>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-neutral-400 px-2 py-1 bg-neutral-800 rounded-full">
                {year}
              </span>
            </CardItem>
            <CardItem as="p" translateZ="55" className="text-xs sm:text-sm md:text-base font-bold text-neutral-300 mt-2">{role}</CardItem>
            <CardItem as="p" translateZ="60" className="text-xs sm:text-sm md:text-base w-full mt-2 text-neutral-300">
              {description}
            </CardItem>
            <CardItem translateZ="70" className="w-full mt-4">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="text-xs md:text-sm font-medium text-sky-200 bg-sky-900/50 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </CardItem>
          </div>
          
          {/* Image container */}
          <CardItem translateZ="80" className="w-full mt-4 flex-grow relative aspect-video">
            <Image
              src={src}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-xl group-hover/card:shadow-xl"
              alt={title}
              quality={100}
            />
          </CardItem>

          {/* Bottom content section - REVISED to avoid nested links */}
          <div className="flex justify-between items-center mt-6 flex-shrink-0">
            <CardItem
              translateZ={20}
              className="text-xs md:text-sm font-semibold text-sky-400 hover:text-sky-200 transition-colors"
            >
              <Link href={`/project/${slug}`} className="inline-flex items-center gap-1">
                View Details <ArrowRight className="h-4 w-4" />
              </Link>
            </CardItem>
            <div className="flex items-center gap-4">
                 {liveUrl && (
                    <CardItem translateZ={20}>
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2"
                            title="Live Demo"
                        >
                    <ExternalLink className="md:h-5 md:w-5 h-4 w-4" />
                     <span className="text-xs md:text-sm">Live Demo</span>
                        </a>
                    </CardItem>
                 )}
                 {githubUrl && (
                    <CardItem translateZ={20}>
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2"
                            title="View Code"
                        >
                    <GitBranch className="md:h-5 md:w-5 h-4 w-4" />
                     <span className="text-xs md:text-sm">Source Code</span>
                        </a>
                    </CardItem>
                 )}
            </div>
          </div>
        </CardBody>
      </CardContainer>

      {/* Controls for larger screens (sm and up) */}
      {index === current && (
        <>
          <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[80%] z-10">
            <CarouselControl
              type="previous"
              title="Go to previous slide"
              handleClick={handlePreviousClick}
            />
          </div>
          <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 translate-x-[80%] z-10">
            <CarouselControl
              type="next"
              title="Go to next slide"
              handleClick={handleNextClick}
            />
          </div>
        </>
      )}
    </li>
  );
};

// CarouselControl Component: The next/previous buttons
const CarouselControl = ({ type, title, handleClick }: { type: string, title: string, handleClick: () => void }) => {
  return (
    <button
      className={`pointer-events-auto w-12 h-12 flex items-center justify-center text-2xl font-bold text-neutral-200 bg-neutral-800/50 hover:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 mx-2`}
      title={title}
      onClick={(e) => {
        e.stopPropagation(); // Prevent the slide's onClick from firing
        handleClick();
      }}
    >
      {type === "previous" ? "<" : ">"}
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
    <div className="w-full relative">
      <div className="w-full relative overflow-hidden">
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
              handlePreviousClick={handlePreviousClick}
              handleNextClick={handleNextClick}
            />
          ))}
        </ul>
      </div>

      {/* Controls for smaller screens (hidden on sm and up) */}
      <div className="sm:hidden flex justify-center pt-4">
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
