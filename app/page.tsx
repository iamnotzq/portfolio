// page.tsx

"use client";
import Hero from "@/components/Hero";
import NavbarComponent from "@/components/Navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Menu from "@/components/Menu";
import { useState, useEffect } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

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
  emissiveIntensity: 0.1,
  shininess: 0.9,
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
    color: colors[Math.floor(Math.random() * colors.length)],
  }
];

export default function Home() {
  const { scrollY } = useScroll();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // State to manage the multi-step loading animation
  const [loadingState, setLoadingState] = useState('loading'); // loading -> completed -> finished
  const [loadingText, setLoadingText] = useState("Approaching target...");

  useEffect(() => {
    // Phase 1: Initial "loading" text
    const loadingTimer = setTimeout(() => {
        // Phase 2: Switch to "completed" text
        setLoadingText("Welcome.");
        setLoadingState('completed');

        // Phase 3: Wait a moment, then finish to trigger fade-out
        const completedTimer = setTimeout(() => {
          setLoadingState('finished');
        }, 1500); // Show "completed" message for 1.5 seconds

        return () => clearTimeout(completedTimer);
    }, 5000); // Show "loading" message for 5 seconds

    return () => clearTimeout(loadingTimer);
  }, []);

  // This new useEffect handles the URL hash for deep linking
  useEffect(() => {
    // Only run this logic after the initial loading animation is finished
    if (loadingState === 'finished') {
      const hash = window.location.hash.substring(1); // Get hash value without the '#'
      const validHashes = ['about', 'contact', 'projects'];
      
      if (validHashes.includes(hash)) {
        handleNavMenuClick(hash as 'about' | 'contact' | 'projects');
      }
    }
  }, [loadingState]); // Rerun this effect when the loading state changes


  const scale = useTransform(scrollY, [0, 1000], [0.05, 1]);
  const translateX = useTransform(scrollY, [0, 500, 1000], [600, 300, 0]);
  const starsScale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  const transform = useTransform(
    [scale, translateX],
    ([latestScale, latestX]) => {
      return `translateX(${latestX}px) scale(${latestScale})`;
    }
  );

  const handleNavMenuClick = (id: 'about' | 'contact' | 'projects') => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
        setActiveMenu(id);
    }, 300);
  };

  const handleHomeClick = () => {
    // Close any active menu panel
    setActiveMenu(null);

    // After a short delay to allow the menu to start collapsing, scroll to the home section.
    // This prevents a conflict between the layout and scroll animations.
    setTimeout(() => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        // Explicitly scroll to the Hero component with id="home"
        homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback if the element is not found for any reason
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <>
      <AnimatePresence>
        {loadingState !== "finished" && (
          <motion.div
            key="loading-screen"
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${
              loadingState === "completed"
                ? "bg-black/50 backdrop-blur-sm"
                : "bg-black"
            }`}
          >
            {/* Simplified loading text animation */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={loadingText} // Re-animates when the text changes
              transition={{ duration: 0.5 }}
              className={`text-4xl md:text-4xl lg:text-6xl font-semibold text-neutral-200 font-orbitron`}
            >
              {loadingText}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 -z-20 bg-black"></div>

      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(12, 20, 69)"
        gradientBackgroundEnd="rgb(76, 29, 12)"
        firstColor="42, 14, 79"
        secondColor="12, 20, 69"
        thirdColor="76, 29, 12"
        fourthColor="42, 14, 79"
        fifthColor="12, 20, 69"
        containerClassName="fixed inset-0 -z-10 opacity-50"
        interactive={false}
      />
  
      <main className="relative z-0 w-full min-h-screen bg-transparent">
      <NavbarComponent onMenuClick={handleNavMenuClick} onHomeClick={handleHomeClick} />


        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
          <div className="absolute inset-0 z-0">
            <ShootingStars />
            <StarsBackground scale={starsScale} />
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

        <div className="relative z-20 pointer-events-none">
          <Hero id="home" onMenuClick={handleNavMenuClick} />
          <Menu id="menu" activeItem={activeMenu} setActiveItem={setActiveMenu} />
        </div>
      </main>
    </>
  );
}
