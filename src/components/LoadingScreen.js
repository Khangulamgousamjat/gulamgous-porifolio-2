"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("Initializing System Core...");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const phases = [
      { threshold: 15, text: "Establishing Neural Uplink..." },
      { threshold: 35, text: "Loading Vector Particle Fields..." },
      { threshold: 55, text: "Configuring 3D Matrix Geometries..." },
      { threshold: 75, text: "Calibrating Volumetric Shaders..." },
      { threshold: 90, text: "Synchronizing Scroll Anchors..." },
      { threshold: 100, text: "Digital Interface Ready." },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setPhase("Digital Interface Ready.");
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1000); // Allow fade out
          }, 800);
          return 100;
        }

        const currentPhase = phases.find((p) => next < p.threshold);
        if (currentPhase) {
          setPhase(currentPhase.text);
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-sans select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Cyber grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

          {/* Central Holographic Logo/Ring */}
          <div className="relative mb-12 flex items-center justify-center">
            {/* Pulsing Outer Ring */}
            <motion.div
              className="absolute h-40 w-40 rounded-full border border-cyan-500/20"
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            />
            {/* Spinning Middle Ring */}
            <motion.div
              className="absolute h-32 w-32 rounded-full border border-dashed border-purple-500/40"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
            {/* Tech Logo */}
            <motion.div
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-zinc-950/80 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-2xl font-bold tracking-widest text-cyan-400">NJ</span>
              {/* Inner glowing dot */}
              <div className="absolute bottom-6 right-6 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            </motion.div>
          </div>

          {/* Progress Status Info */}
          <div className="w-80 px-4 text-center z-10">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/80 mb-1">
              SYSTEM INITIALIZATION
            </h2>
            <div className="relative h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden mb-3">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center font-mono text-[10px] text-zinc-500 tracking-wider">
              <span className="animate-pulse">{phase}</span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>
          </div>

          {/* Sound Wave Visualization (Visual-only) */}
          <div className="absolute bottom-12 flex items-end gap-1 h-8 opacity-40">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-purple-600 to-cyan-400 rounded-full"
                animate={{
                  height: [
                    "15%",
                    `${Math.sin(i * 0.5) * 60 + 40}%`,
                    `${Math.cos(i * 0.8) * 50 + 50}%`,
                    "15%",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1 + (i % 3) * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Futuristic Data Stream overlays */}
          <div className="absolute top-6 left-6 font-mono text-[9px] text-cyan-500/30 space-y-1 pointer-events-none hidden md:block">
            <div>LOC: PORT_NODE_8814</div>
            <div>STATUS: ONLINE</div>
            <div>COORDS: 40.7128° N, 74.0060° W</div>
            <div>MEM_LOAD: 41.2%</div>
          </div>

          <div className="absolute top-6 right-6 font-mono text-[9px] text-purple-500/30 space-y-1 pointer-events-none text-right hidden md:block">
            <div>SECURE: TLS_v1.3</div>
            <div>SHADERS: GLSL_300_ES</div>
            <div>RENDERER: WEBGL_2</div>
            <div>ENGINE: NEXT_JS_15</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
