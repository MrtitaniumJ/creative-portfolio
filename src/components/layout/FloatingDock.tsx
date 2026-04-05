"use client";

import { motion } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Layers,
  FolderKanban,
  Mail,
} from "lucide-react";

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "skills", icon: Layers, label: "Skills" },
  { id: "projects", icon: FolderKanban, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export default function FloatingDock() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="fixed bottom-6 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-full border border-gray-200 bg-white/70 px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl md:gap-3 md:px-5 md:py-3"
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => handleScroll(item.id)}
          aria-label={item.label}
          className="group relative shrink-0 rounded-full p-2.5 transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 md:p-3"
        >
          <item.icon className="h-5 w-5 text-slate-500 transition-colors group-hover:text-violet-600" />
          <span className="pointer-events-none absolute -top-11 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-200 bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            {item.label}
          </span>
        </button>
      ))}
    </motion.div>
  );
}
