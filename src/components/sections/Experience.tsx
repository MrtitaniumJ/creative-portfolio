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
import { SECTION_Y } from "@/lib/sectionStyles";

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
    role: "Co-Founder",
    company: "Career Accelerator",
    date: "Mar 2025 — Present",
    location: "Los Angeles, CA · Remote",
    description:
      "Co-building a career platform that walks people from a sharper resume to real applications—automation, scraping, and model-assisted scoring that had to behave when traffic showed up.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Selenium", "LLMs"],
    highlights: [
      "Designed resilient discovery and apply flows that could recover when sites changed overnight",
      "Improved engagement meaningfully by shortening the path from intent to action",
      "Listened to users weekly, found friction in onboarding, and removed a huge drop-off fast",
      "Partnered on fundraising storytelling while keeping releases moving",
    ],
  },
  {
    role: "Software Developer",
    company: "Persist Ventures",
    date: "Aug 2024 — Present",
    location: "Remote",
    description:
      "Core engineer on a career accelerator used widely by developers and recruiters—resume tools, profile helpers, matching, recommendations, and a browser companion people rely on daily.",
    tech: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "AWS", "JWT"],
    highlights: [
      "Implemented role-aware auth so seekers, recruiters, and admins stayed in their lanes",
      "Built model-assisted workflows with structured outputs so feedback stayed consistent",
      "Ran services on cloud VMs with dependable storage; automated deploys the team trusted",
      "Invested in tests, logging, and validation so fast shipping did not mean fragile shipping",
    ],
  },
  {
    role: "President",
    company: "GLAU CodeChef Chapter — CodeBusters",
    date: "Jul 2024 — May 2025",
    location: "Mathura, Uttar Pradesh, India",
    description:
      "Led the university programming chapter—contests, workshops, mentorship—focused on making events worth showing up for.",
    tech: ["Leadership", "Community", "Algorithms", "Mentorship"],
    highlights: [
      "Scaled programming events and campus visibility for the chapter",
      "Mentored members on fundamentals, contests, and problem-solving discipline",
      "Bridged students, faculty, and external communities for better events",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "IGOKO Avionics Pvt Ltd",
    date: "Jun 2023 — Jul 2023",
    location: "New Delhi, India",
    description:
      "Internship building B2B and government-facing apps—frontend polish, backend routes, and access rules that kept sensitive modules safe.",
    tech: ["React.js", "Node.js", "Django", "MongoDB", "REST", "RBAC"],
    highlights: [
      "Protected modules with RBAC and safer API flows",
      "Tightened validation + error handling for dependable responses",
      "Worked the full SDLC alongside seniors from idea to working product",
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
        className="pointer-events-none absolute right-[-10%] top-[20%] h-[min(50vw,360px)] w-[min(50vw,360px)] rounded-full bg-violet-200/18 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[10%] left-[-15%] h-[min(45vw,300px)] w-[min(45vw,300px)] rounded-full bg-fuchsia-200/15 blur-[95px]"
        aria-hidden
      />

      <motion.p
        className="type-watermark pointer-events-none absolute left-6 top-[26%] z-0 -translate-y-1/2 lg:left-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        aria-hidden
      >
        Journey
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
            className="type-section-title"
          >
            What I&apos;ve done{" "}
            <span className="bg-linear-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
              so far.
            </span>
          </motion.h2>

          <motion.p
            variants={rise}
            className="type-body mt-5 max-w-xl lg:mt-6"
          >
            Work experience and side quests that shaped how I build—community leadership, startup intensity,
            and early internships that taught me to listen before I code.
          </motion.p>
        </div>

        <div
          ref={timelineRef}
          className="relative mx-auto mt-14 flex max-w-3xl flex-row items-stretch gap-6 overflow-visible md:mt-16 md:gap-8"
        >
          <div className="relative flex w-5 shrink-0 justify-center">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-slate-200/90 dark:bg-slate-600/80"
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
