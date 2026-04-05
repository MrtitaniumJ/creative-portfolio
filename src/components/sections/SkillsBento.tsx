"use client";

import { useRef, useState, createElement, type PointerEvent } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { Cpu, Database, Cloud, Sparkles, X } from "lucide-react";

type Category = {
  id: string;
  title: string;
  description: string;
  icon: typeof Cpu;
  skills: string[];
  accent: string;
};

const categories: Category[] = [
  {
    id: "fe",
    title: "Frontend",
    description: "Product surfaces, design systems, and performance budgets.",
    icon: Cpu,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "from-violet-500/20 to-indigo-500/10",
  },
  {
    id: "be",
    title: "Backend",
    description: "APIs, auth, data modeling, and integrations.",
    icon: Database,
    skills: ["Node.js", "PostgreSQL", "REST", "JWT", "Python"],
    accent: "from-blue-500/15 to-cyan-500/10",
  },
  {
    id: "cloud",
    title: "Cloud & Ops",
    description: "Deploy, observe, and scale with confidence.",
    icon: Cloud,
    skills: ["AWS", "Docker", "CI/CD", "Vercel"],
    accent: "from-emerald-500/15 to-teal-500/10",
  },
  {
    id: "ai",
    title: "AI & automation",
    description: "LLM workflows, tooling, and developer experience.",
    icon: Sparkles,
    skills: ["OpenAI", "Gemini", "Lang patterns", "RAG basics"],
    accent: "from-fuchsia-500/15 to-violet-500/10",
  },
];

function BentoCard({
  cat,
  onSelect,
  selected,
}: {
  cat: Category;
  onSelect: (c: Category) => void;
  selected: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(139,92,246,0.18), transparent 55%)`;

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      layout
      onClick={() => onSelect(cat)}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mx.set(50);
        my.set(50);
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`relative overflow-hidden rounded-2xl border p-6 text-left shadow-sm transition-shadow hover:shadow-md md:p-7 ${
        selected
          ? "border-violet-400 bg-white ring-2 ring-violet-200"
          : "border-gray-200 bg-white/90 hover:border-violet-200"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{ backgroundImage: spotlight }}
      />
      <div className="relative z-10">
        <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
          <cat.icon className="h-5 w-5" />
        </span>
        <h3 className="font-serif text-xl font-bold text-gray-900 md:text-2xl">{cat.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{cat.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {cat.skills.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-md border border-violet-100 bg-violet-50/80 px-2 py-0.5 text-[11px] font-medium text-violet-800"
            >
              {s}
            </span>
          ))}
          {cat.skills.length > 4 ? (
            <span className="text-[11px] font-medium text-slate-400">+{cat.skills.length - 4}</span>
          ) : null}
        </div>
      </div>
    </motion.button>
  );
}

export default function SkillsBento() {
  const [active, setActive] = useState<Category | null>(null);

  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
        {categories.map((cat) => (
          <BentoCard
            key={cat.id}
            cat={cat}
            onSelect={setActive}
            selected={active?.id === cat.id}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                {createElement(active.icon, { className: "h-6 w-6" })}
              </div>
              <h3 className="pr-10 font-serif text-2xl font-bold text-gray-900">{active.title}</h3>
              <p className="mt-2 text-slate-600">{active.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-800"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
