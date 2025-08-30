'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { scrollManager } from '@/lib/scroll/scroll';

export default function ImpactScene() {
  const particleSystemRef = useRef<THREE.Points>(null);
  const lineGroupRef = useRef<THREE.Group>(null);
  
  // Create constellation points
  const constellationData = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const connections: [number, number][] = [];
    const count = 20;
    
    // Create random points in 3D space
    for (let i = 0; i < count; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ));
    }
    
    // Create connections between nearby points
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const distance = points[i].distanceTo(points[j]);
        if (distance < 6 && Math.random() > 0.5) {
          connections.push([i, j]);
        }
      }
    }
    
    return { points, connections };
  }, []);

  // Particle positions for background stars
  const particleCount = 500;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  useEffect(() => {
    const unsubscribe = scrollManager.onScroll(() => {
      // Impact section animations
    });

    return unsubscribe;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rotate constellation slowly
    if (lineGroupRef.current) {
      lineGroupRef.current.rotation.y = time * 0.05;
      lineGroupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
    
    // Animate background particles
    if (particleSystemRef.current) {
      particleSystemRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group>
      {/* Background particles */}
      <points ref={particleSystemRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Constellation lines */}
      <group ref={lineGroupRef}>
        {constellationData.connections.map(([start, end], index) => (
          <Line
            key={index}
            points={[constellationData.points[start], constellationData.points[end]]}
            color="#00ffff"
            lineWidth={2}
            transparent
            opacity={0.7}
          />
        ))}
        
        {/* Constellation points */}
        {constellationData.points.map((point, index) => (
          <mesh key={index} position={point}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 10]} intensity={0.8} color="#00ffff" />
    </group>
  );
}
