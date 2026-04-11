"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {
  Home,
  User,
  Briefcase,
  Code2,
  FolderKanban,
  Mail,
} from "lucide-react";

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "projects", icon: FolderKanban, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
] as const;

type NavId = (typeof navItems)[number]["id"];

export default function FloatingDock() {
  const [activeId, setActiveId] = useState<NavId>("hero");

  const updateActive = useCallback(() => {
    const threshold = Math.min(window.innerHeight * 0.32, 280);
    let current: NavId = "hero";
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= threshold) current = item.id;
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    let raf = 0;
    raf = requestAnimationFrame(() => {
      updateActive();
    });
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="fixed bottom-6 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1.5 overflow-x-auto rounded-full border border-slate-300/90 bg-white/95 px-2.5 py-2 shadow-[0_14px_44px_-10px_rgba(15,23,42,0.22),0_0_0_1px_rgba(15,23,42,0.06)] ring-2 ring-white/80 backdrop-blur-xl md:gap-2 md:px-4 md:py-2.5 dark:border-white/10 dark:bg-zinc-900/90 dark:shadow-[0_14px_44px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] dark:ring-zinc-800/80"
    >
      {navItems.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleScroll(item.id)}
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            className={`group relative shrink-0 rounded-full p-2.5 transition-[color,background-color,box-shadow,transform] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 md:p-3 ${
              isActive
                ? "bg-linear-to-br from-violet-600 to-fuchsia-600 text-white shadow-[0_6px_20px_-4px_rgba(124,58,237,0.55)] ring-2 ring-violet-400/35"
                : "text-slate-600 hover:bg-slate-100 hover:text-violet-700 active:scale-[0.97]"
            }`}
          >
            <item.icon
              className={`h-5 w-5 transition-colors ${
                isActive ? "text-white" : "text-slate-600 group-hover:text-violet-600 dark:text-slate-400 dark:group-hover:text-violet-300"
              }`}
            />
            <span className="pointer-events-none absolute -top-11 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 opacity-0 shadow-md ring-1 ring-slate-900/5 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-white/10 dark:bg-zinc-800 dark:text-slate-100 dark:ring-white/10">
              {item.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}
