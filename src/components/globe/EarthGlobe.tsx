"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#1e3a5f"
          emissive="#22d3ee"
          emissiveIntensity={0.15}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      <mesh scale={[2.05, 2.05, 2.05]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
      {/* Atmosphere glow */}
      <mesh scale={[2.15, 2.15, 2.15]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#a855f7" />
      <Earth />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export function EarthGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          className="!h-full !w-full"
          gl={{ antialias: true, alpha: true }}
        >
          <GlobeScene />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-unity-bg/80 via-transparent to-transparent" />
    </div>
  );
}
