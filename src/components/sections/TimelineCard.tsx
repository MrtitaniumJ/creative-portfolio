"use client";

import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Experience {
  role: string;
  company: string;
  date: string;
  location: string;
  description: string;
  tech: string[];
  highlights: string[];
}

interface TimelineCardProps {
  exp: Experience;
  idx: number;
}

export default function TimelineCard({ exp, idx }: TimelineCardProps) {
  const isEven = idx % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 88%", "center center"],
  });

  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [isEven ? 10 : -10, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 1, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, 0]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !faceRef.current) return;
    const r = faceRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    faceRef.current.style.setProperty("--rx", `${py * -6}deg`);
    faceRef.current.style.setProperty("--ry", `${px * 8}deg`);
  };

  const onLeave = () => {
    if (!faceRef.current) return;
    faceRef.current.style.setProperty("--rx", "0deg");
    faceRef.current.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.div ref={cardRef} style={{ opacity }} className="relative">
      <div className="absolute left-0 top-8 md:left-1/2 md:-translate-x-1/2">
        <motion.div
          className={`h-5 w-5 rounded-full border-2 border-white shadow-[0_0_14px_rgba(139,92,246,0.5)] ${
            open ? "bg-violet-500 ring-4 ring-violet-200" : "bg-violet-600"
          }`}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        />
      </div>

      <div
        className={`ml-12 md:ml-0 md:flex md:gap-12 ${isEven ? "md:flex-row-reverse" : ""}`}
      >
        <div className="md:w-1/2 [perspective:1400px]">
          <motion.div style={{ rotateY, y: lift }} className="origin-center">
            <div
              ref={faceRef}
              onPointerMove={onMove}
              onPointerLeave={onLeave}
              style={{
                transform:
                  "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
                transition: "transform 0.12s ease-out",
              }}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg [transform-style:preserve-3d]"
            >
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="group w-full p-6 text-left md:p-8"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 md:text-sm">
                      {exp.date}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-violet-600 md:text-2xl">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-base text-slate-700">{exp.company}</p>
                    <p className="mt-1 text-sm text-slate-500">📍 {exp.location}</p>
                  </div>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    className="mt-1 shrink-0 rounded-full border border-gray-200 p-1.5 text-slate-500"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </div>

                <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                  {exp.description}
                </p>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <li className="mt-4 border-t border-gray-100 pt-4 text-xs font-bold uppercase tracking-wider text-violet-600">
                        Impact
                      </li>
                      {exp.highlights.map((h) => (
                        <li key={h} className="mt-2 flex gap-2 text-sm text-slate-600">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tech.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <span className="mt-4 inline-block text-xs font-medium text-violet-600 underline-offset-4 group-hover:underline">
                  {open ? "Show less" : "Details & impact"}
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="hidden md:block md:w-1/2" />
      </div>
    </motion.div>
  );
}
