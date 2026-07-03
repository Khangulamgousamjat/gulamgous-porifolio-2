"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Camera controller reading from scrollProgressRef and mouseRef inside useFrame
function CameraController({ scrollProgressRef, isPullbackRef, mouseRef }) {
  const targetY = useRef(0);

  useFrame((state) => {
    const progress = (scrollProgressRef.current || 0) + (isPullbackRef?.current ? 1.5 : 0);
    const yOffset = -progress * 12;
    targetY.current = THREE.MathUtils.lerp(targetY.current, yOffset, 0.05);

    const mX = mouseRef.current?.x || 0;
    const mY = mouseRef.current?.y || 0;
    const px = (mX / window.innerWidth - 0.5) * 0.4;
    const py = -(mY / window.innerHeight - 0.5) * 0.4;

    state.camera.position.set(px, targetY.current + py, 8);
    state.camera.lookAt(px, targetY.current + py, 0);
  });

  return null;
}

// Cursor-linked PointLight reading from mouseRef inside useFrame
function CursorLight({ mouseRef }) {
  const lightRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    const mX = mouseRef.current?.x || 0;
    const mY = mouseRef.current?.y || 0;
    const x = (mX / window.innerWidth - 0.5) * viewport.width;
    const y = -(mY / window.innerHeight - 0.5) * viewport.height;
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

// Drifting cyber-space particle field using Custom ShaderMaterial (Zero CPU position updates / buffer re-uploads!)
function SpaceParticles({ count = 1000 }) {
  const matRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80 - 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      spd[i] = Math.random() * 0.02 + 0.005;
    }
    return [pos, spd];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#22d3ee") },
    }),
    []
  );

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
          count={count}
          array={speeds}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform float uTime;
          attribute float aSpeed;
          void main() {
            vec3 pos = position;
            float minY = -70.0;
            float yRange = 90.0;
            pos.y = minY + mod(pos.y - minY + uTime * aSpeed * 0.4, yRange);
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 0.06 * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - dist * 2.0) * 0.5;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
}

// Section 1: Hero Hologram
function HeroHologram({ scrollProgressRef }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const curProgress = scrollProgressRef?.current || 0;
    if (Math.abs(curProgress - 0) > 1.8) return;

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
      <Float speed={2} floatIntensity={0.8} rotationIntensity={0.5}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.1, 32, 32]} />
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

      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.08, 16, 48]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.95}
          roughness={0.08}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.4, 0.04, 16, 48]} />
        <meshStandardMaterial
          color="#22d3ee"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      <gridHelper args={[40, 40, "#22d3ee", "#312e81"]} position={[0, -4, 0]} opacity={0.5} transparent />
    </group>
  );
}

// Section 2: About Digital Chamber
function AboutChamber({ scrollProgressRef }) {
  const groupRef = useRef();

  useFrame((state) => {
    const curProgress = scrollProgressRef?.current || 0;
    if (Math.abs(curProgress - 1) > 1.8) return;

    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = -12 + Math.sin(t * 0.4) * 0.15;
      groupRef.current.rotation.y = Math.cos(t * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -12, 0]}>
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

        <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[0, 0, -2]}>
          <torusGeometry args={[4.2, 0.06, 16, 48]} />
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.95}
            roughness={0.08}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Section 3: Skills Core
function SkillsCore({ scrollProgressRef }) {
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
    const curProgress = scrollProgressRef?.current || 0;
    if (Math.abs(curProgress - 2) > 1.8) return;

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
      <Float speed={3} floatIntensity={1.0}>
        <mesh ref={orbRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
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

      <mesh ref={innerOrbRef}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={3.0}
          roughness={0.5}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.08, 16, 48]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      <group ref={skillGroupRef}>
        {skillNodes.map((node, i) => (
          <group key={i} position={[node.x, 0, node.z]}>
            <mesh>
              <dodecahedronGeometry args={[0.26]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#22d3ee" : "#a855f7"}
                metalness={0.9}
                roughness={0.08}
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

// Section 4: Project Engineering Lab
function ProjectLab({ scrollProgressRef }) {
  const sensorRef = useRef();

  useFrame((state) => {
    const curProgress = scrollProgressRef?.current || 0;
    if (Math.abs(curProgress - 3) > 1.8) return;

    const t = state.clock.getElapsedTime();
    if (sensorRef.current) {
      sensorRef.current.rotation.y = t * 0.25;
      sensorRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, -36, 0]}>
      <group ref={sensorRef}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.3, 1.4, 0.5, 24]} />
          <meshStandardMaterial
            color="#0f0b29"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.9, 0.15, 16, 24]} />
          <meshStandardMaterial
            color="#a855f7"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>

        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.6, 24, 16]} />
          <meshStandardMaterial 
            color="#22d3ee" 
            emissive="#22d3ee" 
            emissiveIntensity={2.5} 
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.06, 8, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      </group>

      <mesh position={[0, -2.0, 0]}>
        <coneGeometry args={[2.0, 3.8, 24, 1, true]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, -1.5, 0]}>
        <ringGeometry args={[1.2, 1.25, 24]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Section 5: Timeline Path
function TimelinePath({ scrollProgressRef }) {
  const lineRef = useRef();

  useFrame((state) => {
    const curProgress = scrollProgressRef?.current || 0;
    if (Math.abs(curProgress - 4) > 1.8) return;

    const t = state.clock.getElapsedTime();
    if (lineRef.current) {
      lineRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 3.0) * 0.3;
    }
  });

  return (
    <group position={[0, -48, 0]}>
      <mesh ref={lineRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 9, 12]} />
        <meshStandardMaterial
          color="#22d3ee"
          metalness={0.95}
          roughness={0.05}
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </mesh>

      <group position={[-2.5, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.9}
            roughness={0.1}
            emissive="#0891b2"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      <group position={[2.5, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#a855f7"
            metalness={0.9}
            roughness={0.1}
            emissive="#7e22ce"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      <gridHelper args={[20, 20, "#a855f7", "#581c87"]} position={[0, -3.5, 0]} opacity={0.4} transparent />
    </group>
  );
}

// Section 6: Contact Console
function ContactConsole({ scrollProgressRef }) {
  const endingParticlesRef = useRef();

  useFrame((state) => {
    const curProgress = scrollProgressRef?.current || 0;
    if (Math.abs(curProgress - 5) > 1.8) return;

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

export default function Scene({ scrollProgressRef, isPullbackRef, mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#030014"]} />
      <ambientLight intensity={0.4} />
      
      <directionalLight position={[5, 10, 5]} intensity={2.0} color="#22d3ee" />
      <pointLight position={[-5, 5, -5]} intensity={1.5} color="#a855f7" />
      
      <fogExp2 attach="fog" color="#030014" density={0.03} />

      <CameraController scrollProgressRef={scrollProgressRef} isPullbackRef={isPullbackRef} mouseRef={mouseRef} />
      <CursorLight mouseRef={mouseRef} />

      <SpaceParticles />

      <HeroHologram scrollProgressRef={scrollProgressRef} />
      <AboutChamber scrollProgressRef={scrollProgressRef} />
      <SkillsCore scrollProgressRef={scrollProgressRef} />
      <ProjectLab scrollProgressRef={scrollProgressRef} />
      <TimelinePath scrollProgressRef={scrollProgressRef} />
      <ContactConsole scrollProgressRef={scrollProgressRef} />
    </Canvas>
  );
}
