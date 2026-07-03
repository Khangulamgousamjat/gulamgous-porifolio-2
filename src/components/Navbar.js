"use client";

import { useEffect, useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ activeSection, onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const navItems = [
    { id: "hero", label: "Identity" },
    { id: "about", label: "Chamber" },
    { id: "skills", label: "Core" },
    { id: "projects", label: "Lab" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Terminal" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className="flex items-center gap-1 p-2 rounded-full border border-cyan-500/20 bg-black/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {/* Minimal Brand Logo */}
            <button
              onClick={() => onNavigate("hero")}
              className="px-4 py-2 font-mono text-sm font-bold tracking-widest text-cyan-400 hover:text-white transition-colors cursor-pointer mr-2 border-r border-white/20"
              data-interactive
            >
              GK
            </button>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative px-4 py-1.5 font-mono text-xs tracking-wider transition-colors cursor-pointer rounded-full ${
                      isActive ? "text-cyan-400 font-bold" : "text-zinc-200 font-bold hover:text-cyan-300"
                    }`}
                    data-interactive
                  >
                    {/* Glowing highlight bubble for active section */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/15 border border-cyan-400/50 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                        layoutId="activeNavBubble"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

export default memo(Navbar);

