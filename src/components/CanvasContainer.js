"use client";

import dynamic from "next/dynamic";

// Dynamically import the Canvas/Scene to prevent SSR issues with WebGL/Three.js
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <div className="text-zinc-500 font-mono text-xs">Initializing 3D Universe...</div>
    </div>
  ),
});

export default function CanvasContainer({ activeSection, scrollProgressRef, isPullbackRef, mouseRef }) {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      <Scene 
        activeSection={activeSection} 
        scrollProgressRef={scrollProgressRef}
        isPullbackRef={isPullbackRef}
        mouseRef={mouseRef}
      />
    </div>
  );
}
