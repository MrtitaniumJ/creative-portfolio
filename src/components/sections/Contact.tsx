"use client";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/** Same inset on all sides; outer grid splits leftover space evenly around the card. */
const CONTACT_INSET = "clamp(1.25rem,5vmin,5rem)";

const socialBtnClass =
  "flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:size-12";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative box-border grid min-h-dvh w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_minmax(0,min(100%,64rem))_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-0 overflow-x-clip bg-background"
      style={{ padding: CONTACT_INSET } as React.CSSProperties}
    >
      <div className="col-start-2 row-start-2 min-h-0 w-full min-w-0 max-w-full self-center justify-self-stretch">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto flex w-full min-w-0 max-w-full max-h-[min(88svh,52rem)] flex-col overflow-x-clip overflow-y-auto overscroll-y-contain rounded-xl border border-slate-200/90 bg-white px-5 py-8 text-foreground shadow-[0_20px_50px_-24px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/5 sm:rounded-2xl sm:px-7 sm:py-9 md:max-h-[min(90dvh,56rem)] md:rounded-4xl md:px-10 md:py-11 lg:px-12 lg:py-12"
        >
          <div
            className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-1/4 -translate-y-1/4 rounded-full bg-violet-200/30 blur-[80px] sm:h-56 sm:w-56 md:h-72 md:w-72 md:blur-[100px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-200/20 blur-[80px] sm:h-56 sm:w-56 md:h-72 md:w-72 md:blur-[100px]"
            aria-hidden
          />

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

          <div className="relative z-10 mx-auto mt-9 flex w-full min-w-0 max-w-2xl flex-col items-center gap-6 border-t border-slate-200/80 pt-8 sm:mt-10 sm:gap-7 sm:pt-9 md:mt-11 md:pt-10">
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
