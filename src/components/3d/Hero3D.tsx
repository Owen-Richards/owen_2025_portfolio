'use client';

import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useTheme } from '../ui/ThemeProvider';

import DynamicGeometry from './DynamicGeometry';
import ParticleSystem from './ParticleSystem';
import ThemeAware3D from './ThemeAware3D';

function FloatingGeometry({
  position,
  colors,
}: {
  position: [number, number, number];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    intensity: number;
  };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      // Complex floating motion
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
      meshRef.current.rotation.y = Math.sin(time * 0.7) * 0.2;
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;

      // Subtle position changes
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshPhysicalMaterial
          color={colors.primary}
          metalness={0.9}
          roughness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          transmission={0.02}
          thickness={0.1}
          envMapIntensity={colors.intensity * 0.8}
          opacity={0.85}
          transparent
        />
      </mesh>
    </Float>
  );
}

function EnhancedLighting({ colors }: { colors: { intensity: number } }) {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.elapsedTime;
      lightRef.current.position.x = Math.sin(time * 0.5) * 10;
      lightRef.current.position.z = Math.cos(time * 0.5) * 10;
      lightRef.current.intensity = colors.intensity + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25 * colors.intensity} />
      <directionalLight
        ref={lightRef}
        position={[10, 10, 5]}
        intensity={0.7 * colors.intensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight
        position={[-10, -10, -5]}
        color="#64748b"
        intensity={0.5 * colors.intensity}
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.15}
        penumbra={1}
        intensity={0.35 * colors.intensity}
        color="#fbfcff"
      />
    </>
  );
}

function Scene({
  colors,
}: {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    intensity: number;
  };
}) {
  const geometries = useMemo(() => {
    const colorOptions = [colors.primary, colors.secondary, colors.accent];
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      geometry: ['sphere', 'box', 'torus'][Math.floor(Math.random() * 3)] as
        | 'sphere'
        | 'box'
        | 'torus',
      color:
        colorOptions[Math.floor(Math.random() * colorOptions.length)] ||
        colors.primary,
      key: i,
    }));
  }, [colors]);

  const floatingGeometries = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      key: i,
    }));
  }, []);

  return (
    <Suspense fallback={null}>
      <EnhancedLighting colors={colors} />

      {/* Environment mapping for reflections */}
      <Environment preset="studio" />

      {/* Particle systems - ultra-refined for executive presentation */}
      <ParticleSystem
        count={1000}
        spread={25}
        speed={0.1}
        color={colors.primary}
        size={0.0008}
      />
      <ParticleSystem
        count={500}
        spread={30}
        speed={0.02}
        color={colors.secondary}
        size={0.0006}
      />

      {/* Dynamic geometries */}
      {geometries.map((geo) => (
        <DynamicGeometry
          key={geo.key}
          geometry={geo.geometry}
          position={geo.position}
          color={geo.color}
          scale={0.8}
        />
      ))}

      {/* Floating geometries */}
      {floatingGeometries.map((geo) => (
        <FloatingGeometry
          key={geo.key}
          position={geo.position}
          colors={colors}
        />
      ))}

      {/* Background sphere for depth - more subtle */}
      <mesh position={[0, 0, -20]} scale={[40, 40, 40]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#f8fafc"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </Suspense>
  );
}

export default function Hero3D({
  isContinuous = false,
}: {
  isContinuous?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <div
      className={
        isContinuous ? 'fixed inset-0 -z-10' : 'absolute inset-0 -z-10'
      }
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color
          attach="background"
          args={[theme === 'light' ? '#f8fafc' : '#0f172a']}
        />
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
        <ThemeAware3D>{(colors) => <Scene colors={colors} />}</ThemeAware3D>
      </Canvas>
    </div>
  );
}
