'use client';

import { animated, useSpring } from '@react-spring/three';
import {
    Environment,
    Float,
    Html,
    Instance,
    Instances
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Bloom,
    EffectComposer,
    Noise,
    Vignette
} from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useThemeStyles } from '../ui/useThemeStyles';

// Types for portfolio data
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  color: string;
  position: [number, number, number];
}

// Sample portfolio data
const portfolioProjects: Project[] = [
  {
    id: '1',
    title: 'Interactive Web App',
    description: 'Modern React application with advanced animations',
    image: '/placeholder-project-1.jpg',
    technologies: ['React', 'Three.js', 'TypeScript'],
    color: '#475569',
    position: [-4, 2, 0]
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'Full-stack commerce solution with AI recommendations',
    image: '/placeholder-project-2.jpg',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe'],
    color: '#64748b',
    position: [0, 1, -2]
  },
  {
    id: '3',
    title: 'Mobile Design System',
    description: 'Comprehensive design system for mobile applications',
    image: '/placeholder-project-3.jpg',
    technologies: ['Figma', 'React Native', 'Storybook'],
    color: '#475569',
    position: [4, 0, 1]
  },
  {
    id: '4',
    title: 'Data Visualization',
    description: 'Real-time analytics dashboard with 3D charts',
    image: '/placeholder-project-4.jpg',
    technologies: ['D3.js', 'WebGL', 'Python'],
    color: '#334155',
    position: [-2, -1, 2]
  },
  {
    id: '5',
    title: 'AR Experience',
    description: 'Augmented reality shopping experience',
    image: '/placeholder-project-5.jpg',
    technologies: ['WebXR', 'Three.js', 'TensorFlow'],
    color: '#64748b',
    position: [2, -2, -1]
  }
];

// Advanced shader material for project cards
const ProjectCardShader = {
  uniforms: {
    time: { value: 0 },
    mouse: { value: new THREE.Vector2() },
    resolution: { value: new THREE.Vector2() },
    color: { value: new THREE.Color() },
    opacity: { value: 1.0 },
    noiseScale: { value: 1.0 },
    distortion: { value: 0.1 }
  },
  vertexShader: `
    uniform float time;
    uniform vec2 mouse;
    uniform float noiseScale;
    uniform float distortion;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    // Simplex noise function
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec3 pos = position;
      
      // Add noise-based distortion
      float noise = snoise(pos * noiseScale + time * 0.5) * distortion;
      pos += normal * noise;
      
      // Mouse interaction distortion
      vec2 mouseInfluence = (mouse - 0.5) * 2.0;
      pos.xy += mouseInfluence * 0.1 * sin(time + length(pos));
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;
    uniform vec3 color;
    uniform float opacity;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Fresnel effect
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      
      // Animated gradient
      vec3 gradient = mix(color, color * 1.5, sin(time + vPosition.x + vPosition.y) * 0.5 + 0.5);
      
      // Add some iridescence
      vec3 iridescent = vec3(
        sin(time + vPosition.x * 10.0) * 0.1,
        sin(time + vPosition.y * 10.0 + 2.0) * 0.1,
        sin(time + vPosition.z * 10.0 + 4.0) * 0.1
      );
      
      vec3 finalColor = gradient + iridescent + fresnel * 0.3;
      
      gl_FragColor = vec4(finalColor, opacity);
    }
  `
};

// Individual project card component
function ProjectCard({ project, isHovered, onHover, onLeave }: {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, mouse } = useThree();
  
  // Spring animation for hover state
  const { scale, position } = useSpring({
    scale: isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    position: isHovered ? 
      [project.position[0], project.position[1] + 0.5, project.position[2] + 1] : 
      project.position,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.mouse.value.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2
      );
      materialRef.current.uniforms.distortion.value = isHovered ? 0.3 : 0.1;
    }
    
    if (meshRef.current && !isHovered) {
      // Subtle floating animation when not hovered
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(time * 0.7) * 0.05;
    }
  });

  return (
    <animated.group 
      position={position as unknown as [number, number, number]} 
      scale={scale as unknown as [number, number, number]}
    >
      <Float speed={2} rotationIntensity={isHovered ? 0 : 0.5} floatIntensity={isHovered ? 0 : 1}>
        <mesh
          ref={meshRef}
          onPointerOver={onHover}
          onPointerOut={onLeave}
        >
          <boxGeometry args={[2, 2.5, 0.1]} />
          <shaderMaterial
            ref={materialRef}
            {...ProjectCardShader}
            uniforms={{
              ...ProjectCardShader.uniforms,
              color: { value: new THREE.Color(project.color) },
              resolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
              opacity: { value: 0.9 }
            }}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Project information overlay */}
        <Html
          position={[0, 0, 0.06]}
          transform
          occlude
          style={{
            width: '250px',
            height: '280px',
            padding: '24px',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            color: 'white',
            fontSize: '14px',
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: 'white' }}>
              {project.title}
            </h3>
            <p style={{ marginBottom: '16px', lineHeight: '1.5', color: '#e5e5e5' }}>
              {project.description}
            </p>
            <div>
              <strong style={{ color: 'white' }}>Technologies:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: '500'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Html>
      </Float>
    </animated.group>
  );
}

// Instanced background elements for performance
function BackgroundElements() {
  const count = 100;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const colorArray = useMemo(() => {
    const colors = ['#475569', '#64748b', '#475569', '#334155', '#64748b'];
    return Array.from({ length: count }, () => colors[Math.floor(Math.random() * colors.length)]);
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4();
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      
      matrix.setPosition(
        x + Math.sin(time * 0.1 + i) * 2,
        y + Math.cos(time * 0.15 + i) * 2,
        z + Math.sin(time * 0.05 + i) * 2
      );
      
      const scale = 0.1 + Math.sin(time + i) * 0.05;
      matrix.scale(new THREE.Vector3(scale, scale, scale));
      
      meshRef.current.setMatrixAt(i, matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <Instances limit={count}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.1} />
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} />
      {Array.from({ length: count }, (_, i) => (
        <Instance
          key={i}
          position={[
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80
          ]}
          color={colorArray[i]}
        />
      ))}
    </Instances>
  );
}

// Parallax camera controller
function ParallaxCamera() {
  const { camera, mouse } = useThree();
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Loading fallback component
function LoadingFallback() {
  const { styles, cn } = useThemeStyles();
  return (
    <div className={cn(styles.glass.card, "flex items-center justify-center h-96 bg-gradient-to-br from-card via-muted/20 to-card")}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
        <p className="text-primary font-medium">Loading 3D Portfolio...</p>
      </div>
    </div>
  );
}

// WebGL fallback component
function WebGLFallback() {
  const { styles, cn } = useThemeStyles();
  return (
    <div className={cn(styles.glass.card, "h-96 bg-gradient-to-br from-card via-muted/20 to-card p-8 rounded-lg border border-border")}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">Portfolio Showcase</h3>
        <p className="text-muted-foreground mb-6">
          Your device doesn&apos;t support WebGL. Here&apos;s a traditional view of my work:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioProjects.map((project) => (
            <motion.div
              key={project.id}
              className={cn(styles.card.base, "p-6 border border-border")}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div 
                className="w-full h-32 rounded-lg mb-4"
                style={{ backgroundColor: project.color }}
              />
              <h4 className="font-bold text-foreground mb-2">{project.title}</h4>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main 3D Scene Component
function Scene() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Check WebGL support
  const checkWebGLSupport = useCallback(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  }, []);

  if (!checkWebGLSupport()) {
    return <WebGLFallback />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.6} color="#f8fafc" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#f8fafc" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#60a5fa" />
        <pointLight position={[0, 15, 5]} intensity={1.2} color="#f8fafc" />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
          color="#f8fafc"
          castShadow
        />
        
        {/* Environment for reflections */}
        <Environment preset="studio" background={false} />
        
        {/* Parallax camera controller */}
        <ParallaxCamera />
        
        {/* Background instanced elements */}
        <BackgroundElements />
        
        {/* Portfolio project cards */}
        {portfolioProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isHovered={hoveredProject === project.id}
            onHover={() => setHoveredProject(project.id)}
            onLeave={() => setHoveredProject(null)}
          />
        ))}
        
        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={0.8}
            kernelSize={3}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.025}
          />
          <Noise opacity={0.015} />
          <Vignette eskil={false} offset={0.05} darkness={0.3} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

// Main component export
export default function PortfolioShowcase3D() {
  return (
    <section className="w-full h-screen relative overflow-hidden bg-black">
      {/* Header */}
      <div className="absolute top-8 left-8 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/60 backdrop-blur-md rounded-lg p-6 border border-white/20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-gray-300 max-w-md">
            Hover over the projects to explore interactive 3D visualizations of my latest work.
          </p>
        </motion.div>
      </div>
      
      {/* Controls */}
      <div className="absolute top-8 right-8 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/20"
        >
          <p className="text-sm text-white font-semibold mb-2">Controls:</p>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Move mouse for parallax</li>
            <li>• Hover cards for details</li>
            <li>• Physics-based interactions</li>
          </ul>
        </motion.div>
      </div>
      
      {/* 3D Scene */}
      <Suspense fallback={<LoadingFallback />}>
        <Scene />
      </Suspense>
    </section>
  );
}
