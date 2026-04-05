"use client";

import { motion } from "framer-motion";
import SkillsBento from "@/components/sections/SkillsBento";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full scroll-mt-4 overflow-hidden py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-violet-200/30 blur-[90px]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-indigo-200/25 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="mb-3 inline-block rounded-full border border-violet-300 bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
              Stack
            </span>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Skills &amp; tools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
              Hover for depth, click a tile for the full list—organized how I actually work across the stack.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.06 }}
        >
          <SkillsBento />
        </motion.div>
      </div>
    </section>
  );
}
