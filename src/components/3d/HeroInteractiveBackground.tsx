"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

const HERO_BG_LIGHT = "#fcfcfc";
const HERO_BG_DARK = "#09090b";

export type HeroMouseRef = React.MutableRefObject<{ x: number; y: number }>;

function TopographicGrid({
  mouseRef,
  wireColor,
  wireOpacity,
}: {
  mouseRef: HeroMouseRef;
  wireColor: string;
  wireOpacity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a memoized terrain plane: 60x60 units, 100x100 segments for high density
  const { geometry, initialPositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 100, 100);
    geo.rotateX(-Math.PI / 2); // Lay it flat across XZ plane

    const pos = geo.attributes.position;
    const init = new Float32Array(pos.array.length);
    for (let i = 0; i < pos.array.length; i++) {
      init[i] = pos.array[i];
    }
    return { geometry: geo, initialPositions: init };
  }, []);

  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const positions = geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = state.clock.elapsedTime * 0.3; // Slower, imposing data wave
    const m = mouseRef.current;

    // Smooth interpolation for the mouse tracking
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, m.x, delta * 4);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, m.y, delta * 4);

    const arr = positions.array as Float32Array;
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
        color={wireColor}
        wireframe={true}
        transparent={true}
        opacity={wireOpacity}
      />
    </mesh>
  );
}

function Scene({
  mouseRef,
  background,
  wireColor,
  wireOpacity,
}: {
  mouseRef: HeroMouseRef;
  background: string;
  wireColor: string;
  wireOpacity: number;
}) {
  return (
    <>
      <color attach="background" args={[background]} />

      {/* Dense fog so the grid infinitely disappears into the horizon */}
      <fogExp2 attach="fog" args={[background, 0.05]} />

      <TopographicGrid mouseRef={mouseRef} wireColor={wireColor} wireOpacity={wireOpacity} />
    </>
  );
}

export default function HeroInteractiveBackground({ mouseRef }: { mouseRef: HeroMouseRef }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const background = isDark ? HERO_BG_DARK : HERO_BG_LIGHT;
  const wireColor = isDark ? "#a78bfa" : "#8b5cf6";
  const wireOpacity = isDark ? 0.22 : 0.3;

  return (
    <div
      className={`absolute inset-0 z-0 max-w-full overflow-hidden ${isDark ? "bg-zinc-950" : "bg-[#fcfcfc]"}`}
    >
      <Canvas
        className="h-full w-full max-w-full touch-none"
        camera={{ position: [0, 1, 10], fov: 60 }}
        gl={{ alpha: false, antialias: true }}
        dpr={[1, 2]}
        style={{ maxWidth: "100%", width: "100%", height: "100%" }}
      >
        <Scene
          mouseRef={mouseRef}
          background={background}
          wireColor={wireColor}
          wireOpacity={wireOpacity}
        />
      </Canvas>
      {/* Stronger edge fade on narrow viewports so the grid never reads as horizontal overflow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          isDark
            ? "bg-[radial-gradient(ellipse_at_center,transparent_22%,#09090b_88%)] sm:bg-[radial-gradient(ellipse_at_center,transparent_30%,#09090b_100%)]"
            : "bg-[radial-gradient(ellipse_at_center,transparent_22%,#fcfcfc_88%)] sm:bg-[radial-gradient(ellipse_at_center,transparent_30%,#fcfcfc_100%)]"
        )}
        aria-hidden
      />
    </div>
  );
}
