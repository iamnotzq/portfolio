"use client";
import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Menu from "@/components/Menu";
import Projects from "@/components/Projects";
// No longer need useState here for the menu
// import { useState } from "react";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
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
  autoRotateSpeed: 0.5,
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

export default function Home() {
  const { scrollY } = useScroll();

  // REMOVED: State for modals is no longer managed here.
  // const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  // const [isContactModalOpen, setContactModalOpen] = useState(false);
  // const isAnyModalOpen = isAboutModalOpen || isContactModalOpen;

  const scale = useTransform(scrollY, [0, 1000], [0.05, 1]);
  const translateX = useTransform(scrollY, [0, 500, 1000], [600, 300, 0]);

  const transform = useTransform(
    [scale, translateX],
    ([latestScale, latestX]) => {
      return `translateX(${latestX}px) scale(${latestScale})`;
    }
  );

  // REMOVED: Variants for background animation are no longer needed.
  // const backgroundVariants = { ... };

  return (
    <main className="relative w-full bg-black">
      <NavbarComponent />

      {/* REMOVED: The motion.div that hid the background is gone. 
        The background is now always visible.
      */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
        <div className="absolute inset-0 z-0">
          <ShootingStars />
          <StarsBackground />
        </div>
        
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            style={{
              width: '2048px',
              height: '2048px',
              transform: transform,
            }}
            className="pointer-events-auto"
          >
            <World data={sampleArcs} globeConfig={globeConfig} />
          </motion.div>
        </div>
      </div>

      <div className="relative z-20">
        <Hero />
        {/* MODIFIED: Menu component no longer needs any props. */}
        <Menu />
        
        <div className="h-[50vh]" />
        
        {/* ADDED: id="projects" to make the scroll link work. */}
        <Projects id="projects" />
      </div>
    </main>
  );
}
