"use client";

import dynamic from "next/dynamic";
import { useRef, useCallback } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useReducedMotion,
  useTransform
} from "framer-motion";
import { MoveDownRight } from "lucide-react";
import type { HeroMouseRef } from "@/components/3d/HeroInteractiveBackground";

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
  
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const smoothX = useSpring(targetX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(targetY, { stiffness: 100, damping: 20 });

  // Minimal Parallax for Content Box
  const contentX = useTransform(smoothX, [0, 1920], [20, -20]);
  const contentY = useTransform(smoothY, [0, 1080], [20, -20]);

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
      // Engineering Standard: Strict viewport bound
      // Enforce EXACT h-[100dvh] preventing layout shifts and scrolling below fold
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#fcfcfc] selection:bg-violet-200"
    >
      {reducedMotion ? <StaticHeroBackdrop /> : <HeroInteractiveBackground mouseRef={mouseRef} />}

      {/* Main Content Layout: Asymmetrical Bottom-Left alignment */}
      {/* Engineering Standard: Responsive padding (vh based) dynamically shrinks on smaller screens so content never overflows the 100dvh container */}
      <div className="relative z-10 container mx-auto flex h-full w-full flex-col justify-end px-6 pb-[10vh] md:px-12 md:pb-[12vh] lg:px-20 lg:pb-[15vh]">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: contentX, y: contentY }}
          className="pointer-events-none relative max-w-5xl"
        >
           {/* Top Title */}
           <motion.p
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 0.3 }}
             className="mb-6 font-mono text-sm uppercase tracking-[0.3em] text-slate-500 md:mb-8 md:text-base"
           >
             Full-Stack Developer / Creative Engineer
           </motion.p>

           {/* Massive Asymmetrical Typography */}
           <h1 className="flex flex-col font-serif leading-[0.85] tracking-tighter mix-blend-multiply">
             <span className="block text-[clamp(4.5rem,14vw,12rem)] font-black text-slate-900 drop-shadow-sm">
                JATIN
             </span>
             <span className="relative block text-[clamp(4.5rem,14vw,12rem)] font-black italic text-transparent [-webkit-text-stroke:1.5px_rgba(15,23,42,0.5)] md:[-webkit-text-stroke:2px_rgba(15,23,42,0.4)] ml-[4vw] md:ml-[8vw]">
                SHARMA
             </span>
           </h1>

           {/* Bold Permanent Branding Statement */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
             className="relative mt-8 max-w-xl md:mt-12"
           >
             <div className="absolute -left-6 top-1.5 h-full w-[2px] bg-violet-600/50 md:-left-8" />
             <p className="text-base font-light leading-relaxed text-slate-700 md:text-[1.1rem]">
                Crafting resilient platforms and immersive digital experiences. 
                I bridge the gap between complex data layers and breathtakingly smooth, high-performance frontends.
             </p>

             <div className="mt-8 flex items-center gap-6">
               <a 
                 href="#projects" 
                 className="pointer-events-auto inline-flex items-center gap-3 font-semibold uppercase tracking-widest text-slate-900 transition-colors hover:text-violet-600 group"
               >
                 Discover Work
                 <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 transition-colors group-hover:border-violet-600 group-hover:bg-violet-50">
                    <MoveDownRight className="h-4 w-4 text-slate-600 transition-colors group-hover:text-violet-600" />
                 </span>
               </a>
             </div>
           </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
