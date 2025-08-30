import * as THREE from 'three';

export class ThreeLoaders {
  private static instance: ThreeLoaders;
  private textureLoader: THREE.TextureLoader;
  private cubeTextureLoader: THREE.CubeTextureLoader;
  private rgbeLoader: any = null; // Will be dynamically imported
  private pmremGenerator: THREE.PMREMGenerator | null = null;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  static getInstance(): ThreeLoaders {
    if (!ThreeLoaders.instance) {
      ThreeLoaders.instance = new ThreeLoaders();
    }
    return ThreeLoaders.instance;
  }

  // Initialize PMREM generator
  initPMREM(renderer: THREE.WebGLRenderer) {
    if (!this.pmremGenerator) {
      this.pmremGenerator = new THREE.PMREMGenerator(renderer);
      this.pmremGenerator.compileEquirectangularShader();
    }
  }

  // Load texture with optimizations
  async loadTexture(
    url: string, 
    options: {
      flipY?: boolean;
      wrapS?: THREE.Wrapping;
      wrapT?: THREE.Wrapping;
      minFilter?: THREE.TextureFilter;
      magFilter?: THREE.MagnificationTextureFilter;
    } = {}
  ): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => {
          // Apply options
          if (options.flipY !== undefined) texture.flipY = options.flipY;
          if (options.wrapS) texture.wrapS = options.wrapS;
          if (options.wrapT) texture.wrapT = options.wrapT;
          if (options.minFilter) texture.minFilter = options.minFilter;
          if (options.magFilter) texture.magFilter = options.magFilter;
          
          resolve(texture);
        },
        undefined,
        reject
      );
    });
  }

  // Load cube texture for environment maps
  async loadCubeTexture(urls: string[]): Promise<THREE.CubeTexture> {
    return new Promise((resolve, reject) => {
      this.cubeTextureLoader.load(urls, resolve, undefined, reject);
    });
  }

  // Load HDR environment map
  async loadHDREnvironment(url: string, renderer: THREE.WebGLRenderer): Promise<THREE.Texture> {
    // Dynamically import RGBELoader to avoid SSR issues
    const { RGBELoader } = await import('three/examples/jsm/loaders/RGBELoader.js');
    
    if (!this.rgbeLoader) {
      this.rgbeLoader = new RGBELoader();
    }

    this.initPMREM(renderer);

    return new Promise((resolve, reject) => {
      this.rgbeLoader.load(
        url,
        (texture: THREE.DataTexture) => {
          const envMap = this.pmremGenerator!.fromEquirectangular(texture).texture;
          texture.dispose();
          resolve(envMap);
        },
        undefined,
        reject
      );
    });
  }

  // Create basic environment map
  createBasicEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
    this.initPMREM(renderer);
    
    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.1, 0.2, 0.4),
      side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const envMap = this.pmremGenerator!.fromScene(scene).texture;
    scene.clear();
    geometry.dispose();
    material.dispose();
    
    return envMap;
  }

  // Dispose of resources
  dispose() {
    if (this.pmremGenerator) {
      this.pmremGenerator.dispose();
      this.pmremGenerator = null;
    }
  }
}

// Utility function to create optimized materials
export const createOptimizedMaterial = (
  type: 'basic' | 'standard' | 'physical' = 'standard',
  options: Record<string, unknown> = {}
) => {
  const baseOptions = {
    transparent: false,
    alphaTest: 0.001,
    ...options,
  };

  switch (type) {
    case 'basic':
      return new THREE.MeshBasicMaterial(baseOptions);
    case 'physical':
      return new THREE.MeshPhysicalMaterial(baseOptions);
    default:
      return new THREE.MeshStandardMaterial(baseOptions);
  }
};

// Utility to optimize geometry
export const optimizeGeometry = (geometry: THREE.BufferGeometry) => {
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();
  
  // Merge vertices if possible
  if (geometry.index === null) {
    geometry.setIndex(new THREE.BufferAttribute(
      new Uint16Array(geometry.attributes.position.count), 1
    ));
  }
  
  return geometry;
};

// Create instanced geometry for performance
export const createInstancedGeometry = (
  baseGeometry: THREE.BufferGeometry,
  count: number,
  positions: Float32Array,
  colors?: Float32Array,
  scales?: Float32Array
) => {
  const instancedGeometry = new THREE.InstancedBufferGeometry();
  
  // Copy attributes from base geometry
  Object.keys(baseGeometry.attributes).forEach(key => {
    instancedGeometry.setAttribute(key, baseGeometry.attributes[key]);
  });
  
  if (baseGeometry.index) {
    instancedGeometry.setIndex(baseGeometry.index);
  }
  
  instancedGeometry.instanceCount = count;

  instancedGeometry.setAttribute(
    'instancePosition',
    new THREE.InstancedBufferAttribute(positions, 3)
  );

  if (colors) {
    instancedGeometry.setAttribute(
      'instanceColor',
      new THREE.InstancedBufferAttribute(colors, 3)
    );
  }

  if (scales) {
    instancedGeometry.setAttribute(
      'instanceScale',
      new THREE.InstancedBufferAttribute(scales, 1)
    );
  }

  return instancedGeometry;
};
