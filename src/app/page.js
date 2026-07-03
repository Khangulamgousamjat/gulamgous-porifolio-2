"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import CanvasContainer from "@/components/CanvasContainer";
import Sections from "@/components/Sections";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);
  const isPullbackRef = useRef(false);
  const activeSectionRef = useRef("hero");
  const tickingRef = useRef(false);

  // Sync activeSectionRef
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Track mouse coordinates for 3D parallax without triggering React state re-renders
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll details throttled via requestAnimationFrame
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const winHeight = window.innerHeight || 1;
          
          // Calculate overall scroll progress (0.0 to 5.0 matches 6 sections)
          const progress = scrollY / winHeight;
          scrollProgressRef.current = progress;

          // Determine current section ID
          const sections = ["hero", "about", "skills", "projects", "timeline", "contact"];
          const index = Math.min(
            Math.floor((scrollY + winHeight / 2) / winHeight),
            sections.length - 1
          );
          const newSection = sections[index];

          // Only trigger React state update if the section index actually changed
          if (newSection !== activeSectionRef.current) {
            activeSectionRef.current = newSection;
            setActiveSection(newSection);
          }

          tickingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const handleNavigate = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleContactSubmit = useCallback(() => {
    // Trigger cinematic camera pullback at ending
    isPullbackRef.current = true;
  }, []);

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
            scrollProgressRef={scrollProgressRef}
            isPullbackRef={isPullbackRef}
            mouseRef={mouseRef}
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
            © {new Date().getFullYear()} GULAMGOUS KHAN. ALL RIGHTS RESERVED.
          </div>
        </>
      )}
    </main>
  );
}

