"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const rowVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
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

const focusAreas = [
  "Type-safe stacks",
  "APIs & data models",
  "Perf & accessibility",
  "LLMs · motion · 3D",
] as const;

export default function AboutMe() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="about"
      className="relative w-full scroll-mt-4 overflow-x-hidden bg-linear-to-b from-[#fcfcfc] via-[#fafafa] to-background py-24 text-foreground md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgb(148 163 184 / 0.14) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[20%] top-[15%] h-[min(55vw,380px)] w-[min(55vw,380px)] rounded-full bg-fuchsia-200/15 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[-15%] h-[min(60vw,440px)] w-[min(60vw,440px)] rounded-full bg-violet-200/20 blur-[110px]"
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12"
        variants={rowVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          <div className="flex min-h-0 flex-col lg:col-span-7 lg:order-1 lg:h-full lg:justify-start lg:py-0">
            <motion.p
              variants={rise}
              className="mb-2 font-mono text-[11px] uppercase tracking-[0.35em] text-violet-600/90 lg:mb-2.5 lg:text-[11px]"
            >
              02 — About
            </motion.p>

            {reducedMotion ? (
              <div className="mb-5 h-0.5 w-16 rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 lg:mb-5 lg:w-20" />
            ) : (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, ease, delay: 0.12 }}
                className="mb-5 h-0.5 w-16 origin-left rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 lg:mb-5 lg:w-20"
              />
            )}

            <motion.h2
              variants={rise}
              className="mb-5 max-w-[24ch] font-serif text-[clamp(1.85rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-slate-900 lg:mb-6 xl:text-[clamp(1.9rem,3.6vw,2.85rem)]"
            >
              I build systems people trust{" "}
              <span className="block pt-0.5 lg:pt-1">
                <span className="bg-linear-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                  when nobody&apos;s watching.
                </span>
              </span>
            </motion.h2>

            <motion.blockquote
              variants={rise}
              className="mb-5 border-l-4 border-violet-500 pl-4 font-serif text-base italic leading-snug text-slate-700 lg:mb-6 lg:max-w-xl lg:pl-5 lg:text-[1.0625rem] lg:leading-snug"
            >
              Complexity is fine. Chaos is not. My job is to trim the noise until the product feels
              inevitable—not lucky.
            </motion.blockquote>

            <motion.p
              variants={rise}
              className="max-w-xl text-[0.9375rem] leading-[1.62] text-slate-600 lg:text-[0.96875rem] lg:leading-[1.65]"
            >
              I’m a full-stack engineer in the unglamorous sense: I’ve argued with PostgreSQL after
              midnight, untangled APIs when the spec and reality diverged, and chased performance until
              the interface still felt human. Your data model should match the real world—not just the
              slide deck.
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-4 max-w-xl text-[0.9375rem] leading-[1.62] text-slate-600 lg:mt-4 lg:text-[0.96875rem] lg:leading-[1.65]"
            >
              These days I lean hard into LLM workflows, automation that doesn’t feel robotic, and the
              occasional Three.js moment when the brand asks for depth. If it ships, scales, and doesn’t
              embarrass us in production, I want in.
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-4 font-mono text-[11px] text-slate-500 lg:mt-5 lg:text-xs"
            >
              India · Remote · English & Hindi
            </motion.p>

            <motion.ul
              variants={rise}
              className="mt-5 flex flex-wrap gap-2 lg:mt-6"
              aria-label="Focus areas"
            >
              {focusAreas.map((label) => (
                <li key={label}>
                  <span className="inline-flex items-center rounded-full border border-slate-200/90 bg-white/60 px-3 py-1 text-[10px] font-medium text-slate-800 shadow-sm backdrop-blur-sm lg:px-3.5 lg:py-1.5 lg:text-[11px]">
                    {label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            variants={rise}
            className={`group/about-portrait about-portrait-frame relative mx-auto flex min-h-0 w-full max-w-[300px] flex-col lg:col-span-5 lg:order-2 lg:mx-0 lg:h-full lg:max-w-none ${reducedMotion ? "about-portrait-reduced-motion" : ""}`}
          >
            <div
              className="absolute -inset-3 -z-10 rounded-[1.35rem] bg-linear-to-br from-violet-200/40 via-white/20 to-fuchsia-200/30 blur-xl lg:-inset-4 lg:top-2 lg:bottom-2 lg:rounded-3xl"
              aria-hidden
            />
            <div className="relative mx-auto flex w-full max-w-[300px] min-h-0 flex-1 flex-col lg:mx-0 lg:max-w-none">
              <div className="relative aspect-4/5 w-full min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/90 bg-slate-100 shadow-[0_28px_60px_-24px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/4 lg:aspect-auto lg:min-h-[420px] lg:h-full">
                <Image
                  src="/images/personal_image.png"
                  alt="Jatin Sharma"
                  fill
                  className="about-portrait-img object-cover object-[center_22%] transition-[filter,transform] duration-500 ease-out group-hover/about-portrait:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover/about-portrait:scale-100"
                  sizes="(max-width: 1024px) 300px, 420px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
