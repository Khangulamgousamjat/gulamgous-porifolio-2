"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  // Position of core dot
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Smooth position of trailing circle using framer-motion springs
  // Ultra-fast, responsive spring configuration (snaps instantly to hardware mouse)
  const springConfig = { damping: 45, stiffness: 1200, mass: 0.1 };
  const trailingX = useSpring(dotX, springConfig);
  const trailingY = useSpring(dotY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Efficient event delegation on window for hover detection
    const handleMouseOver = (e) => {
      if (!e.target || !(e.target instanceof Element)) return;
      const isInteractive = !!e.target.closest(
        "a, button, input, textarea, select, [data-interactive]"
      );
      setHovered(isInteractive);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [dotX, dotY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full z-50 pointer-events-none will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : hovered ? 1.5 : 1,
          backgroundColor: hovered ? "#a855f7" : "#22d3ee",
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
      />

      {/* Trailing Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/60 z-50 pointer-events-none flex items-center justify-center will-change-transform"
        style={{
          x: trailingX,
          y: trailingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : hovered ? 2.0 : 1,
          borderColor: hovered ? "rgba(168, 85, 247, 0.8)" : "rgba(34, 211, 238, 0.6)",
          backgroundColor: hovered ? "rgba(168, 85, 247, 0.12)" : "rgba(34, 211, 238, 0)",
          boxShadow: hovered 
            ? "0 0 15px rgba(168, 85, 247, 0.5)" 
            : "0 0 10px rgba(34, 211, 238, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
      >
        {/* Futuristic target crosshairs visible only on hover */}
        {hovered && (
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </motion.div>
    </>
  );
}
