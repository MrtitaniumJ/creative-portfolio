"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const op1 = useTransform(scrollYProgress, [0, 0.11, 0.18, 0.28], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.11, 0.18, 0.28], [36, 0, 0, -32]);

  const op2 = useTransform(scrollYProgress, [0.28, 0.36, 0.45, 0.54], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.28, 0.36, 0.45, 0.54], [36, 0, 0, -32]);

  // Keep last beat on screen until section ends — avoids a long “empty” sticky tail.
  const op3 = useTransform(scrollYProgress, [0.54, 0.62, 0.7, 1], [0, 1, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.54, 0.62, 0.7, 1], [36, 0, 0, 0]);

  const imageScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.92, 1, 1.03]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.06, 0.85, 1], [0.9, 1, 1, 0.98]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full scroll-mt-4 bg-background pb-0 text-foreground"
      style={{ height: "min(118vh, calc(100vh + 14rem))" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-[min(80vw,520px)] w-[min(80vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/35 blur-[100px] md:h-[560px] md:w-[560px]" />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 sm:px-6 md:flex-row md:gap-12 lg:gap-14 lg:px-12">
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="relative h-52 w-52 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md sm:h-60 sm:w-60 md:h-80 md:w-72 lg:h-[380px] lg:w-[320px]"
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-violet-500/5 to-transparent" />
            <Image
              src="/images/personal_image.png"
              alt="Jatin Sharma"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 208px, 320px"
              priority
            />
          </motion.div>

          <div className="relative flex h-[min(52vh,380px)] w-full max-w-xl items-center md:h-[420px] md:max-w-lg">
            <motion.div
              style={{ opacity: op1, y: y1 }}
              className="absolute inset-0 flex flex-col justify-center px-1 sm:px-0"
            >
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">
                Who I am
              </h2>
              <h3 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                The architect behind the code.
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
                Full stack engineer focused on turning complex requirements into reliable products—clear
                APIs, solid data models, and UIs that stay fast under load.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: op2, y: y2 }}
              className="pointer-events-none absolute inset-0 flex flex-col justify-center px-1 sm:px-0"
            >
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">
                Philosophy
              </h2>
              <h3 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                Logic meets aesthetics.
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
                Code should be maintainable and measurable. I care about architecture, DX, and the details
                recruiters notice: performance, accessibility, and shipping on time.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: op3, y: y3 }}
              className="pointer-events-none absolute inset-0 flex flex-col justify-center px-1 sm:px-0"
            >
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">
                How I work
              </h2>
              <h3 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                Always leveling up.
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
                From LLM-powered workflows to interactive 3D on the web, I keep pushing into tools and
                patterns that make products stand out—without sacrificing stability.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
