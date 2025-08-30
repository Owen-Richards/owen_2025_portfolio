'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager } from '@/lib/scroll/scroll';

export default function ProcessScene() {
  const ribbonRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Create ribbon geometry
  const ribbonGeometry = useMemo(() => {
    const points = [];
    const segments = 100;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = (t - 0.5) * 10;
      const y = Math.sin(t * Math.PI * 4) * 2;
      const z = Math.cos(t * Math.PI * 2) * 3;
      points.push(new THREE.Vector3(x, y, z));
    }
    
    // Create tube geometry along the curve
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, segments, 0.1, 8, false);
  }, []);

  // Ribbon shader material
  const ribbonMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform float uNoiseAmp;

        varying vec2 vUv;
        varying vec3 vPosition;

        // Simple noise function
        float noise(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
        }

        void main() {
            vUv = uv;
            
            vec3 pos = position;
            
            // Apply noise displacement
            float noiseValue = noise(pos * 0.5 + uTime * 0.2) * uNoiseAmp;
            pos += normal * noiseValue;
            
            // Ribbon morphing based on progress
            float ribbonCurve = sin(pos.x * 2.0 + uTime) * (1.0 - uProgress) * 0.5;
            pos.y += ribbonCurve;
            
            vPosition = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform float uHueShift;

        varying vec2 vUv;
        varying vec3 vPosition;

        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main() {
            // Base color progression
            vec3 color1 = vec3(0.1, 0.2, 0.8); // Deep blue
            vec3 color2 = vec3(0.8, 0.3, 0.6); // Pink
            vec3 color3 = vec3(0.2, 0.8, 0.9); // Cyan
            
            // Mix colors based on position and progress
            vec3 baseColor = mix(color1, color2, vUv.x);
            baseColor = mix(baseColor, color3, uProgress);
            
            // Add hue shift
            vec3 hsv = vec3(uHueShift + vUv.x * 0.3, 0.7, 0.9);
            vec3 shiftedColor = hsv2rgb(hsv);
            
            vec3 finalColor = mix(baseColor, shiftedColor, 0.5);
            
            // Add some gradient along the ribbon
            float gradient = smoothstep(0.0, 1.0, vUv.y);
            finalColor *= 0.5 + 0.5 * gradient;
            
            gl_FragColor = vec4(finalColor, 0.8);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uNoiseAmp: { value: 0.5 },
        uHueShift: { value: 0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = scrollManager.onScroll((progress) => {
      if (materialRef.current) {
        // Update ribbon morphing based on scroll
        materialRef.current.uniforms.uProgress.value = progress;
        materialRef.current.uniforms.uHueShift.value = progress * 0.5;
        materialRef.current.uniforms.uNoiseAmp.value = 0.5 * (1 - progress);
      }
    });

    return unsubscribe;
  }, []);

  useFrame((state) => {
    if (!ribbonRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = time;

    // Gentle rotation
    ribbonRef.current.rotation.y = time * 0.1;
  });

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      {/* Ribbon mesh */}
      <mesh ref={ribbonRef} geometry={ribbonGeometry}>
        <primitive ref={materialRef} object={ribbonMaterial} />
      </mesh>
    </group>
  );
}
