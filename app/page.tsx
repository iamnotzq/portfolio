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

  // --- SIMPLIFIED LOADING STATE ---
  // We now only track if the page is loading or not.
  const [isLoading, setIsLoading] = useState(true);

  const [pointerText, setPointerText] = useState("");
  const [pointerVisible, setPointerVisible] = useState(false);
  
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const [heroPointerPosition, setHeroPointerPosition] = useState({ x: 0, y: 0 });

  // --- RESPONSIVE FIX START ---
  // State to track the current screen size breakpoint (sm, md, lg)
  const [screenSize, setScreenSize] = useState('lg');

  useEffect(() => {
    const queries = {
      sm: window.matchMedia('(max-width: 767px)'),
      md: window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      lg: window.matchMedia('(min-width: 1024px)'),
    };

    const updateScreenSize = () => {
      if (queries.sm.matches) {
        setScreenSize('sm');
      } else if (queries.md.matches) {
        setScreenSize('md');
      } else if (queries.lg.matches) {
        setScreenSize('lg');
      }
    };

    // Initial check
    updateScreenSize();

    // Add listeners for each media query
    Object.values(queries).forEach(query => query.addEventListener('change', updateScreenSize));

    // Cleanup listeners on component unmount
    return () => {
      Object.values(queries).forEach(query => query.removeEventListener('change', updateScreenSize));
    };
  }, []);
  // --- RESPONSIVE FIX END ---

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

  useEffect(() => {
    const intervalId = setInterval(() => {
        setHeroPointerPosition({ x: pointerX.get(), y: pointerY.get() });
    }, 100);

    return () => clearInterval(intervalId);
  }, [pointerX, pointerY]);


  // --- DYNAMIC LOADING EFFECT ---
  // This effect now waits for the window's 'load' event, ensuring all initial
  // page resources (including the dynamic globe component) are ready before hiding the loading screen.
  useEffect(() => {
    const handlePageLoad = () => {
      setIsLoading(false);
      setPointerText("Scroll to discover.");
      setPointerVisible(true);
    };

    // If the page is already loaded when this component mounts, hide the loader immediately.
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      // Otherwise, wait for the 'load' event.
      window.addEventListener('load', handlePageLoad);
      // Clean up the event listener when the component unmounts.
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

  // This effect runs after loading is finished to check for URL hashes
  useEffect(() => {
    if (!isLoading) {
      const hash = window.location.hash.substring(1);
      const validHashes = ['about', 'contact', 'projects'];
      
      if (validHashes.includes(hash)) {
        handleNavMenuClick(hash as 'about' | 'contact' | 'projects');
      }
    }
  }, [isLoading, handleNavMenuClick]);


  const scale = useTransform(scrollY, [0, 1000], [0.05, 1]);
  
  // --- RESPONSIVE FIX ---
  // Define configurations for different screen sizes
  const globeSizeConfig: { [key: string]: string } = {
    sm: "900px",
    md: "1600px",
    lg: "2048px",
  };

  const translateXConfig: { [key: string]: number[] } = {
    sm: [300, 120, 0],
    md: [500, 250, 0],
    lg: [600, 300, 0],
  };

  // Use different translation values based on the current screen size
  const translateX = useTransform(
    scrollY,
    [0, 500, 1000],
    translateXConfig[screenSize] || translateXConfig['lg']
  );
  // --- END RESPONSIVE FIX ---

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

      {/* --- SIMPLIFIED LOADING SCREEN --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-4xl lg:text-6xl font-semibold text-neutral-200 font-orbitron"
            >
              Welcome
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
            {/* --- RESPONSIVE FIX START --- */}
            {/* The width and height of the globe container are now responsive, based on screen size. */}
            <motion.div
              style={{
                width: globeSizeConfig[screenSize] || globeSizeConfig['lg'],
                height: globeSizeConfig[screenSize] || globeSizeConfig['lg'],
                transform: transform,
              }}
              className="pointer-events-auto"
            >
              <World globeConfig={globeConfig} />
            </motion.div>
            {/* --- RESPONSIVE FIX END --- */}
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
