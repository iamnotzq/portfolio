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
  Variants,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import Menu from "@/components/Menu";
import { useState, useEffect, useRef, useCallback } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

// --- Pointer Component ---
// MODIFIED: The Pointer component now accepts MotionValue types for x and y props.
interface PointerProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
  text: string;
}

const Pointer = ({ x, y, visible, text }: PointerProps) => {
  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  };

  return (
    // MODIFIED: The style prop can now directly use the motion values for smooth, non-rendering updates.
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x, y }}
      variants={variants}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      <div
        className="relative font-orbitron text-cyan-300 text-sm"
        style={{ transform: "translate(12px, -48px)" }}
      >
        <div className="relative bg-black/50 backdrop-blur-sm px-4 py-2 shadow-[0_0_15px_rgba(56,189,248,0.5)]">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70"></div>
          {text}
        </div>
      </div>
    </motion.div>
  );
};
// --- End of Pointer Component ---


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

export default function Home() {
  const { scrollY } = useScroll();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [loadingState, setLoadingState] = useState('loading');
  const [loadingText, setLoadingText] = useState("Approaching target...");

  const [pointerText, setPointerText] = useState("");
  const [pointerVisible, setPointerVisible] = useState(false);
  
  // FIXED: Replaced standard useState with useMotionValue for pointer tracking
  // to prevent high-frequency re-renders.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // This state is for the Hero component, which will be updated less frequently.
  const [heroPointerPosition, setHeroPointerPosition] = useState({ x: 0, y: 0 });

  const handleNavMenuClick = useCallback((id: 'about' | 'contact' | 'projects') => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
        setActiveMenu(id);
    }, 300);
  }, []);

  const handleHomeClick = () => {
    setActiveMenu(null);
    setTimeout(() => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  // FIXED: This effect now updates motion values directly, which does not trigger re-renders.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        pointerX.set(e.clientX);
        pointerY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pointerX, pointerY]);

  // FIXED: This new effect updates the state for the Hero component on a throttled interval,
  // preventing the render loop.
  useEffect(() => {
    const intervalId = setInterval(() => {
        setHeroPointerPosition({ x: pointerX.get(), y: pointerY.get() });
    }, 100); // Update Hero's prop every 100ms

    return () => clearInterval(intervalId);
  }, [pointerX, pointerY]);


  useEffect(() => {
    const loadingTimer = setTimeout(() => {
        setLoadingText("Welcome.");
        setLoadingState('completed');

        const completedTimer = setTimeout(() => {
          setLoadingState('finished');
          setPointerText("Scroll to discover.");
          setPointerVisible(true);
        }, 1500);

        return () => clearTimeout(completedTimer);
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (loadingState === 'finished') {
      const hash = window.location.hash.substring(1);
      const validHashes = ['about', 'contact', 'projects'];
      
      if (validHashes.includes(hash)) {
        handleNavMenuClick(hash as 'about' | 'contact' | 'projects');
      }
    }
  }, [loadingState, handleNavMenuClick]);


  const scale = useTransform(scrollY, [0, 1000], [0.05, 1]);
  const translateX = useTransform(scrollY, [0, 500, 1000], [600, 300, 0]);
  const starsScale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  const transform = useTransform(
    [scale, translateX],
    ([latestScale, latestX]) => {
      return `translateX(${latestX}px) scale(${latestScale})`;
    }
  );

  return (
    <>
      <Pointer
        x={pointerX}
        y={pointerY}
        visible={pointerVisible}
        text={pointerText}
      />

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
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={loadingText}
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
  
      <main className="relative z-0 min-h-screen w-full overflow-x-clip bg-transparent">
      <NavbarComponent onMenuClick={handleNavMenuClick} onHomeClick={handleHomeClick} />


        <div className="fixed top-20 left-1/2 h-screen w-[200vw] -translate-x-1/2 pointer-events-none">
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
              <World globeConfig={globeConfig} />
            </motion.div>
          </div>
        </div>
        
        <div className="relative z-20 pointer-events-none">
          <Hero
            id="home"
            onMenuClick={handleNavMenuClick}
            setPointerText={setPointerText}
            setPointerVisible={setPointerVisible}
            pointerText="Scroll to discover."
            resumeButtonText="Download my CV."
            connectButtonText="Open contact options."
            pointerPosition={heroPointerPosition}
          />
          <Menu
            id="menu"
            activeItem={activeMenu}
            setActiveItem={setActiveMenu}
            setPointerText={setPointerText}
            setPointerVisible={setPointerVisible}
            menuPointerText="Something extraordinary is on this planet."
            projectsPointerText="Click to view out of this world creations."
            aboutPointerText="Click to learn more about this host."
            contactPointerText="Click to contact the creator."
          />
        </div>
      </main>
    </>
  );
}
