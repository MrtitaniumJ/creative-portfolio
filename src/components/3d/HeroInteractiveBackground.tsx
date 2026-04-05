"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type HeroMouseRef = React.MutableRefObject<{ x: number; y: number }>;

function TopographicGrid({ mouseRef }: { mouseRef: HeroMouseRef }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a memoized terrain plane: 60x60 units, 100x100 segments for high density
  const { geometry, positions, initialPositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 100, 100);
    geo.rotateX(-Math.PI / 2); // Lay it flat across XZ plane
    
    const pos = geo.attributes.position;
    const init = new Float32Array(pos.array.length);
    for (let i = 0; i < pos.array.length; i++) {
        init[i] = pos.array[i];
    }
    return { geometry: geo, positions: pos, initialPositions: init };
  }, []);

  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * 0.3; // Slower, imposing data wave
    const m = mouseRef.current;
    
    // Smooth interpolation for the mouse tracking
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, m.x, delta * 4);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, m.y, delta * 4);

    const arr = positions.array;
    for (let i = 0; i < arr.length; i += 3) {
      const vx = initialPositions[i];
      const vz = initialPositions[i + 2];

      // Ocean wave math (Sum of sines for complex, churning water surface)
      // Layer 1: Broad rolling ocean swells
      const wave1 = Math.sin(vx * 0.1 + t * 0.5) * Math.cos(vz * 0.1 + t * 0.5) * 1.2;
      // Layer 2: Medium frequency interference (choppiness)
      const wave2 = Math.sin(vx * 0.25 - t * 0.8) * Math.cos(vz * 0.25 + t * 0.4) * 0.6;
      // Layer 3: High frequency surface ripples
      const wave3 = Math.sin(vx * 0.5 + t * 1.2) * Math.cos(vz * 0.5 - t * 1.2) * 0.2;
      
      const baseWave = wave1 + wave2 + wave3;
        
      // Mouse interaction: Pushes waves apart or creates a deep water displacement
      const mouseTargetX = smoothMouse.current.x * 25;
      const mouseTargetZ = smoothMouse.current.y * -15; // Z depth inverted
      const dist = Math.sqrt(Math.pow(vx - mouseTargetX, 2) + Math.pow(vz - mouseTargetZ, 2));
      
      const radius = 18; 
      let mouseMountain = 0;
      if (dist < radius) {
        const tr = 1 - (dist / radius);
        // Cubic smoothstep
        const smoothCurve = tr * tr * (3 - 2 * tr);
        // Creates a massive ocean swell under the cursor
        mouseMountain = smoothCurve * 3.5; 
      }
      
      // Smooth fade to base at the very edges so the geometry doesn't clip harshly
      const edgeFadeX = Math.max(0, 1 - Math.pow(Math.abs(vx) / 30, 2));
      const edgeFadeZ = Math.max(0, 1 - Math.pow(Math.abs(vz) / 30, 2));
      const edgeFade = edgeFadeX * edgeFadeZ;

      // Apply height modifier to Y
      arr[i + 1] = (baseWave + mouseMountain) * edgeFade; 
    }
    
    positions.needsUpdate = true;
    
    if (meshRef.current) {
        // Minor contextual tilt
        meshRef.current.position.y = -4 + smoothMouse.current.y * 1;
        meshRef.current.rotation.z = smoothMouse.current.x * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial 
        color="#8b5cf6" 
        wireframe={true} 
        transparent={true}
        opacity={0.3} 
      />
    </mesh>
  );
}

function Scene({ mouseRef }: { mouseRef: HeroMouseRef }) {
  return (
    <>
      <color attach="background" args={["#fcfcfc"]} />
      
      {/* Dense white fog so the grid infinitely disappears into the horizon */}
      <fogExp2 attach="fog" args={["#fcfcfc", 0.05]} />

      <TopographicGrid mouseRef={mouseRef} />
    </>
  );
}

export default function HeroInteractiveBackground({ mouseRef }: { mouseRef: HeroMouseRef }) {
  return (
    <div className="absolute inset-0 z-0 bg-[#fcfcfc]">
      <Canvas
        camera={{ position: [0, 1, 10], fov: 60 }}
        gl={{ alpha: false, antialias: true }} 
        dpr={[1, 2]}
      >
        <Scene mouseRef={mouseRef} />
      </Canvas>
      {/* High-end vignette to blend the scene's edges to 100% white */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#fcfcfc_100%)]" 
        aria-hidden 
      />
    </div>
  );
}
