/* eslint-disable react/no-unknown-property */
import React, { useMemo, useEffect } from 'react';
import { Canvas, useThree, CanvasProps, ThreeEvent } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="absolute overflow-hidden z-1">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  /* glsl vertex shader */ `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl fragment shader */ `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;
      
      // Only show the trail, keep everything else transparent
      if(trail < 0.01) {
        discard;
      }
      
      gl_FragColor = vec4(pixelColor, trail);
    }
  `
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.25,
    ease: easingFunction || ((x: number) => Math.min(1, x * 0.7))
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  // Add a global event listener for mouse movement instead of relying on threejs events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse coordinates to normalized coordinates for the trail
      const x = e.clientX / window.innerWidth;
      const y = 1 - (e.clientY / window.innerHeight);
      
      // Call onMove with simulated event
      onMove({ uv: { x, y } } as unknown as ThreeEvent<PointerEvent>);
    };
    
    // Make sure the trail follows the cursor everywhere, including on scroll
    const handleScroll = () => {
      // Get the last mouse position from mouse move event
      const lastMouseEvent = window as any;
      if (lastMouseEvent._lastMouseX !== undefined && lastMouseEvent._lastMouseY !== undefined) {
        const x = lastMouseEvent._lastMouseX / window.innerWidth;
        const y = 1 - (lastMouseEvent._lastMouseY / window.innerHeight);
        onMove({ uv: { x, y } } as unknown as ThreeEvent<PointerEvent>);
      }
    };
    
    // Track the last mouse position for scroll events
    const trackMousePosition = (e: MouseEvent) => {
      (window as any)._lastMouseX = e.clientX;
      (window as any)._lastMouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', trackMousePosition);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', trackMousePosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onMove]);
  
  return (
    <mesh scale={[scale, scale, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}: PixelTrailProps) {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999, mixBlendMode: 'lighten', opacity: 0.6, position: 'fixed' }}>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={{
          ...glProps,
          premultipliedAlpha: false,
          alpha: true,
          preserveDrawingBuffer: true
        }}
        className={`w-full h-full pointer-events-none ${className}`}
        style={{ pointerEvents: 'none', ...(gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}) }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </div>
  );
}
