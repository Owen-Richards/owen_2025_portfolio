'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager } from '@/lib/scroll/scroll';

export default function HeroScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, mouse, viewport } = useThree();
  
  // Create particle positions
  const particleCount = 2000;
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spread particles in a sphere
      const radius = Math.random() * 20 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color gradient from blue to cyan
      const hue = 0.6 + Math.random() * 0.2; // Blue to cyan range
      const color = new THREE.Color().setHSL(hue, 0.8, 0.7);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      sizes[i] = Math.random() * 4 + 1;
      alphas[i] = Math.random() * 0.8 + 0.2;
    }

    return { positions, colors, sizes, alphas };
  }, []);

  // Shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        attribute float alpha;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
            vColor = customColor;
            vAlpha = alpha;
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            
            // Soft circular falloff
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            alpha *= vAlpha;
            
            // Add subtle glow effect
            float glow = exp(-dist * 4.0) * 0.3;
            
            vec3 finalColor = vColor + glow;
            
            gl_FragColor = vec4(finalColor, alpha * uProgress);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 1 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useEffect(() => {
    // Register with scroll manager
    const unsubscribe = scrollManager.onScroll(() => {
      // Hero scene effects could be added here
    });

    return unsubscribe;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = time;

    // Gentle rotation
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    // Mouse interaction - subtle repulsion
    const mouseX = mouse.x * viewport.width / 2;
    const mouseY = mouse.y * viewport.height / 2;
    
    camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 0.1 - camera.position.y) * 0.02;
  });

  return (
    <group>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} color="#4a90e2" />
      
      {/* Volumetric light beams effect */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#00bfff"
        castShadow
      />
      
      {/* Particle system */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-customColor"
            args={[particleData.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particleData.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-alpha"
            args={[particleData.alphas, 1]}
          />
        </bufferGeometry>
        <primitive ref={materialRef} object={shaderMaterial} />
      </points>
    </group>
  );
}
