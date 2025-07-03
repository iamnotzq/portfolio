"use client";
import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";
import About from "@/components/About";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Projects from "@/components/Projects";
import Menu from "@/components/Menu";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function Home() {
  const { scrollY } = useScroll();

  // Animate scale from 0.1 to 2 as the user scrolls from 0px to 2000px.
  const scale = useTransform(scrollY, [0, 1000], [0.05, 1]);

  // CHANGE: Create the new curved animation path.
  // [0, 1000, 2000] are the scroll positions (start, middle, end).
  // [300, -150, 0] are the horizontal positions in pixels.
  // It starts 300px to the right, moves to 150px to the left, and ends at 0 (center).
  const translateX = useTransform(scrollY, [0, 500, 1000], [600, 300, 0]);

  // CHANGE: Combine scale and our new translateX into a single transform string.
  // This is the most performant way to apply multiple transforms.
  const transform = useTransform(
    [scale, translateX],
    ([latestScale, latestX]) => {
      return `translateX(${latestX}px) scale(${latestScale})`;
    }
  );

  const globeConfig = {
    pointSize: 0.1,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.05,
    shininess: 0.5,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.1,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: 0,
      startLng: 0,
      endLat: -0,
      endLng: -0,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    }
  ];

  return (
    <main className="relative w-full bg-black">
      {/* The Navbar is now a direct child of main and will be fixed. */}
      <NavbarComponent />

      {/* This container holds all the fixed background elements. */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
        <div className="absolute inset-0 z-0">
          <ShootingStars />
          <StarsBackground />
        </div>
        
        {/* This is the Flexbox centering container. */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            style={{
              width: '2048px',
              height: '2048px',
              // CHANGE: Apply the new combined transform for the curved path.
              transform: transform,
            }}
            className="pointer-events-auto"
          >
            <World data={sampleArcs} globeConfig={globeConfig} />
          </motion.div>
        </div>
      </div>

      {/* The scrollable content sits on top. */}
      <div className="relative z-20">
        <Hero />
        <Menu />
      </div>
    </main>
  );
}
