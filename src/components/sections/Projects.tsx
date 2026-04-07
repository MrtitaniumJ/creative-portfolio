"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

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

const AUTO_MS = 5200;
const GAP_PX = 16;
const LG_QUERY = "(min-width: 1024px)";
/** Repositories tab — full project list on GitHub */
const GITHUB_REPOS_URL = "https://github.com/MrtitaniumJ?tab=repositories";

export const projects = [
  {
    id: 1,
    title: "Mocker.AI",
    subtitle: "AI Mock Interview & Quiz Platform",
    intent: "Give candidates a safe place to rehearse before the real room.",
    longDescription:
      "Voice-friendly mock sessions, saved attempts, and feedback you can iterate on—not a black box score. Auth, persistence, and subscriptions are first-class so the loop feels serious, not toy-like.",
    tech: ["Next.js", "PostgreSQL", "Clerk", "Stripe", "Gemini", "shadcn/ui"],
    github: "#",
    live: "http://mocker-ai.vercel.app/",
    color: "from-violet-500 to-indigo-500",
    image: "/images/projects/mocker-ai.svg",
    facts: [
      { label: "You practice", value: "Interviews & quizzes" },
      { label: "You keep", value: "Attempts & history" },
      { label: "You get", value: "Structured AI feedback" },
    ],
  },
  {
    id: 2,
    title: "Smart Resume Analyzer",
    subtitle: "NLP Resume vs. Job Fit",
    intent: "Make “am I a fit?” something you can see, not guess.",
    longDescription:
      "Pair a resume with a job description and get concrete language on gaps, keywords, and next edits—backed by NLP pipelines and APIs that return structured suggestions, not vague praise.",
    tech: ["React.js", "Node.js", "MongoDB", "spaCy", "TensorFlow", "Python"],
    github: "https://github.com/MrtitaniumJ/Smart-Resume-Analyzer",
    live: "#",
    color: "from-fuchsia-500 to-purple-500",
    image: "/images/projects/resume-analyzer.svg",
    facts: [
      { label: "You bring", value: "Resume + JD" },
      { label: "You see", value: "Gaps & keywords" },
      { label: "You leave with", value: "Actionable edits" },
    ],
  },
  {
    id: 3,
    title: "Inventory Manager",
    subtitle: "MERN Stock Control",
    intent: "Turn stock chaos into a single calm dashboard.",
    longDescription:
      "CRUD that respects validation and predictable server behavior—so operators trust the numbers. Built as a team-friendly MERN baseline you can extend without rewiring the whole app.",
    tech: ["React.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "REST"],
    github: "https://github.com/MrtitaniumJ/Inventory-management/",
    live: "#",
    color: "from-blue-500 to-cyan-500",
    image: "/images/projects/inventory-manager.svg",
    facts: [
      { label: "You manage", value: "Products & stock" },
      { label: "You rely on", value: "Validated APIs" },
      { label: "You skip", value: "Spreadsheet roulette" },
    ],
  },
] as const;

function useLgUp() {
  const [lg, setLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY);
    const apply = () => setLg(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return lg;
}

function ProjectCard({
  project,
  index,
  compact,
}: {
  project: (typeof projects)[number];
  index: number;
  compact?: boolean;
}) {
  const hasGithub = project.github !== "#";
  const hasLive = project.live !== "#";

  return (
    <article
      id={compact ? undefined : `project-panel-${project.id}`}
      className={`mx-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/3 backdrop-blur-sm ${
        compact ? "max-w-none" : "max-w-md sm:max-w-lg md:max-w-xl"
      }`}
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-100">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover object-center"
          sizes={
            compact
              ? "(min-width: 1024px) 28vw, (max-width: 640px) 100vw, 90vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 36rem"
          }
          priority={index === 0}
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-linear-to-br ${project.color} opacity-[0.12] mix-blend-multiply`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div
        className={`flex min-h-0 flex-1 flex-col gap-2 border-slate-100 p-3 sm:gap-3 sm:p-4 lg:gap-2 lg:p-3 ${compact ? "lg:gap-2 lg:p-3" : ""}`}
      >
        <div className="min-w-0">
          <p className="type-eyebrow-card text-[0.65rem] sm:text-xs lg:text-[0.65rem]">{project.subtitle}</p>
          <h3 className="type-card-title-sm mt-1 leading-tight lg:text-base">{project.title}</h3>
          <p className="mt-1.5 text-xs font-medium leading-snug text-violet-700/90 sm:text-sm lg:line-clamp-2 lg:text-xs">
            {project.intent}
          </p>
          <p
            className={`type-card-body mt-1.5 text-pretty text-slate-600 sm:line-clamp-none ${compact ? "line-clamp-3 lg:text-xs lg:leading-relaxed" : "line-clamp-4"}`}
          >
            {project.longDescription}
          </p>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-2 sm:space-y-3 sm:pt-3 lg:space-y-2 lg:pt-2">
          <ul className="space-y-1 sm:space-y-2 lg:space-y-1" aria-label="What this project offers">
            {project.facts.map((f) => (
              <li
                key={f.label}
                className="flex gap-1.5 text-[0.65rem] leading-snug sm:text-xs sm:leading-snug lg:text-[0.65rem]"
              >
                <span className="shrink-0 font-semibold text-slate-500">{f.label}</span>
                <span className="text-slate-800">{f.value}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1">
            {project.tech.map((tech) => (
              <span key={tech} className="type-tag py-0.5 text-[0.6rem] sm:text-xs lg:py-0.5 lg:text-[0.6rem]">
                {tech}
              </span>
            ))}
          </div>

          {(hasGithub || hasLive) && (
            <p className="text-xs text-slate-500 sm:text-sm lg:text-xs">
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-violet-600 underline decoration-violet-300 underline-offset-2 transition hover:text-violet-700"
                >
                  View code
                </a>
              )}
              {hasGithub && hasLive && <span className="mx-2 text-slate-300">·</span>}
              {hasLive && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-violet-600 underline decoration-violet-300 underline-offset-2 transition hover:text-violet-700"
                >
                  Live site
                </a>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

const n = projects.length;
/** Two full cycles so we can slide windows [0,1,2] → [1,2,0] → [2,0,1] on large screens */
const DESKTOP_STRIP = [...projects, ...projects] as (typeof projects)[number][];

function ProjectsCarouselTrack({
  isLg,
  reducedMotion,
}: {
  isLg: boolean;
  reducedMotion: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(0);
  const [active, setActive] = useState(0);
  const [offsetLg, setOffsetLg] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setVw(el.clientWidth));
    ro.observe(el);
    setVw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (i: number) => {
      if (isLg) {
        setOffsetLg(((i % n) + n) % n);
      } else {
        setActive(((i % n) + n) % n);
      }
    },
    [isLg],
  );

  const advance = useCallback(() => {
    if (isLg) {
      setOffsetLg((o) => (o + 1) % n);
    } else {
      setActive((a) => (a + 1) % n);
    }
  }, [isLg]);

  useEffect(() => {
    if (reducedMotion || paused || n <= 1) return;
    const id = window.setInterval(advance, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, advance]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const end = e.changedTouches[0]?.clientX;
    if (end == null) return;
    const dx = end - start;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) {
      if (isLg) setOffsetLg((o) => (o + 1) % n);
      else setActive((a) => (a + 1) % n);
    } else {
      if (isLg) setOffsetLg((o) => (o - 1 + n) % n);
      else setActive((a) => (a - 1 + n) % n);
    }
  };

  const slideWDesktop = vw > 0 ? (vw - 2 * GAP_PX) / 3 : 0;
  const stepDesktop = slideWDesktop + GAP_PX;
  const trackWidthDesktop = DESKTOP_STRIP.length * slideWDesktop + (DESKTOP_STRIP.length - 1) * GAP_PX;
  const translateDesktop = offsetLg * stepDesktop;

  const slidePct = 100 / n;

  const transition = reducedMotion ? "none" : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <>
      <div
        className="relative mx-auto w-full max-w-6xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={viewportRef}
          className="overflow-hidden rounded-none sm:rounded-2xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          aria-live={reducedMotion ? "off" : "polite"}
        >
          {isLg && vw > 0 ? (
            <div
              className="flex motion-reduce:transition-none"
              style={{
                width: trackWidthDesktop,
                transform: `translateX(-${translateDesktop}px)`,
                transition,
                gap: GAP_PX,
              }}
            >
              {DESKTOP_STRIP.map((project, i) => {
                const logical = i % n;
                const inView = i >= offsetLg && i <= offsetLg + 2;
                return (
                  <div
                    key={`${project.id}-lg-${i}`}
                    className="box-border flex shrink-0 justify-center"
                    style={{ width: slideWDesktop }}
                    aria-hidden={!inView}
                  >
                    <ProjectCard project={project} index={logical} compact />
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="flex motion-reduce:transition-none"
              style={{
                width: `${n * 100}%`,
                transform: `translateX(calc(-${active} * ${slidePct}%))`,
                transition,
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="box-border flex shrink-0 justify-center px-2 sm:px-4"
                  style={{ width: `${slidePct}%` }}
                  aria-hidden={index !== active}
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex w-full justify-center px-2">
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Choose project slide"
        >
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={isLg ? offsetLg === i : active === i}
              aria-controls={isLg ? undefined : `project-panel-${project.id}`}
              id={`project-tab-${project.id}`}
              onClick={() => goTo(i)}
              className={
                (isLg ? offsetLg === i : active === i)
                  ? "h-2.5 w-8 rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600 shadow-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                  : "h-2 w-2 rounded-full bg-slate-300 transition-all duration-300 hover:bg-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  const reducedMotion = useReducedMotion() ?? false;
  const isLg = useLgUp();

  return (
    <section
      id="projects"
      className="relative z-10 w-full scroll-mt-4 overflow-x-hidden bg-linear-to-b from-background via-[#fafafa] to-background pb-24 pt-20 text-foreground md:pb-32 md:pt-24"
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
        className="type-watermark pointer-events-none absolute left-6 top-[28%] z-0 -translate-y-1/2 lg:left-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        aria-hidden
      >
        Work
      </motion.p>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12"
        variants={rowVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="max-w-3xl">
          <motion.p variants={rise} className="type-kicker mb-2">
            05 — Projects
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

          <motion.h2 variants={rise} className="type-section-title">
            My work —{" "}
            <span className="bg-linear-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
              stories in code.
            </span>
          </motion.h2>

          <motion.p variants={rise} className="type-body mt-5 max-w-xl text-pretty lg:mt-6">
            A few projects that show how I think: each card is a real bet, a messy constraint, and a shipped
            outcome. Links below when you want the repo or a live walkthrough.
          </motion.p>

          <motion.div variants={rise} className="mt-6 sm:mt-7 lg:mt-8">
            <a
              href={GITHUB_REPOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-slate-200/90 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-800 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5 transition hover:border-violet-400/80 hover:bg-violet-50/90 hover:text-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              <FaGithub
                className="h-5 w-5 shrink-0 text-slate-700 transition-colors group-hover:text-violet-700"
                aria-hidden
              />
              <span>View all projects on GitHub</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </motion.div>
        </div>

        <motion.div variants={rise} className="mt-10 w-full sm:mt-12 md:mt-14">
          <ProjectsCarouselTrack
            key={isLg ? "lg" : "sm"}
            isLg={isLg}
            reducedMotion={reducedMotion}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
