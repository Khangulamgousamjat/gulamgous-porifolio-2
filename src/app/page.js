"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import CanvasContainer from "@/components/CanvasContainer";
import Sections from "@/components/Sections";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isPullback, setIsPullback] = useState(false);

  // Track mouse coordinates for 3D parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll details
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      
      // Calculate overall scroll progress (0.0 to 5.0 matches 6 sections)
      // We divide scrollY by viewport height to get fractional section indices
      const progress = scrollY / winHeight;
      setScrollProgress(progress);

      // Determine current section ID
      const sections = ["hero", "about", "skills", "projects", "timeline", "contact"];
      const index = Math.min(
        Math.floor((scrollY + winHeight / 2) / winHeight),
        sections.length - 1
      );
      setActiveSection(sections[index]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = () => {
    // Trigger cinematic camera pullback at ending
    setIsPullback(true);
    // Smoothly scroll down a bit more or pull back camera
  };

  return (
    <main className="relative min-h-screen bg-[#030014] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Immersive loading sequence */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          {/* Custom interactive trailing cursor */}
          <CustomCursor />

          {/* Floating glassmorphic header */}
          <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

          {/* 3D background world */}
          <CanvasContainer 
            activeSection={activeSection}
            scrollProgress={isPullback ? scrollProgress + 1.5 : scrollProgress}
            mouseX={mouse.x}
            mouseY={mouse.y}
          />

          {/* Core HTML Sections Overlay */}
          <div className="relative z-10 flex flex-col w-full">
            <Sections 
              activeSection={activeSection} 
              onContactSubmit={handleContactSubmit}
            />
          </div>

          {/* Cyber audio-reactive pulse light (Visual only) */}
          <div className="fixed bottom-4 left-6 z-30 font-mono text-[9px] text-cyan-400/50 tracking-widest hidden md:flex items-center gap-2 pointer-events-none select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>UPLINK SIGNAL: ACTIVE</span>
          </div>

          {/* Footer bar */}
          <div className="fixed bottom-4 right-6 z-30 font-mono text-[9px] text-zinc-500 tracking-wider hidden md:block pointer-events-none select-none">
            © {new Date().getFullYear()} NIKITA JAMODKAR. ALL RIGHTS RESERVED.
          </div>
        </>
      )}
    </main>
  );
}
