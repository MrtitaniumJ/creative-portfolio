"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import TimelineCard from "./TimelineCard";

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

const cardListVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.08 },
  },
};

const experiences = [
  {
    role: "Software Developer",
    company: "Persist Ventures",
    date: "Aug 2024 — Present",
    location: "Remote",
    description:
      "Built and scaled the Devs Career Accelerator platform supporting 10k+ developers. Developed AI-driven automation workflows with LLM integration for resume enhancement and job applications.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Gemini AI", "OpenAI"],
    highlights: [
      "Platform used by 10k+ developers with reliable uptime",
      "LLM-powered resume and application workflows in production",
      "Full-stack ownership from schema to UI",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "IGOKO Avionics Pvt Ltd",
    date: "June 2023 — July 2023",
    location: "New Delhi, India",
    description:
      "Developed features for B2B/B2G applications using React and Django. Implemented RBAC and protected API flows for restricted modules, ensuring production-ready code.",
    tech: ["React.js", "Django", "PostgreSQL", "REST APIs", "RBAC"],
    highlights: [
      "RBAC and secured APIs for sensitive modules",
      "React + Django features shipped to production",
      "Collaboration across product and compliance constraints",
    ],
  },
] as const;

export default function Experience() {
  const reducedMotion = useReducedMotion() ?? false;
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 520 : 72,
    damping: reducedMotion ? 48 : 18,
    mass: 0.08,
    restDelta: 0.0004,
  });

  const fillScaleY = useTransform(progress, (p) => Math.min(1, Math.max(0, p)));

  return (
    <section
      id="experience"
      className="relative z-10 -mt-16 w-full scroll-mt-4 overflow-x-hidden bg-linear-to-b from-background via-[#fafafa] to-background pb-24 pt-20 text-foreground md:-mt-20 md:pb-32 md:pt-24"
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
        className="pointer-events-none absolute right-[-10%] top-[20%] h-[min(50vw,360px)] w-[min(50vw,360px)] rounded-full bg-violet-200/18 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[10%] left-[-15%] h-[min(45vw,300px)] w-[min(45vw,300px)] rounded-full bg-fuchsia-200/15 blur-[95px]"
        aria-hidden
      />

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
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.35em] text-violet-600/90 lg:text-[11px]"
          >
            03 — Experience
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
            className="font-serif text-[clamp(1.85rem,4vw,2.85rem)] font-bold leading-[1.1] tracking-tight text-slate-900"
          >
            Where I&apos;ve{" "}
            <span className="bg-linear-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
              shipped real work.
            </span>
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-slate-600 lg:mt-6 lg:text-[0.96875rem] lg:leading-[1.65]"
          >
            Roles that pushed scope, ownership, and production discipline—not slideware.
          </motion.p>
        </div>

        <div
          ref={timelineRef}
          className="relative mx-auto mt-14 flex max-w-3xl flex-row items-stretch gap-6 overflow-visible md:mt-16 md:gap-8"
        >
          <div className="relative flex w-5 shrink-0 justify-center">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-slate-200/90"
              aria-hidden
            />
            {reducedMotion ? (
              <div
                className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-linear-to-b from-violet-600 via-violet-500 to-fuchsia-500 shadow-[0_0_14px_rgba(139,92,246,0.35)]"
                aria-hidden
              />
            ) : (
              <div
                className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden rounded-full"
                aria-hidden
              >
                <motion.div
                  className="h-full w-full origin-top rounded-full bg-linear-to-b from-violet-600 via-violet-500 to-fuchsia-500 shadow-[0_0_14px_rgba(139,92,246,0.35)] will-change-transform"
                  style={{ scaleY: fillScaleY }}
                />
              </div>
            )}
          </div>

          <motion.div
            variants={cardListVariants}
            className="flex min-w-0 flex-1 flex-col gap-10 overflow-visible md:gap-12"
          >
            {experiences.map((exp) => (
              <TimelineCard key={exp.company} exp={exp} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
