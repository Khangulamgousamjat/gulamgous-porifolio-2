"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position of core dot
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Smooth position of trailing circle using framer-motion springs
  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const trailingX = useSpring(dotX, springConfig);
  const trailingY = useSpring(dotY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Dynamic hover listeners for links and buttons
    const handleMouseEnterInteractable = () => setHovered(true);
    const handleMouseLeaveInteractable = () => setHovered(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const addHoverListeners = () => {
      const interactables = document.querySelectorAll(
        "a, button, input, textarea, select, [data-interactive]"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractable);
        el.addEventListener("mouseleave", handleMouseLeaveInteractable);
      });
    };

    // Initial attachment
    addHoverListeners();

    // Since this is a single page app with sections, we might have nodes added/removed.
    // Set up a MutationObserver to watch for elements and re-bind.
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, [dotX, dotY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full z-50 pointer-events-none mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : hovered ? 1.5 : 1,
          backgroundColor: hovered ? "#a855f7" : "#22d3ee", // purple on hover, cyan default
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Trailing Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/50 z-50 pointer-events-none mix-blend-screen flex items-center justify-center"
        style={{
          x: trailingX,
          y: trailingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : hovered ? 2.2 : 1,
          borderColor: hovered ? "rgba(168, 85, 247, 0.7)" : "rgba(34, 211, 238, 0.5)",
          backgroundColor: hovered ? "rgba(168, 85, 247, 0.1)" : "rgba(34, 211, 238, 0)",
          boxShadow: hovered 
            ? "0 0 15px rgba(168, 85, 247, 0.4)" 
            : "0 0 10px rgba(34, 211, 238, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {/* Futuristic target crosshairs visible only on hover */}
        {hovered && (
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </>
  );
}
