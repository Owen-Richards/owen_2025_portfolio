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
  spread = 20,
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

  useFrame((_state, delta) => {
    if (!pointsRef.current?.geometry?.attributes?.position) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;

    if (!positions || !velocities) return;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update positions based on velocities with null checks
      const currentX = positions[i3] ?? 0;
      const currentY = positions[i3 + 1] ?? 0;
      const currentZ = positions[i3 + 2] ?? 0;
      const velX = velocities[i3] ?? 0;
      const velY = velocities[i3 + 1] ?? 0;
      const velZ = velocities[i3 + 2] ?? 0;

      const x = currentX + velX * speed * delta;
      const y = currentY + velY * speed * delta;
      const z = currentZ + velZ * speed * delta;

      // Wrap around boundaries
      positions[i3] = Math.abs(x) > spread / 2 ? -x : x;
      positions[i3 + 1] = Math.abs(y) > spread / 2 ? -y : y;
      positions[i3 + 2] = Math.abs(z) > spread / 2 ? -z : z;
    }

    positionAttribute.needsUpdate = true;

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
