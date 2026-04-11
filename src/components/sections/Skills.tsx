"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { SECTION_Y } from "@/lib/sectionStyles";

const SkillsForceGraph = dynamic(() => import("@/components/d3/SkillsForceGraph"), {
  ssr: false,
  loading: () => (
    <div
      className="flex min-h-[280px] w-full items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-50/90 text-sm font-medium text-slate-500 md:min-h-[min(70vh,520px)] dark:border-white/10 dark:bg-zinc-900/60 dark:text-slate-400"
      role="status"
      aria-live="polite"
    >
      Loading skills map…
    </div>
  ),
});

const ease = [0.16, 1, 0.3, 1] as const;

const rowVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease },
  },
};

export default function Skills() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="skills"
      className={`relative z-10 w-full scroll-mt-4 overflow-x-hidden bg-linear-to-b from-background via-[#fafafa] to-background text-foreground dark:via-zinc-950/90 ${SECTION_Y}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgb(148 163 184 / 0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-8%] top-[18%] h-[min(48vw,340px)] w-[min(48vw,340px)] rounded-full bg-violet-200/16 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[12%] left-[-12%] h-[min(42vw,280px)] w-[min(42vw,280px)] rounded-full bg-fuchsia-200/14 blur-[95px]"
        aria-hidden
      />

      <motion.p
        className="type-watermark pointer-events-none absolute left-6 top-[32%] z-0 -translate-y-1/2 lg:left-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        aria-hidden
      >
        Skills
      </motion.p>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12"
        variants={rowVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="max-w-3xl">
          <motion.p
            variants={rise}
            className="type-kicker mb-2"
          >
            04 — Skills
          </motion.p>

          {reducedMotion ? (
            <div className="mb-5 h-0.5 w-16 rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 lg:mb-6 lg:w-20" />
          ) : (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
              className="mb-5 h-0.5 w-16 origin-left rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 lg:mb-6 lg:w-20"
            />
          )}

          <motion.h2
            variants={rise}
            className="type-section-title"
          >
            Tools I reach for{" "}
            <span className="bg-linear-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
              most often.
            </span>
          </motion.h2>

          <motion.p
            variants={rise}
            className="type-body mt-5 max-w-xl lg:mt-6"
          >
            Drag a bubble and watch the map breathe—it is playful on purpose, but the grouping mirrors how I
            actually cluster my practice: ship, automate, learn, repeat.
          </motion.p>
        </div>

        <motion.div
          variants={rise}
          className="relative z-10 mt-12 min-w-0 w-full md:mt-14"
        >
          <SkillsForceGraph reduceMotion={reducedMotion} />
        </motion.div>
      </motion.div>
    </section>
  );
}
