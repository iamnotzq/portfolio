"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useId } from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

// Updated data structure for detailed project info
export interface CarouselSlideData {
  title: string;
  description: string;
  year: number;
  role: string;
  techStack: string[];
  src: string;
  liveUrl: string;
  githubUrl: string;
}

interface SlideProps {
  slide: CarouselSlideData;
}

const Slide = ({ slide }: SlideProps) => {
  const { src, title, description, year, techStack, role, liveUrl, githubUrl } = slide;
  return (
    <div className="w-[80vmin] max-w-lg h-auto flex-shrink-0">
      <CardContainer containerClassName="w-full h-full p-0">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border flex flex-col">
          
          <CardItem translateZ="50" className="w-full flex justify-between items-start">
            <h3 className="text-xl font-bold text-neutral-600 dark:text-white">
              {title}
            </h3>
            <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">
              {year}
            </span>
          </CardItem>

          <CardItem as="p" translateZ="55" className="text-sm font-bold text-neutral-600 dark:text-neutral-300 mt-2">{role}</CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm w-full mt-2 dark:text-neutral-300"
          >
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

          <CardItem translateZ="80" className="w-full mt-4 h-48">
            <img
              src={src}
              className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={title}
            />
          </CardItem>

          <div className="flex justify-between items-center mt-4">
            <CardItem
              translateZ={20}
              as="a"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Live Demo →
            </CardItem>
            <CardItem
              translateZ={20}
              as="a"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              View Code
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

export function Carousel({ slides }: { slides: CarouselSlideData[] }) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const id = useId();

  return (
    <div className="w-full relative flex flex-col items-center justify-center">
      <div className="w-full overflow-x-hidden">
        <div
          className="flex items-center transition-transform duration-500 ease-in-out"
          style={{
            // Adjust calculation for the new card width (80vmin)
            transform: `translateX(calc(50% - 40vmin - ${current * 80}vmin))`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="transition-all duration-500 cursor-pointer px-4" // Added padding
              style={{
                transform: current === index ? "scale(1)" : "scale(0.85)",
                opacity: current === index ? 1 : 0.6,
              }}
              onClick={() => setCurrent(index)}
            >
              <Slide slide={slide} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full mt-8">
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
