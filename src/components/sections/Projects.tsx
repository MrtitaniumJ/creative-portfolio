"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const projects = [
  {
    id: 1,
    title: "Mocker.AI",
    subtitle: "AI Mock Interview & Quiz Platform",
    longDescription:
      "Built a comprehensive platform that helps job seekers prepare for interviews with AI. Features include real-time video interviews, performance analytics, and personalized feedback using advanced LLM.",
    tech: ["Next.js", "PostgreSQL", "Stripe", "Gemini AI", "Tailwind", "WebRTC"],
    github: "#",
    live: "http://mocker-ai.vercel.app/",
    color: "from-violet-500 to-indigo-500",
    image: "/images/projects/mocker-ai.svg",
    stats: [
      { label: "Users", value: "2.5K+" },
      { label: "Interviews", value: "15K+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: 2,
    title: "Smart Resume Analyzer",
    subtitle: "ML-based Resume Evaluation Tool",
    longDescription:
      "Advanced NLP system that analyzes resumes using spaCy and NLTK. Provides detailed scoring, keyword matching, and personalized improvement suggestions.",
    tech: ["React.js", "Node.js", "MongoDB", "spaCy", "TensorFlow", "Python"],
    github: "https://github.com/MrtitaniumJ/Smart-Resume-Analyzer",
    live: "#",
    color: "from-fuchsia-500 to-purple-500",
    image: "/images/projects/resume-analyzer.svg",
    stats: [
      { label: "Resumes Analyzed", value: "50K+" },
      { label: "Avg Accuracy", value: "94%" },
      { label: "Active Users", value: "5K+" },
    ],
  },
  {
    id: 3,
    title: "Inventory Manager",
    subtitle: "CRUD System for Product & Stock",
    longDescription:
      "Enterprise-ready inventory management solution featuring real-time stock tracking, multi-user support, and comprehensive audit logs.",
    tech: ["React.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "REST API"],
    github: "https://github.com/MrtitaniumJ/Inventory-management/",
    live: "#",
    color: "from-blue-500 to-cyan-500",
    image: "/images/projects/inventory-manager.svg",
    stats: [
      { label: "Products", value: "10K+" },
      { label: "Transactions/Day", value: "500+" },
      { label: "Load Time", value: "<200ms" },
    ],
  },
] as const;

function ProjectSlide({
  project,
  index,
  scrollYProgress,
}: {
  project: (typeof projects)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const n = projects.length;
  const segment = 1 / n;
  const start = index * segment;
  const mid = start + segment * 0.5;
  const end = (index + 1) * segment;

  const imageY = useTransform(
    scrollYProgress,
    [start, mid, end],
    reduce ? [0, 0, 0] : [28, 0, -28]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [start, mid, end],
    reduce ? [1, 1, 1] : [0.96, 1, 0.96]
  );
  const textY = useTransform(
    scrollYProgress,
    [start, mid, end],
    reduce ? [0, 0, 0] : [16, 0, -12]
  );

  return (
    <div className="relative flex h-full w-[100dvw] min-w-[100dvw] shrink-0 items-center justify-center px-4 pt-2 md:px-10 lg:px-14">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg lg:rounded-3xl"
        >
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index === 0}
          />
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${project.color} opacity-15 mix-blend-multiply`}
          />
        </motion.div>

        <motion.div style={{ y: textY }} className="flex flex-col justify-center text-left">
          <h3 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            {project.title}
          </h3>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-violet-600 md:text-sm">
            {project.subtitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base lg:text-lg">
            {project.longDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-5 border-t border-gray-200 pt-6 md:mt-8 md:gap-8 md:pt-8">
            {project.stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold text-gray-900 md:text-2xl">{s.value}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[11px] font-semibold text-violet-800 md:px-3 md:py-1 md:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-violet-300 hover:bg-violet-50"
              >
                <FaGithub className="h-4 w-4" />
                Code
                <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
              </a>
            )}
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-violet-500/25"
              >
                <ExternalLink className="h-4 w-4" />
                Live demo
                <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const pinYRef = useRef(0);
  const lenis = useLenis();
  const reduce = useReducedMotion() ?? false;

  const n = projects.length;
  const driveProgress = useMotionValue(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!lockRef.current) {
      driveProgress.set(v);
    }
  });

  useMotionValueEvent(driveProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setSlideIndex(i);
  });

  const x = useTransform(driveProgress, [0, 1], ["0vw", `${-(n - 1) * 100}vw`]);
  const barWidth = useTransform(driveProgress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (reduce || !lenis) return;

      const outer = containerRef.current;
      const inner = stickyRef.current;
      if (!outer || !inner) return;

      const top = inner.getBoundingClientRect().top;
      const inSticky = top >= -3 && top <= 3;
      const sp = driveProgress.get();
      const sy = scrollYProgress.get();

      if (inSticky && !lockRef.current && sy > 0.005 && sy < 0.98) {
        lockRef.current = true;
        pinYRef.current = lenis.scroll;
        lenis.stop();
        driveProgress.set(sy);
      }

      if (!lockRef.current) return;

      if (sp >= 0.995 && e.deltaY > 0) {
        lockRef.current = false;
        lenis.start();
        const end = outer.offsetTop + outer.offsetHeight - window.innerHeight + 4;
        requestAnimationFrame(() => {
          lenis.scrollTo(end, { duration: 0.45 });
        });
        return;
      }

      if (sp <= 0.008 && e.deltaY < 0) {
        lockRef.current = false;
        lenis.start();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const next = Math.min(1, Math.max(0, sp + e.deltaY * 0.0006));
      driveProgress.set(next);
      lenis.scrollTo(pinYRef.current, { immediate: true });

      if (next >= 0.995) {
        lockRef.current = false;
        lenis.start();
        const end = outer.offsetTop + outer.offsetHeight - window.innerHeight + 4;
        requestAnimationFrame(() => {
          lenis.scrollTo(end, { duration: 0.45 });
        });
      }
    },
    [lenis, reduce, driveProgress, scrollYProgress]
  );

  useEffect(() => {
    if (reduce) return;
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [onWheel, reduce]);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative scroll-mt-4 pb-28 md:pb-32"
      style={{ height: `${n * 85 + 20}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden bg-background"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-1/4 h-[36rem] w-[36rem] rounded-full bg-violet-400/12 blur-[100px]" />
          <div className="absolute -right-1/4 bottom-1/4 h-[36rem] w-[36rem] rounded-full bg-indigo-400/12 blur-[100px]" />
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pt-6 md:px-8 md:pt-8 lg:px-12">
          <div className="shrink-0 border-b border-gray-200/90 pb-4 md:pb-5">
            <div className="mx-auto flex max-w-6xl items-end justify-between gap-4">
              <div className="min-w-0 text-left">
                <span className="mb-2 inline-block rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-700 md:text-xs">
                  Featured work
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                  Projects
                </h2>
                <p className="mt-1 max-w-md text-xs text-slate-500 md:text-sm">
                  {reduce
                    ? "Scroll to explore each case study."
                    : "Scroll is locked here—use the wheel to move through slides, then continue down the page."}
                </p>
              </div>
              <div className="shrink-0 font-mono text-sm tabular-nums text-slate-500 md:text-base">
                <span className="text-violet-600">
                  {String(slideIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-slate-400"> / </span>
                <span>{String(n).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="mx-auto mt-4 h-1 max-w-6xl overflow-hidden rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                style={{ width: barWidth }}
              />
            </div>
          </div>

          <div className="relative min-h-0 flex-1 py-3 md:py-4">
            <motion.div style={{ x }} className="flex h-full w-max">
              {projects.map((project, index) => (
                <ProjectSlide
                  key={project.id}
                  project={project}
                  index={index}
                  scrollYProgress={driveProgress}
                />
              ))}
            </motion.div>
          </div>

          <div className="shrink-0 pb-4 text-center md:pb-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 md:text-xs">
              {reduce ? "Keep scrolling" : "Wheel to advance slides"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
