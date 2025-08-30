'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager } from '@/lib/scroll/scroll';

export default function CraftScene() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial[]>([]);
  
  // Create instanced geometry for icosahedra
  const instanceCount = 50;
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.5, 0), []);
  
  const instances = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const colors: THREE.Color[] = [];
    const scales: number[] = [];
    
    for (let i = 0; i < instanceCount; i++) {
      // Orbital positions
      const radius = 5 + Math.random() * 10;
      const theta = (i / instanceCount) * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ));
      
      colors.push(new THREE.Color().setHSL(
        0.1 + (i / instanceCount) * 0.6, // Hue range
        0.8,
        0.6
      ));
      
      scales.push(0.5 + Math.random() * 1.5);
    }
    
    return { positions, colors, scales };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollManager.onScroll(() => {
      // Craft section animations will be triggered here
    });

    return unsubscribe;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Rotate the entire group
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.3;
    
    // Animate individual instances
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const offset = (i / instanceCount) * Math.PI * 2;
        child.rotation.x = time + offset;
        child.rotation.y = time * 1.5 + offset;
        
        // Orbital motion
        const radius = 5 + Math.sin(time + offset) * 2;
        const angle = time * 0.5 + offset;
        child.position.x = Math.cos(angle) * radius;
        child.position.z = Math.sin(angle) * radius;
        child.position.y = Math.sin(time + offset) * 3;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Lighting for geometry */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      
      {/* Instanced icosahedra */}
      {instances.positions.map((position, i) => (
        <mesh
          key={i}
          position={position}
          scale={instances.scales[i]}
          geometry={geometry}
        >
          <meshStandardMaterial
            ref={(ref) => {
              if (ref) materialRef.current[i] = ref;
            }}
            color={instances.colors[i]}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}
