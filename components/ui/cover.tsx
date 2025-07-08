"use client";
import React, { useEffect, useId, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";

export const Cover = ({
  children,
  className,
  active,
}: {
  children?: React.ReactNode;
  className?: string;
  active?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [screenWidth, setScreenWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  // This effect calculates beam positions based on screen size and updates on resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenWidth(width);

      // Adjust the divisor to control beam spacing
      const numberOfBeams = Math.floor(height / 20);
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    // The main container is now a fixed, fullscreen container to overlay everything
    <div
      ref={ref}
      className="fixed inset-0 flex items-center justify-center overflow-hidden z-50 bg-black"
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.2,
              },
            }}
            className="h-full w-full overflow-hidden absolute inset-0"
          >
            {/* The sparkles now fill the entire screen */}
            <motion.div
              animate={{
                translateX: ["-50%", "0%"],
              }}
              transition={{
                translateX: {
                  duration: 10,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              className="w-[200%] h-full flex"
            >
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={200}
                className="w-full h-full"
                particleColor="#10B981" // Green sparkles
              />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={200}
                className="w-full h-full"
                particleColor="#FFFFFF" // White sparkles
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beams are rendered across the screen height */}
      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          hovered={active} // Animation is controlled by the 'active' prop
          duration={Math.random() * 2 + 1}
          delay={Math.random() * 2 + 1}
          width={screenWidth}
          style={{
            top: `${position}px`,
          }}
        />
      ))}

      {/* The text content, centered on the screen */}
      <motion.span
        key={String(active)}
        animate={{
          scale: active ? 0.8 : 1,
          x: active ? [0, -30, 30, -30, 30, 0] : 0,
          y: active ? [0, 30, -30, 30, -30, 0] : 0,
        }}
        exit={{
          filter: "none",
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          x: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          y: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          scale: {
            duration: 0.2,
          },
          filter: {
            duration: 0.2,
          },
        }}
        className={cn(
          "text-white relative z-20 transition duration-200",
          className
        )}
      >
        {children}
      </motion.span>
    </div>
  );
};

export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path
        d={`M0 0.5H${width ?? "600"}`}
        stroke={`url(#svgGradient-${id})`}
      />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: hovered ? 0.5 : duration ?? 2,
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
            repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : delay ?? 1,
          }}
        >
          {/* Updated beam colors to include green */}
          <stop stopColor="#10B981" stopOpacity="0" />
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};
