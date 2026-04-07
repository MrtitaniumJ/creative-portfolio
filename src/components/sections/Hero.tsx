"use client";

import dynamic from "next/dynamic";
import { useRef, useCallback, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useReducedMotion,
  useTransform
} from "framer-motion";
import { ExternalLink, MoveDownRight } from "lucide-react";
import type { HeroMouseRef } from "@/components/3d/HeroInteractiveBackground";

const RESUME_URL =
  "https://drive.google.com/file/d/1hvn1PoDKy6Gr_ir62SV7ikBKQLyzlifv/view?usp=sharing";

const HeroInteractiveBackground = dynamic(
  () => import("@/components/3d/HeroInteractiveBackground"),
  { ssr: false }
);

function normalizeHeroPointer(clientX: number, clientY: number, rect: DOMRectReadOnly) {
  const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
  const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
  return { x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)) };
}

function StaticHeroBackdrop() {
  return <div className="absolute inset-0 z-0 bg-[#fcfcfc]" aria-hidden />;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 }) as HeroMouseRef;
  const reducedMotion = useReducedMotion() ?? false;
  const parallaxPxRef = useRef(14);

  useEffect(() => {
    if (reducedMotion) {
      parallaxPxRef.current = 0;
      return;
    }
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = () => {
      parallaxPxRef.current = mq.matches ? 14 : 0;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reducedMotion]);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const smoothX = useSpring(targetX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(targetY, { stiffness: 100, damping: 20 });

  const mapParallaxX = useCallback((v: number) => {
    const n = parallaxPxRef.current;
    if (!n) return 0;
    const t = Math.max(0, Math.min(1, v / 1920));
    return n * (1 - 2 * t);
  }, []);

  const mapParallaxY = useCallback((v: number) => {
    const n = parallaxPxRef.current;
    if (!n) return 0;
    const t = Math.max(0, Math.min(1, v / 1080));
    return n * (1 - 2 * t);
  }, []);

  const contentX = useTransform(smoothX, mapParallaxX);
  const contentY = useTransform(smoothY, mapParallaxY);

  const updatePointer = useCallback((clientX: number, clientY: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const { x, y } = normalizeHeroPointer(clientX, clientY, rect);
    mouseRef.current.x = x;
    mouseRef.current.y = y;

    targetX.set(clientX - rect.left);
    targetY.set(clientY - rect.top);
  }, [targetX, targetY]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    updatePointer(e.clientX, e.clientY);
  }, [updatePointer]);

  const handlePointerLeave = useCallback(() => {
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-dvh w-full max-w-full flex-col overflow-x-clip bg-[#fcfcfc] selection:bg-violet-200"
    >
      {reducedMotion ? <StaticHeroBackdrop /> : <HeroInteractiveBackground mouseRef={mouseRef} />}

      <div className="relative z-10 mx-auto flex min-h-dvh w-full min-w-0 max-w-5xl flex-col justify-center pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(6rem,env(safe-area-inset-bottom))] pt-[max(4rem,env(safe-area-inset-top))] max-[639px]:pb-28 sm:justify-end sm:px-6 sm:pb-[10vh] sm:pt-0 md:px-10 md:pb-[12vh] lg:px-12 lg:pb-[15vh] xl:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: contentX, y: contentY }}
          className="pointer-events-none relative z-20 w-full min-w-0 max-w-full overflow-x-clip"
        >
           <motion.p
             initial={{ opacity: 0, x: -12 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="type-hero-kicker mb-3 max-w-full text-balance hyphens-auto max-[380px]:tracking-[0.28em] sm:mb-4 md:mb-5"
           >
             I shape products end to end — from first sketch to shipped detail
           </motion.p>

           {/* Display: ~3rem floor + 9vw keeps “SHARMA” + ml-2 on-screen; old 4.5rem floor overflowed; 2.35rem was too timid on phones. */}
           <h1 className="flex w-full min-w-0 max-w-full flex-col font-serif leading-[0.88] tracking-tighter sm:leading-[0.85]">
             <span
               className="relative isolate block w-full min-w-0 max-w-full text-[clamp(3rem,calc(9vw+1.5rem),12rem)] font-black text-slate-900 drop-shadow-sm before:pointer-events-none before:absolute before:-top-2.5 before:left-0 before:z-10 before:h-[2.5px] before:w-14 before:rounded-full before:bg-linear-to-r before:from-violet-600 before:via-fuchsia-500 before:to-violet-400 before:shadow-[0_0_24px_rgba(124,58,237,0.55),0_0_48px_rgba(168,85,247,0.2)] before:content-[''] sm:before:-top-3 sm:before:h-[3px] sm:before:w-16 md:before:-top-4 md:before:h-[3.5px] md:before:w-24"
             >
                JATIN
             </span>
             <span className="relative block w-full min-w-0 max-w-full text-[clamp(3rem,calc(9vw+1.5rem),12rem)] font-black italic tracking-tight text-transparent mix-blend-multiply [-webkit-text-stroke:1.25px_rgba(15,23,42,0.5)] sm:tracking-tighter sm:[-webkit-text-stroke:1.5px_rgba(15,23,42,0.5)] md:[-webkit-text-stroke:2px_rgba(15,23,42,0.4)] ml-2 min-[400px]:ml-[3vw] sm:ml-[4vw] md:ml-[8vw]">
                SHARMA
             </span>
           </h1>

           {/* Bold Permanent Branding Statement */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
             className="relative mt-5 max-w-xl pl-3 sm:mt-8 sm:pl-0 md:mt-12"
           >
             <div className="absolute left-0 top-1.5 h-full w-[2px] bg-violet-600/50 sm:-left-6 md:-left-8" />
             <p className="type-body-soft max-w-full sm:max-w-xl">
                I care about interfaces that feel obvious and systems that keep their promises after launch.
                Most days that means turning fuzzy ideas into something people can click, trust, and come back to.
             </p>

             <div className="mt-6 flex flex-col items-start gap-5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
               <a
                 href="#projects"
                 className="pointer-events-auto inline-flex items-center gap-3 font-semibold uppercase tracking-widest text-slate-900 transition-colors hover:text-violet-600 group"
               >
                 See my work
                 <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 transition-colors group-hover:border-violet-600 group-hover:bg-violet-50">
                   <MoveDownRight className="h-4 w-4 text-slate-600 transition-colors group-hover:text-violet-600" />
                 </span>
               </a>
               <a
                 href={RESUME_URL}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="pointer-events-auto inline-flex items-center gap-3 font-semibold uppercase tracking-widest text-slate-900 transition-colors hover:text-violet-600 group"
               >
                 <span>Résumé (PDF)</span>
                 <span className="sr-only">Opens Google Drive in a new tab; use Drive to download.</span>
                 <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 transition-colors group-hover:border-violet-600 group-hover:bg-violet-50">
                   <ExternalLink className="h-4 w-4 text-slate-600 transition-colors group-hover:text-violet-600" />
                 </span>
               </a>
             </div>
           </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
