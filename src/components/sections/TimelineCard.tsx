"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export interface Experience {
  role: string;
  company: string;
  date: string;
  location: string;
  description: string;
  tech: readonly string[] | string[];
  highlights: readonly string[] | string[];
}

interface TimelineCardProps {
  exp: Experience;
}

export default function TimelineCard({ exp }: TimelineCardProps) {
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);

  return (
    <motion.article variants={rise} className="relative overflow-visible">
      {/* Center on bar: gap + half line column (w-5 = 1.25rem → axis at 0.625rem); default gap-6, md gap-8 */}
      <span
        className="absolute -left-8.5 top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-violet-600 shadow-[0_0_0_3px_rgba(139,92,246,0.22)] md:-left-10.5 md:top-8 md:h-3.5 md:w-3.5 dark:border-zinc-950"
        aria-hidden
      />

      <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md md:p-8 dark:border-white/10 dark:bg-zinc-900/75 dark:hover:shadow-lg dark:hover:shadow-black/20">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="group w-full text-left"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="type-timeline-eyebrow">
                {exp.date}
              </p>
              <h3 className="type-card-title mt-2 transition-colors group-hover:text-violet-700 dark:group-hover:text-violet-400">
                {exp.role}
              </h3>
              <p className="type-card-subtitle mt-1">{exp.company}</p>
              <p className="type-location mt-2 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-violet-500/80" aria-hidden />
                {exp.location}
              </p>
            </div>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.35, ease }}
              className="mt-1 shrink-0 rounded-full border border-slate-200/90 bg-white/80 p-1.5 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
            >
              <ChevronDown className="h-4 w-4" aria-hidden />
            </motion.span>
          </div>

          <p className="type-body-relaxed mt-5">
            {exp.description}
          </p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0.01 : 0.35, ease }}
                className="overflow-hidden"
              >
                <p className="type-section-label mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
                  Impact
                </p>
                <ul className="mt-3 space-y-2.5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="type-list-item flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex flex-wrap gap-2">
            {exp.tech.map((tech) => (
              <span
                key={tech}
                className="type-pill"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="type-ui-link mt-4 inline-block group-hover:underline">
            {open ? "Show less" : "Impact & details"}
          </span>
        </button>
      </div>
    </motion.article>
  );
}
