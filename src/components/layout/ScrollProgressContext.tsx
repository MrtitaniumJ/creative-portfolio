"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useScroll, type MotionValue } from "framer-motion";

const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export function usePageScrollProgress(): MotionValue<number> | null {
  return useContext(ScrollProgressContext);
}

export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ScrollProgressContext.Provider value={scrollYProgress}>
      <div ref={ref} className="relative min-h-screen">
        {children}
      </div>
    </ScrollProgressContext.Provider>
  );
}
