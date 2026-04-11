"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * Custom cursor only when primary input supports hover + fine pointer (mouse/desktop),
 * and the user has not asked for reduced motion. Aligns with scoped `cursor: none` in globals.css.
 */
function useCustomCursorEnabled() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const mqPointer = window.matchMedia("(pointer: fine)");
      const mqHover = window.matchMedia("(hover: hover)");
      const on = () => onStoreChange();
      mqMotion.addEventListener("change", on);
      mqPointer.addEventListener("change", on);
      mqHover.addEventListener("change", on);
      return () => {
        mqMotion.removeEventListener("change", on);
        mqPointer.removeEventListener("change", on);
        mqHover.removeEventListener("change", on);
      };
    },
    () => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      const canHover = window.matchMedia("(hover: hover)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return fine && canHover && !reduced;
    },
    () => false
  );
}

export default function CustomCursor() {
  const enabled = useCustomCursorEnabled();
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 600, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const computedCursor = window.getComputedStyle(target).cursor;
      const isInteractable =
        computedCursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.classList.contains("group");

      setIsHovering(isInteractable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, enabled, isVisible]);

  const mounted = useIsClient();
  if (!mounted || !enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-5 w-5 rounded-full bg-violet-600 mix-blend-darken dark:mix-blend-lighten"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          scale: isVisible ? (isHovering ? 0.3 : 1) : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 200, mass: 0.2 }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-2.5 -mt-2.5 h-10 w-10 rounded-full border border-violet-400/50 mix-blend-darken dark:mix-blend-lighten"
        style={{
          translateX: ringXSpring,
          translateY: ringYSpring,
        }}
        animate={{
          scale: isVisible ? (isHovering ? 1.5 : 1) : 0,
          opacity: isVisible ? (isHovering ? 1 : 0.5) : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150, mass: 0.5 }}
      />
    </>
  );
}
