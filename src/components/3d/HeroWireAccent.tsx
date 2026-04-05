"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.y += delta * 0.4;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.06, 12, 48]} />
      <meshBasicMaterial color="#6d28d9" wireframe />
    </mesh>
  );
}

export default function HeroWireAccent() {
  return (
    <div className="pointer-events-none absolute bottom-16 right-6 z-[2] h-28 w-28 opacity-[0.35] md:bottom-20 md:right-10 md:h-36 md:w-36 md:opacity-50">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} gl={{ alpha: true }}>
        <WireTorus />
      </Canvas>
    </div>
  );
}
