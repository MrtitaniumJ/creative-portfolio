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
        className="absolute -left-8.5 top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-violet-600 shadow-[0_0_0_3px_rgba(139,92,246,0.22)] md:-left-10.5 md:top-8 md:h-3.5 md:w-3.5"
        aria-hidden
      />

      <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md md:p-8">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="group w-full text-left"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-violet-600/90 md:text-xs">
                {exp.date}
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-violet-700 md:text-2xl">
                {exp.role}
              </h3>
              <p className="mt-1 text-base font-medium text-slate-700">{exp.company}</p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-violet-500/80" aria-hidden />
                {exp.location}
              </p>
            </div>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.35, ease }}
              className="mt-1 shrink-0 rounded-full border border-slate-200/90 bg-white/80 p-1.5 text-slate-500"
            >
              <ChevronDown className="h-4 w-4" aria-hidden />
            </motion.span>
          </div>

          <p className="mt-5 text-[0.9375rem] leading-relaxed text-slate-600 md:text-[0.96875rem] md:leading-[1.65]">
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
                <p className="mt-5 border-t border-slate-100 pt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-600">
                  Impact
                </p>
                <ul className="mt-3 space-y-2.5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm leading-snug text-slate-600">
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
                className="inline-flex items-center rounded-full border border-slate-200/90 bg-white/60 px-3 py-1 text-[10px] font-medium text-slate-800 shadow-sm backdrop-blur-sm lg:px-3.5 lg:text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="mt-4 inline-block text-xs font-medium text-violet-600 underline-offset-4 group-hover:underline">
            {open ? "Show less" : "Impact & details"}
          </span>
        </button>
      </div>
    </motion.article>
  );
}
