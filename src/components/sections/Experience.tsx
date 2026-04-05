"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TimelineCard from "./TimelineCard";

const experiences = [
  {
    role: "Software Developer",
    company: "Persist Ventures",
    date: "Aug 2024 - Present",
    location: "Remote",
    description:
      "Built and scaled the Devs Career Accelerator platform supporting 10k+ developers. Developed AI-driven automation workflows with LLM integration for resume enhancement and job applications.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Gemini AI", "OpenAI"],
    highlights: [
      "Platform used by 10k+ developers with reliable uptime",
      "LLM-powered resume and application workflows in production",
      "Full-stack ownership from schema to UI",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "IGOKO Avionics Pvt Ltd",
    date: "June 2023 - July 2023",
    location: "New Delhi, India",
    description:
      "Developed features for B2B/B2G applications using React and Django. Implemented RBAC and protected API flows for restricted modules, ensuring production-ready code.",
    tech: ["React.js", "Django", "PostgreSQL", "REST APIs", "RBAC"],
    highlights: [
      "RBAC and secured APIs for sensitive modules",
      "React + Django features shipped to production",
      "Collaboration across product and compliance constraints",
    ],
  },
];


export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.55], ["0%", "100%"]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -4]);
  const ribbonGlow = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative z-10 -mt-20 w-full scroll-mt-4 overflow-hidden bg-background pt-12 pb-16 md:-mt-24 md:pt-14 md:pb-20"
    >
      {/* Background Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-violet-600 font-sans font-semibold tracking-[0.3em] uppercase text-sm md:text-base px-4 py-2 rounded-full border border-violet-300 bg-violet-100 inline-block mb-6">
              My Journey
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight drop-shadow-sm">
              Professional Timeline
            </h2>
            <p className="text-slate-600 text-lg mt-6 max-w-2xl mx-auto">
              A visual journey through my professional evolution and growth in software engineering
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative mx-auto mb-12 max-w-5xl md:mb-16">
          {/* Scroll-scrubbed ribbon (decorative, low contrast) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-3 top-0 hidden h-full w-16 overflow-visible md:left-1/2 md:block md:-translate-x-[2.25rem]"
            style={{ opacity: ribbonGlow }}
          >
            <motion.div
              className="absolute left-1/2 top-[8%] h-[84%] w-3 -translate-x-1/2 rounded-full bg-gradient-to-b from-fuchsia-500/35 via-violet-500/45 to-indigo-500/25 blur-[2px]"
              style={{ rotate: ribbonRotate }}
            />
          </motion.div>

          {/* Static Background Line */}
          <div className="absolute bottom-0 left-6 top-0 w-1 rounded-full bg-gray-300 md:left-1/2 md:w-0.5 md:-translate-x-px" />

          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-6 top-0 z-10 w-1 origin-top rounded-full bg-gradient-to-b from-violet-600 via-violet-500 to-transparent shadow-[0_0_20px_rgba(139,92,246,0.4)] md:left-1/2 md:w-0.5 md:-translate-x-px"
            style={{ height: lineHeight }}
          />

          {/* Experiences */}
          <div className="space-y-14 md:space-y-20">
            {experiences.map((exp, idx) => (
              <TimelineCard key={idx} exp={exp} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
