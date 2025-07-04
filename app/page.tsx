// page.tsx

"use client";
import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Menu from "@/components/Menu";
import { useState } from "react";

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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const scale = useTransform(scrollY, [0, 1000], [0.05, 1]);
  const translateX = useTransform(scrollY, [0, 500, 1000], [600, 300, 0]);

  const transform = useTransform(
    [scale, translateX],
    ([latestScale, latestX]) => {
      return `translateX(${latestX}px) scale(${latestScale})`;
    }
  );

  const handleNavMenuClick = (id: 'about' | 'contact') => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
        setActiveMenu(id);
    }, 300);
  };

  return (
    <main className="relative w-full bg-black">
      <NavbarComponent onMenuClick={handleNavMenuClick} />

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

      {/* This container for Hero and Menu was blocking events. */}
      {/* Adding `pointer-events-none` allows clicks to pass through to the globe. */}
      <div className="relative z-20 pointer-events-none">
        <Hero id="home" />
        <Menu id="menu" activeItem={activeMenu} setActiveItem={setActiveMenu} />
      </div>
    </main>
  );
}
