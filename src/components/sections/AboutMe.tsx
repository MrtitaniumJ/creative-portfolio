"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SECTION_Y } from "@/lib/sectionStyles";

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
  "Thoughtful UI",
  "Reliable backends",
  "Shipping culture",
  "Mentoring & community",
] as const;

export default function AboutMe() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="about"
      className={`relative w-full scroll-mt-4 overflow-x-hidden bg-linear-to-b from-[#fcfcfc] via-[#fafafa] to-background text-foreground dark:from-zinc-950 dark:via-zinc-950 ${SECTION_Y}`}
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

      <motion.p
        className="type-watermark pointer-events-none absolute left-6 top-[30%] z-0 -translate-y-1/2 lg:left-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        aria-hidden
      >
        About
      </motion.p>

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
              className="type-kicker mb-2 lg:mb-2.5"
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
              className="type-section-title-tight mb-5 max-w-[24ch] lg:mb-6"
            >
              Overview —{" "}
              <span className="block pt-0.5 lg:pt-1">
                <span className="bg-linear-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                  the human behind the commits.
                </span>
              </span>
            </motion.h2>

            <motion.blockquote
              variants={rise}
              className="type-lead mb-5 border-l-4 border-violet-500 pl-4 lg:mb-6 lg:max-w-xl lg:pl-5"
            >
              I am happiest when a screen feels effortless on the outside and honest on the inside—no
              theatre, just craft you can lean on.
            </motion.blockquote>

            <motion.p
              variants={rise}
              className="type-body max-w-xl"
            >
              I am experienced taking ideas from sketch to something real people use: layouts that respond,
              flows that forgive mistakes, and services that fail loudly enough to fix before anyone panics.
            </motion.p>

            <motion.p
              variants={rise}
              className="type-body mt-4 max-w-xl lg:mt-4"
            >
              I have been proficient at wearing both hats—polishing what users see and tightening what they
              never should. Lately that has meant career tools at serious scale, plus seasons of mentoring
              peers who are just discovering how fun this work can be.
            </motion.p>

            <motion.p
              variants={rise}
              className="type-meta mt-4 lg:mt-5"
            >
              Based in Bengaluru · CS undergrad at GLA · English & Hindi
            </motion.p>

            <motion.ul
              variants={rise}
              className="mt-5 flex flex-wrap gap-2 lg:mt-6"
              aria-label="Focus areas"
            >
              {focusAreas.map((label) => (
                <li key={label}>
                  <span className="type-pill">
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
              <div className="relative aspect-4/5 w-full min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/90 bg-slate-100 shadow-[0_28px_60px_-24px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/4 lg:aspect-auto lg:min-h-[420px] lg:h-full dark:border-white/10 dark:bg-zinc-800/50 dark:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.4)] dark:ring-white/5">
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
