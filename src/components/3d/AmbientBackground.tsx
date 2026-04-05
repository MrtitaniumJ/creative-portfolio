"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildAmbientParticles } from "./ambientParticles";

const Particles = ({ count = 2500 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);

  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGlobalMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const dummy = useRef(new THREE.Object3D()).current;
  const [particles] = useState(() => buildAmbientParticles(count));

  useFrame((state) => {
    const instancedMesh = mesh.current;
    if (!instancedMesh) return;

    state.camera.position.x += (globalMouse.x * 10 - state.camera.position.x) * 0.05;
    state.camera.position.y += (globalMouse.y * 10 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);

    particles.forEach((particle, i) => {
      const t = (particle.t += particle.speed / 2);
      const { factor, xFactor, yFactor, zFactor } = particle;

      const a = Math.cos(t) + Math.sin(t) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    });
    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={20} color="#8b5cf6" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshPhysicalMaterial 
          color="#c4b5fd" 
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
          clearcoat={1}
          transparent
          opacity={0.7}
        />
      </instancedMesh>
    </>
  );
};

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none h-screen w-full bg-white">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 10, 50]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#4c1d95" />
        <Particles count={2500} />
      </Canvas>
      {/* Overlay gradient to blend bottom edge into next sections if needed */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </div>
  );
}
