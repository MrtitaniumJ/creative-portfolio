"use client";

import { useRef, useState, useMemo, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Torus } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

export type SkillItem = {
  id: string;
  radius: number;
  speed: number;
  color: string;
  blurb: string;
  level: string;
};

export const skillsData: SkillItem[] = [
  {
    id: "SDE Core",
    radius: 0,
    speed: 0,
    color: "#fff",
    blurb: "End-to-end product delivery: APIs, data, and UI.",
    level: "Core",
  },
  { id: "Next.js", radius: 3, speed: 0.8, color: "#60a5fa", blurb: "App Router, RSC, edge-ready deployments.", level: "Daily" },
  { id: "React", radius: 3, speed: 0.8, color: "#60a5fa", blurb: "Hooks, performance, design systems.", level: "Daily" },
  { id: "TypeScript", radius: 3, speed: 0.8, color: "#60a5fa", blurb: "Strict typing for scalable codebases.", level: "Daily" },

  { id: "Node.js", radius: 5, speed: 0.5, color: "#818cf8", blurb: "Services, queues, integrations.", level: "Strong" },
  { id: "PostgreSQL", radius: 5, speed: 0.5, color: "#818cf8", blurb: "Schema design, migrations, query tuning.", level: "Strong" },
  { id: "AWS", radius: 5, speed: 0.5, color: "#818cf8", blurb: "Deploy, observe, and scale in the cloud.", level: "Strong" },
  { id: "Docker", radius: 5, speed: 0.5, color: "#818cf8", blurb: "Containers and reproducible environments.", level: "Strong" },

  { id: "Gemini AI", radius: 7, speed: 0.3, color: "#a78bfa", blurb: "LLM workflows and prompt-backed features.", level: "Growing" },
  { id: "Three.js", radius: 7, speed: 0.3, color: "#a78bfa", blurb: "WebGL scenes and interactive visuals.", level: "Growing" },
  { id: "Tailwind", radius: 7, speed: 0.3, color: "#a78bfa", blurb: "Utility-first UI at speed.", level: "Daily" },
  { id: "Framer Motion", radius: 7, speed: 0.3, color: "#a78bfa", blurb: "Scroll-linked and gesture-driven motion.", level: "Growing" },
];

function SkillNode({
  skill,
  initialAngle,
  globalHovered,
  onSelect,
  selectedId,
}: {
  skill: SkillItem;
  initialAngle: number;
  globalHovered: boolean;
  onSelect: (s: SkillItem) => void;
  selectedId: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(initialAngle);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const currentSpeed = globalHovered ? skill.speed * 0.12 : skill.speed;

    if (skill.radius > 0) {
      angleRef.current -= currentSpeed * delta;
      const x = Math.cos(angleRef.current) * skill.radius;
      const z = Math.sin(angleRef.current) * skill.radius;
      groupRef.current.position.set(x, 0, z);
    }

    groupRef.current.quaternion.copy(state.camera.quaternion);
  });

  const isSelected = selectedId === skill.id;
  const scale = hovered || isSelected ? 1.15 : 1;

  if (skill.radius === 0) {
    return (
      <group ref={groupRef}>
        <Html center transform sprite>
          <button
            type="button"
            onClick={() => onSelect(skill)}
            className="pointer-events-auto cursor-pointer rounded-full border border-violet-400 bg-violet-600/90 px-6 py-4 font-bold whitespace-nowrap text-white shadow-[0_0_30px_rgba(139,92,246,0.6)] backdrop-blur-md transition-transform duration-300 hover:scale-105"
          >
            {skill.id}
          </button>
        </Html>
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      <Html center transform sprite zIndexRange={[100, 0]}>
        <button
          type="button"
          onClick={() => onSelect(skill)}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className={`pointer-events-auto select-none whitespace-nowrap rounded-full border px-4 py-2 font-semibold backdrop-blur-md transition-all duration-300 ${
            isSelected
              ? "scale-110 border-white bg-white/25 text-white shadow-[0_0_24px_rgba(255,255,255,0.35)]"
              : hovered
                ? "scale-110 border-white/80 bg-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "border-indigo-500/30 bg-indigo-950/40 text-indigo-100"
          }`}
          style={{ transform: `scale(${scale})` }}
        >
          {skill.id}
        </button>
      </Html>
    </group>
  );
}

function OrbitRings() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <Torus args={[3, 0.01, 16, 50]}>
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.35} />
      </Torus>
      <Torus args={[5, 0.01, 16, 50]}>
        <meshBasicMaterial color="#6366f1" transparent opacity={0.25} />
      </Torus>
      <Torus args={[7, 0.01, 16, 50]}>
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
      </Torus>
    </group>
  );
}

function OrbitScene({
  pointerRef,
  onSelect,
  selectedId,
}: {
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  onSelect: (s: SkillItem) => void;
  selectedId: string | null;
}) {
  const [globalHovered, setGlobalHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const { x: px, y: py } = pointerRef.current;
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.2 + py * 0.12;
    groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05 + px * 0.08;
  });

  const nodes = useMemo((): (SkillItem & { angle: number })[] => {
    const ringCounts: Record<number, number> = { 3: 0, 5: 0, 7: 0 };
    return skillsData.map((skill) => {
      if (skill.radius === 0) return { ...skill, angle: 0 };

      const r = skill.radius;
      ringCounts[r] = (ringCounts[r] ?? 0) + 1;
      const countIndex = ringCounts[r] - 1;
      const totalInRing = r === 3 ? 3 : 4;
      const angle = (countIndex / totalInRing) * Math.PI * 2;
      return { ...skill, angle };
    });
  }, []);

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setGlobalHovered(true)}
      onPointerLeave={() => setGlobalHovered(false)}
    >
      <OrbitRings />

      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={2} />
        <pointLight intensity={10} color="#c4b5fd" distance={20} />
      </mesh>

      {nodes.map((skill) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          initialAngle={skill.angle}
          globalHovered={globalHovered}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </group>
  );
}

export default function SkillsOrbit() {
  const pointerRef = useRef({ x: 0, y: 0 });
  const [selected, setSelected] = useState<SkillItem | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: -((e.clientY - r.top) / r.height) * 2 + 1,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      className="relative h-full min-h-[500px] w-full cursor-grab active:cursor-grabbing"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas camera={{ position: [0, 6, 12], fov: 45 }}>
        <fog attach="fog" args={["#000000", 10, 25]} />
        <ambientLight intensity={0.55} />
        <OrbitScene pointerRef={pointerRef} onSelect={setSelected} selectedId={selected?.id ?? null} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.5}
        />
      </Canvas>

      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto absolute bottom-4 left-4 right-4 z-20 mx-auto max-w-md rounded-2xl border border-violet-500/40 bg-gray-950/90 p-5 text-left text-white shadow-2xl backdrop-blur-xl md:left-auto md:right-6 md:mx-0"
          >
            <div className="mb-1 text-xs font-bold uppercase tracking-widest text-violet-300">
              {selected.level}
            </div>
            <h4 className="font-serif text-2xl font-bold">{selected.id}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{selected.blurb}</p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-violet-300 hover:text-white"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
