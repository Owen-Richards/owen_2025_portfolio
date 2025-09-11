'use client';

import { PointMaterial, Points } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
  spread?: number;
}

export default function ParticleSystem({ 
  count = 2000, 
  size = 0.002, 
  color = '#64748b', // Professional slate color
  speed = 0.5,
  spread = 20
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      
      // Velocity
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return [positions, velocities];
  }, [count, spread]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update positions based on velocities
      positions[i3] += velocities[i3] * speed * delta;
      positions[i3 + 1] += velocities[i3 + 1] * speed * delta;
      positions[i3 + 2] += velocities[i3 + 2] * speed * delta;
      
      // Wrap around boundaries
      if (Math.abs(positions[i3]) > spread / 2) {
        positions[i3] = -positions[i3];
      }
      if (Math.abs(positions[i3 + 1]) > spread / 2) {
        positions[i3 + 1] = -positions[i3 + 1];
      }
      if (Math.abs(positions[i3 + 2]) > spread / 2) {
        positions[i3 + 2] = -positions[i3 + 2];
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire particle system
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
