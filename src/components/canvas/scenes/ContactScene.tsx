'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager } from '@/lib/scroll/scroll';

export default function ContactScene() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  
  useEffect(() => {
    const unsubscribe = scrollManager.onScroll(() => {
      // Contact section - scene calms down
    });

    return unsubscribe;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Very gentle movement
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    }
    
    // Warm lighting animation
    if (lightRef.current) {
      lightRef.current.intensity = 0.8 + Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Warm ambient lighting */}
      <ambientLight intensity={0.6} color="#ffa500" />
      
      {/* Gentle directional light */}
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={0.8}
        color="#ff6b6b"
      />
      
      {/* Simple geometry for a calming effect */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Floating particles that settle */}
      {[...Array(10)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}
