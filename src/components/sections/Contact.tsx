"use client";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SECTION_Y_LAST } from "@/lib/sectionStyles";

const ease = [0.16, 1, 0.3, 1] as const;

const socialBtnClass =
  "flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:size-12 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15 dark:hover:text-violet-300";

export default function Contact() {
  return (
    <section
      id="contact"
      className={`relative z-10 w-full scroll-mt-4 overflow-x-hidden bg-linear-to-b from-background via-[#fafafa] to-background text-foreground dark:via-zinc-950/90 ${SECTION_Y_LAST}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgb(148 163 184 / 0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-8%] top-[18%] h-[min(48vw,340px)] w-[min(48vw,340px)] rounded-full bg-violet-200/16 blur-[100px] dark:bg-violet-600/12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[12%] left-[-12%] h-[min(42vw,280px)] w-[min(42vw,280px)] rounded-full bg-fuchsia-200/14 blur-[95px] dark:bg-fuchsia-600/10"
        aria-hidden
      />

      <motion.p
        className="type-watermark pointer-events-none absolute left-6 top-[30%] z-0 -translate-y-1/2 lg:left-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease }}
        aria-hidden
      >
        Contact
      </motion.p>

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-5xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto flex w-full min-w-0 max-w-5xl flex-col overflow-x-clip rounded-xl border border-slate-200/90 bg-white px-5 py-8 text-foreground shadow-[0_20px_50px_-24px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/5 sm:rounded-2xl sm:px-7 sm:py-9 md:rounded-4xl md:px-10 md:py-11 lg:px-12 lg:py-12 dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] dark:ring-white/10"
        >
          <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center text-center">
            <h2 className="type-display-title text-balance">Get in touch</h2>
            <p className="type-contact-lead mt-4 max-w-lg text-pretty sm:mt-5 md:mt-6 md:max-w-xl">
              Whether you want to collaborate, swap stories, or just say hi—drop a note. I read everything and I
              answer when I can.
            </p>

            <div className="mt-7 w-full max-w-sm sm:mt-8 md:mt-10">
              <a
                href="mailto:jkjatinsharma72@gmail.com"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-violet-600 px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:w-auto sm:min-w-48 sm:px-9 sm:py-4 md:text-lg"
              >
                <Mail className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
                Say Hello
              </a>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-9 flex w-full min-w-0 max-w-2xl flex-col items-center gap-6 border-t border-slate-200/80 pt-8 sm:mt-10 sm:gap-7 sm:pt-9 md:mt-11 md:pt-10 dark:border-white/10">
            <div className="flex items-center justify-center gap-4 sm:gap-5">
              <a
                href="https://www.linkedin.com/in/jatin-sharma-82121217a/"
                target="_blank"
                rel="noreferrer"
                className={socialBtnClass}
              >
                <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/MrtitaniumJ"
                target="_blank"
                rel="noreferrer"
                className={socialBtnClass}
              >
                <FaGithub className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
            <p className="type-footer-copy text-center">© {new Date().getFullYear()} Jatin Sharma.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
