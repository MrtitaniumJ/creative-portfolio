"use client";

import {
  AnimatePresence,
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

const spinTransition = { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const };

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const reduceMotion = useReducedMotion() ?? false;
  const baseId = useId();
  const [ripples, setRipples] = useState<{ id: number; light: boolean }[]>([]);
  const [bezelSpin, setBezelSpin] = useState(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const raf = useRef<number>(0);

  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${
    isDark ? "rgba(167,139,250,0.42)" : "rgba(251,191,36,0.34)"
  } 0%, transparent 65%)`;

  const handleClick = useCallback(() => {
    if (!reduceMotion) {
      const id = Date.now();
      setRipples((r) => [...r, { id, light: !isDark }]);
      window.setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 650);
      setBezelSpin((n) => n + 1);
    }
    toggleTheme();
  }, [isDark, reduceMotion, toggleTheme]);

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        glowX.set(Math.max(10, Math.min(90, x)));
        glowY.set(Math.max(10, Math.min(90, y)));
      });
    },
    [glowX, glowY],
  );

  const handleLeave = useCallback(() => {
    animate(glowX, 50, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
    animate(glowY, 50, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
  }, [glowX, glowY]);

  const stars = [
    { t: 8, l: 78, d: 0 },
    { t: 22, l: 88, d: 0.15 },
    { t: 6, l: 58, d: 0.3 },
    { t: 84, l: 72, d: 0.45 },
    { t: 72, l: 14, d: 0.2 },
  ] as const;

  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="group fixed right-4 top-4 z-[90] flex size-11 items-center justify-center overflow-visible rounded-full border border-border/80 bg-card/95 text-foreground shadow-[0_8px_28px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-6 sm:top-6 sm:size-12 dark:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.45)] dark:ring-white/10"
      onClick={handleClick}
      onPointerMove={reduceMotion ? undefined : handleMove}
      onPointerLeave={reduceMotion ? undefined : handleLeave}
    >
      {/* Parallax glow — motion values read inline so native button stays fixed */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-full blur-xl"
          style={{ background: glowBackground }}
        />
      )}

      <AnimatePresence>
        {!reduceMotion
          ? ripples.map(({ id, light }) => (
              <motion.span
                key={id}
                initial={{ scale: 0.85, opacity: 0.55 }}
                animate={{ scale: 2.35, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-none absolute inset-0 rounded-full border-2 ${
                  light
                    ? "border-amber-300/90 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                    : "border-violet-400/90 shadow-[0_0_22px_rgba(167,139,250,0.55)]"
                }`}
              />
            ))
          : null}
      </AnimatePresence>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-2px] z-0 rounded-full p-[2px] opacity-90 dark:opacity-[0.92]"
        animate={{ rotate: reduceMotion ? 0 : bezelSpin * 180 }}
        transition={reduceMotion ? { duration: 0 } : spinTransition}
      >
        <div
          className="h-full w-full rounded-full bg-[conic-gradient(from_0deg,#7c3aed_0%,#e879f9_35%,#6366f1_65%,#a855f7_100%)]"
          style={{ filter: "saturate(1.12)" }}
        />
      </motion.div>

      <span className="pointer-events-none absolute inset-[2px] z-[1] rounded-full bg-card/95 shadow-inner backdrop-blur-md ring-1 ring-slate-900/5 dark:bg-zinc-950/92 dark:ring-white/10" />

      <motion.span
        className="relative z-10 flex size-full items-center justify-center overflow-hidden rounded-full"
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.93 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "dark" : "light"}
            role="presentation"
            initial={reduceMotion ? false : { rotate: -110, scale: 0.15, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { rotate: 110, scale: 0.15, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 340, damping: 22 }
            }
            className="flex items-center justify-center will-change-transform"
          >
            {isDark ? (
              <Moon
                className="size-[1.15rem] text-violet-200 drop-shadow-[0_0_10px_rgba(196,181,253,0.65)] sm:size-5"
                strokeWidth={2}
                aria-hidden
              />
            ) : (
              <Sun
                className="size-[1.15rem] text-amber-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.55)] sm:size-5"
                strokeWidth={2.25}
                aria-hidden
              />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      <AnimatePresence>
        {isDark && !reduceMotion && (
          <motion.span
            key="stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-[-4px] z-[5] overflow-visible rounded-full"
            aria-hidden
          >
            {stars.map((s, i) => (
              <motion.span
                key={`${baseId}-star-${i}`}
                className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.55)]"
                style={{ top: `${s.t}%`, left: `${s.l}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.25, 1, 0.35, 0.9, 0.25],
                  scale: [0.6, 1, 0.75, 1, 0.6],
                }}
                transition={{
                  duration: 2.8 + i * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: s.d,
                }}
              />
            ))}
          </motion.span>
        )}
      </AnimatePresence>

      {!reduceMotion && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[3px] z-[2] overflow-hidden rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <motion.span
            className="absolute inset-y-0 left-0 w-[45%] skew-x-[-16deg] bg-linear-to-r from-transparent via-white/35 to-transparent dark:via-white/12"
            initial={false}
            animate={{ left: ["-40%", "120%"] }}
            transition={{
              duration: 1.05,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.25,
            }}
          />
        </span>
      )}
    </button>
  );
}
