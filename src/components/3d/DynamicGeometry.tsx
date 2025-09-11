'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface DynamicGeometryProps {
  geometry: 'sphere' | 'box' | 'torus';
  position: [number, number, number];
  color: string;
  scale?: number;
}

export default function DynamicGeometry({ 
  geometry, 
  position, 
  color, 
  scale = 1 
}: DynamicGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Complex motion patterns
    meshRef.current.position.x = position[0] + Math.sin(time * 0.5) * 2;
    meshRef.current.position.y = position[1] + Math.cos(time * 0.7) * 1.5;
    meshRef.current.position.z = position[2] + Math.sin(time * 0.3) * 1;
    
    // Dynamic rotation
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.z = time * 0.2;
    
    // Scale pulsing
    const scalePulse = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.setScalar(scale * scalePulse);
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <mesh ref={meshRef}>
      {renderGeometry()}
      <meshPhysicalMaterial
        color={color}
        metalness={0.95}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.05}
        transmission={0.05}
        thickness={0.3}
        envMapIntensity={1.2}
        opacity={0.9}
        transparent
      />
    </mesh>
  );
}
