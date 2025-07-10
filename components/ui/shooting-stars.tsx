"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  if (typeof window === "undefined") return { x: 0, y: 0, angle: 45 };
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0: // from top
      return { x: offset, y: -20, angle: 45 + Math.random() * 90 };
    case 1: // from right
      return { x: window.innerWidth + 20, y: offset, angle: 135 + Math.random() * 90 };
    case 2: // from bottom
      return { x: offset, y: window.innerHeight + 20, angle: 225 + Math.random() * 90 };
    case 3: // from left
      return { x: -20, y: offset, angle: 315 + Math.random() * 90 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 3000,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const animationFrameRef = useRef<number>();

  // This effect is responsible for the animation loop.
  // It runs continuously but only acts when there is a star to animate.
  useEffect(() => {
    const moveStar = () => {
      setStar((prevStar) => {
        // If there's no star, do nothing.
        if (!prevStar) {
          return null;
        }

        // Calculate the star's new position.
        const newX = prevStar.x + prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
        const newY = prevStar.y + prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
        const newDistance = prevStar.distance + prevStar.speed;
        const newScale = 1 + newDistance / 100;

        // If the star has moved off-screen, remove it by returning null.
        // Crucially, we DO NOT request another animation frame here, which stops the loop for this star.
        if (
          typeof window !== "undefined" &&
          (newX < -50 ||
          newX > window.innerWidth + 50 ||
          newY < -50 ||
          newY > window.innerHeight + 50)
        ) {
          return null;
        }

        // If the star is still on-screen, update its state.
        return {
          ...prevStar,
          x: newX,
          y: newY,
          distance: newDistance,
          scale: newScale,
        };
      });

      // The animation frame is requested outside the state update to ensure the loop continues.
      animationFrameRef.current = requestAnimationFrame(moveStar);
    };

    // Start the animation loop when the component mounts.
    animationFrameRef.current = requestAnimationFrame(moveStar);

    // Clean up the animation frame when the component unmounts.
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // An empty dependency array ensures this effect runs only once.

  // This effect is responsible for creating new stars.
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextStar = () => {
      // If there is no star, create a new one after a random delay.
      if (!star) {
        const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
        timeoutId = setTimeout(() => {
          const { x, y, angle } = getRandomStartPoint();
          const newStar: ShootingStar = {
            id: Date.now(),
            x,
            y,
            angle,
            scale: 1,
            speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
            distance: 0,
          };
          setStar(newStar);
        }, randomDelay);
      }
    };
    
    // Check if we need to schedule a new star.
    scheduleNextStar();

    // Clean up the timeout when the component unmounts or when a new star is created.
    return () => clearTimeout(timeoutId);
  }, [star, minSpeed, maxSpeed, minDelay, maxDelay]);


  return (
    <svg
      ref={useRef<SVGSVGElement>(null)} // Use a new ref for the SVG element
      className={cn("w-full h-full absolute inset-0", className)}
    >
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
