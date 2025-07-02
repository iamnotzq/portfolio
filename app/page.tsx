"use client";
import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";
import About from "@/components/About";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function Home() {
  const { scrollY } = useScroll();

  // Animate scale from 0.1 to 2 as the user scrolls from 0px to 2000px.
  const scale = useTransform(scrollY, [0, 2000], [0.1, 2]);

  // Re-introducing the corrective path using useTransform for smoothness.
  // The animation will peak at a scroll position of 400px (20% of 2000px).
  const translateX = useTransform(scrollY, [0, 400, 2000], [0, 120, 0]);
  const translateY = useTransform(scrollY, [0, 400, 2000], [0, 50, 0]);

  // Combine all transform values into a single motion value.
  // This is the most performant way and prevents any visual "snapping".
  const transform = useTransform(
    [scale, translateX, translateY],
    ([latestScale, latestX, latestY]) => {
      return `translateX(${latestX}px) translateY(${latestY}px) scale(${latestScale})`;
    }
  );

  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  return (
    <main className="relative w-full bg-black">
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
        <div className="absolute inset-0 z-0">
          <ShootingStars />
          <StarsBackground />
        </div>
        
        <div
          className="absolute top-1/2 left-1/2 z-10 pointer-events-auto"
          style={{
            transform: `translate(-50%, -50%)`,
          }}
        >
          <motion.div
            style={{
              width: '1024px',
              height: '1024px',
              transform: transform,
            }}
          >
            <World data={sampleArcs} globeConfig={globeConfig} />
          </motion.div>
        </div>
      </div>

      <div className="relative z-20">
        <NavbarComponent />
        <Hero />
        <About />
      </div>
    </main>
  );
}
