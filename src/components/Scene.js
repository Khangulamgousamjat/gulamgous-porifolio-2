"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Camera controller that slides purely along the vertical Y axis
// This prevents perspective "push and pull" distortion of the background elements.
function CameraController({ scrollProgress, mouseX, mouseY }) {
  const targetY = useRef(0);

  useFrame((state) => {
    // Determine target vertical position based on scrollProgress (0 to 5)
    // Vertical distance between sections in 3D space is 12 units
    const yOffset = -scrollProgress * 12;
    targetY.current = THREE.MathUtils.lerp(targetY.current, yOffset, 0.05);

    // Apply a subtle, uniform mouse parallax coordinate shifting
    // We shift both position and lookAt identically so the camera angle remains perfectly straight (parallel to Z)
    const px = (mouseX / window.innerWidth - 0.5) * 0.4;
    const py = -(mouseY / window.innerHeight - 0.5) * 0.4;

    // Set camera position and focal target (locked parallel scroll angle)
    state.camera.position.set(px, targetY.current + py, 8);
    state.camera.lookAt(px, targetY.current + py, 0);
  });

  return null;
}

// Cursor-linked PointLight to cast dynamic specular reflections on glossy materials (Blender/Unity style)
function CursorLight({ mouseX, mouseY }) {
  const lightRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    
    // Map screen mouse positions to 3D viewport sizes
    const x = (mouseX / window.innerWidth - 0.5) * viewport.width;
    const y = -(mouseY / window.innerHeight - 0.5) * viewport.height;
    
    // Track light relative to camera position
    const camY = state.camera.position.y;
    lightRef.current.position.set(x, camY + y, 3.2);
  });

  return (
    <pointLight 
      ref={lightRef} 
      intensity={7.0} 
      distance={12} 
      color="#22d3ee" 
      decay={1.8} 
    />
  );
}

// Drifting cyber-space particle field
function SpaceParticles({ count = 1000 }) {
  const pointsRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80 - 30; // Y (covers all sections)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25; // Z
      spd[i] = Math.random() * 0.02 + 0.005;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += speeds[i] * 0.4;
      if (posArray[i * 3 + 1] > 20) {
        posArray[i * 3 + 1] = -70;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#22d3ee"
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Section 1: Hero Hologram (High-Fidelity Glossy Chrome & Glass Sphere Ring)
function HeroHologram() {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.x = t * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.6;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.5;
      ring2Ref.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Solid Glossy Chrome-Glass Sphere */}
      <Float speed={2} floatIntensity={0.8} rotationIntensity={0.5}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.1, 64, 64]} />
          <meshPhysicalMaterial
            color="#22d3ee"
            metalness={0.9}
            roughness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            transmission={0.4}
            thickness={1.5}
            ior={1.6}
            emissive="#0891b2"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Orbiting Ring 1 (Glossy Metal) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.08, 16, 100]} />
        <meshPhysicalMaterial
          color="#a855f7"
          metalness={0.95}
          roughness={0.08}
          clearcoat={1.0}
        />
      </mesh>

      {/* Orbiting Ring 2 (Glossy Chrome) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.4, 0.04, 16, 100]} />
        <meshPhysicalMaterial
          color="#22d3ee"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
        />
      </mesh>
      {/* Cyber Grid Floor below */}
      <gridHelper args={[40, 40, "#22d3ee", "#312e81"]} position={[0, -4, 0]} opacity={0.5} transparent />
    </group>
  );
}

// Section 2: About Digital Chamber (Floating Physical Glass Panels)
function AboutChamber() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = -12 + Math.sin(t * 0.4) * 0.15;
      groupRef.current.rotation.y = Math.cos(t * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -12, 0]}>
      {/* Floating Translucent Physical Glass Panels */}
      <Float speed={1.5} floatIntensity={0.5}>
        <mesh position={[-2.5, 1, -1.5]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[3.5, 2.5, 0.08]} />
          <meshPhysicalMaterial
            color="#a855f7"
            transparent
            opacity={0.2}
            metalness={0.1}
            roughness={0.15}
            transmission={0.8}
            thickness={1.2}
            clearcoat={1.0}
          />
        </mesh>

        <mesh position={[2.5, -1, -1.5]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[3.5, 2.5, 0.08]} />
          <meshPhysicalMaterial
            color="#22d3ee"
            transparent
            opacity={0.2}
            metalness={0.1}
            roughness={0.15}
            transmission={0.8}
            thickness={1.2}
            clearcoat={1.0}
          />
        </mesh>

        {/* Heavy Glossy boundary Ring */}
        <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[0, 0, -2]}>
          <torusGeometry args={[4.2, 0.06, 16, 100]} />
          <meshPhysicalMaterial
            color="#22d3ee"
            metalness={0.95}
            roughness={0.08}
            clearcoat={1.0}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Section 3: Skills Core (Heavy Crystal-Glass Orb & Chrome Nodes)
function SkillsCore() {
  const orbRef = useRef();
  const innerOrbRef = useRef();
  const ringRef = useRef();
  const skillGroupRef = useRef();

  const skills = [
    "Python",
    "HTML",
    "CSS",
    "JavaScript",
    "C/C++",
    "UI Design",
    "Development",
  ];

  const skillNodes = useMemo(() => {
    return skills.map((name, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const radius = 3.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return { name, x, z };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.rotation.y = t * 0.2;
    }
    if (innerOrbRef.current) {
      innerOrbRef.current.rotation.y = -t * 0.5;
      innerOrbRef.current.scale.setScalar(1 + Math.sin(t * 2.0) * 0.08);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
      ringRef.current.rotation.y = t * 0.1;
    }
    if (skillGroupRef.current) {
      skillGroupRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group position={[0, -24, 0]}>
      {/* Outer Thick Glass Refractive Orb */}
      <Float speed={3} floatIntensity={1.0}>
        <mesh ref={orbRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshPhysicalMaterial
            color="#22d3ee"
            metalness={0.1}
            roughness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            transmission={0.9}
            thickness={2.5}
            ior={1.55}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* Inner Glowing Nucleus */}
      <mesh ref={innerOrbRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={3.0}
          roughness={0.5}
        />
      </mesh>

      {/* Heavy Chrome Orbit Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.08, 16, 100]} />
        <meshPhysicalMaterial
          color="#a855f7"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
        />
      </mesh>

      {/* Orbiting skill nodes (Chrome / Emissive Solid Materials) */}
      <group ref={skillGroupRef}>
        {skillNodes.map((node, i) => (
          <group key={i} position={[node.x, 0, node.z]}>
            <mesh>
              <dodecahedronGeometry args={[0.26]} />
              <meshPhysicalMaterial
                color={i % 2 === 0 ? "#22d3ee" : "#a855f7"}
                metalness={0.9}
                roughness={0.08}
                clearcoat={1.0}
                emissive={i % 2 === 0 ? "#0891b2" : "#7e22ce"}
                emissiveIntensity={0.6}
              />
            </mesh>
            <line>
              <bufferGeometry>
                <float32BufferAttribute
                  attach="geometry-attributes-position"
                  args={[new Float32Array([0, 0, 0, -node.x, 0, -node.z]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={i % 2 === 0 ? "#22d3ee" : "#a855f7"}
                transparent
                opacity={0.25}
              />
            </line>
          </group>
        ))}
      </group>
    </group>
  );
}

// Section 4: Project Engineering Lab (Rotating 3D Sensor Device Model)
function ProjectLab() {
  const sensorRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sensorRef.current) {
      sensorRef.current.rotation.y = t * 0.25;
      sensorRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, -36, 0]}>
      <group ref={sensorRef}>
        {/* Main Base (Heavy dark metal) */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.3, 1.4, 0.5, 32]} />
          <meshPhysicalMaterial
            color="#0f0b29"
            metalness={0.9}
            roughness={0.2}
            clearcoat={0.8}
          />
        </mesh>
        
        {/* Core Ring (Polished Chrome) */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.9, 0.15, 16, 32]} />
          <meshPhysicalMaterial
            color="#a855f7"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1.0}
          />
        </mesh>

        {/* Glowing Sensor Iris Lens */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.6, 32, 16]} />
          <meshPhysicalMaterial 
            color="#22d3ee" 
            emissive="#22d3ee" 
            emissiveIntensity={2.5} 
            roughness={0.1}
            metalness={0.1}
            clearcoat={1.0}
          />
        </mesh>

        {/* Outer floating ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.06, 8, 64]} />
          <meshPhysicalMaterial
            color="#22d3ee"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1.0}
          />
        </mesh>
      </group>

      {/* Holographic light cone scanning downward */}
      <mesh position={[0, -2.0, 0]}>
        <coneGeometry args={[2.0, 3.8, 32, 1, true]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Laser line scanning down */}
      <mesh position={[0, -1.5, 0]}>
        <ringGeometry args={[1.2, 1.25, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Section 5: Timeline Path (Floating timeline rails and milestone nodes)
function TimelinePath() {
  const lineRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lineRef.current) {
      lineRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 3.0) * 0.3;
    }
  });

  return (
    <group position={[0, -48, 0]}>
      {/* Timeline rail (Heavy chrome rod) */}
      <mesh ref={lineRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 9, 16]} />
        <meshPhysicalMaterial
          color="#22d3ee"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Python Training Node */}
      <group position={[-2.5, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[0.5]} />
          <meshPhysicalMaterial
            color="#22d3ee"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            emissive="#0891b2"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Plant Training Internship Node */}
      <group position={[2.5, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[0.5]} />
          <meshPhysicalMaterial
            color="#a855f7"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            emissive="#7e22ce"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Cyber Grid Floor below */}
      <gridHelper args={[20, 20, "#a855f7", "#581c87"]} position={[0, -3.5, 0]} opacity={0.4} transparent />
    </group>
  );
}

// Section 6: Contact Console & Ending (Fades universe out)
function ContactConsole() {
  const endingParticlesRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (endingParticlesRef.current) {
      endingParticlesRef.current.rotation.y = t * 0.08;
      endingParticlesRef.current.rotation.x = t * 0.04;
    }
  });

  return (
    <group position={[0, -60, 0]}>
      <group ref={endingParticlesRef}>
        <mesh position={[-3, 2, -2]}>
          <tetrahedronGeometry args={[0.15]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} wireframe />
        </mesh>
        <mesh position={[3, -1, -3]}>
          <tetrahedronGeometry args={[0.2]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.3} wireframe />
        </mesh>
        <mesh position={[-1.5, -2, -1]}>
          <octahedronGeometry args={[0.1]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene({ scrollProgress, mouseX, mouseY }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#030014"]} />
      <ambientLight intensity={0.4} />
      
      {/* Studio key lights */}
      <directionalLight position={[5, 10, 5]} intensity={2.0} color="#22d3ee" />
      <pointLight position={[-5, 5, -5]} intensity={1.5} color="#a855f7" />
      
      <fogExp2 attach="fog" color="#030014" density={0.03} />

      {/* Scrolling Y-axis locked camera controller */}
      <CameraController scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />

      {/* Real-time mouse-following specular light (cast shine on materials) */}
      <CursorLight mouseX={mouseX} mouseY={mouseY} />

      <SpaceParticles />

      {/* Scene Elements */}
      <HeroHologram />
      <AboutChamber />
      <SkillsCore />
      <ProjectLab />
      <TimelinePath />
      <ContactConsole />
    </Canvas>
  );
}
