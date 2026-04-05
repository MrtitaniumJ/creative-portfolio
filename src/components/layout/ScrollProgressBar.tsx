"use client";

import { motion } from "framer-motion";
import { usePageScrollProgress } from "./ScrollProgressContext";

export default function ScrollProgressBar() {
  const scrollYProgress = usePageScrollProgress();

  if (!scrollYProgress) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
