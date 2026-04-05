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

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner dot spring (fast)
  const springConfig = { damping: 25, stiffness: 600, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Outer ring spring (slow, trailing)
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
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
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('group');
        
      setIsHovering(isInteractable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  const mounted = useIsClient();
  if (!mounted) return null;

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-5 h-5 rounded-full z-[100] pointer-events-none mix-blend-darken bg-violet-600`}
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
        className={`fixed top-0 left-0 w-10 h-10 -ml-2.5 -mt-2.5 rounded-full z-[99] pointer-events-none border border-violet-400/50 mix-blend-darken`}
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
