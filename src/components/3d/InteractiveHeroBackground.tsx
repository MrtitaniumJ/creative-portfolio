"use client";

import { useRef, useState, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildHeroParticles } from "./heroParticles";

export type HeroPointer = { x: number; y: number };

const Particles = ({
  count,
  pointerRef,
}: {
  count: number;
  pointerRef: MutableRefObject<HeroPointer>;
}) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const dummy = useRef(new THREE.Object3D()).current;
  const [particles] = useState(() => buildHeroParticles(count));

  useFrame((state) => {
    const instancedMesh = mesh.current;
    if (!instancedMesh) return;

    const { x: mx, y: my } = pointerRef.current;
    state.camera.position.x += (mx * 8 - state.camera.position.x) * 0.06;
    state.camera.position.y += (my * 8 - state.camera.position.y) * 0.06;
    state.camera.lookAt(0, 0, 0);

    particles.forEach((particle, i) => {
      particle.t += particle.speed / 2;
      const { t, factor, xFactor, yFactor, zFactor, phase } = particle;

      const attract = Math.sin(t * 0.5 + phase) * 0.15 * (mx * mx + my * my);
      const pullX = mx * 12 * attract;
      const pullY = my * 12 * attract;

      dummy.position.set(
        pullX + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t) * factor) / 10,
        pullY + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      const s = Math.cos(t);
      dummy.scale.setScalar(Math.max(0.15, s * 0.5 + 0.5));
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    });
    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={16} color="#8b5cf6" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshPhysicalMaterial
          color="#c4b5fd"
          emissive="#7c3aed"
          emissiveIntensity={0.75}
          roughness={0.25}
          metalness={0.85}
          clearcoat={1}
          transparent
          opacity={0.65}
        />
      </instancedMesh>
    </>
  );
};

function HeroScene({
  count,
  pointerRef,
}: {
  count: number;
  pointerRef: MutableRefObject<HeroPointer>;
}) {
  return <Particles count={count} pointerRef={pointerRef} />;
}

export default function InteractiveHeroBackground({
  pointerRef,
  reducedMotion = false,
}: {
  pointerRef: MutableRefObject<HeroPointer>;
  reducedMotion?: boolean;
}) {
  const count = reducedMotion ? 400 : 2000;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 45, far: 10000 }}
        className="!absolute inset-0"
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 10, 5]} intensity={0.85} color="#8b5cf6" />
        <HeroScene key={count} count={count} pointerRef={pointerRef} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
    </div>
  );
}
