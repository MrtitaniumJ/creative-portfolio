"use client";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex w-full max-w-full flex-col items-center overflow-x-clip bg-background px-4 pt-10 pb-0 sm:px-6 md:px-8 md:pt-14 lg:px-12"
    >
      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-h-[min(calc(100svh-6.5rem),calc(100dvh-6.5rem))] max-w-5xl overflow-x-hidden overflow-y-auto overscroll-y-contain rounded-2xl border border-gray-200 bg-white p-5 text-center text-foreground shadow-lg sm:p-7 md:rounded-[2.5rem] md:p-10 lg:p-12"
        >
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 rounded-full bg-violet-200/30 blur-[100px] md:h-96 md:w-96"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-200/20 blur-[100px] md:h-96 md:w-96"></div>

          <h2 className="type-display-title relative z-10">
            Get in touch
          </h2>
          <p className="type-contact-lead relative z-10 mx-auto mt-4 max-w-2xl sm:mt-5 md:mt-6">
            Whether you want to collaborate, swap stories, or just say hi—drop a note. I read everything and I
            answer when I can.
          </p>

          <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-4 sm:mt-8 md:mt-10">
            <a
              href="mailto:jkjatinsharma72@gmail.com"
              className="flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 text-base font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/50 sm:gap-3 sm:px-9 sm:py-4 md:px-10 md:py-5 md:text-lg"
            >
              <Mail className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" /> Say Hello
            </a>
          </div>

          <div className="relative z-10 mt-8 flex flex-col items-center gap-5 border-t border-slate-200/80 pt-8 sm:mt-10 sm:gap-6 sm:pt-9 md:mt-12 md:flex-row md:justify-between md:pt-10">
            <div className="flex items-center gap-4 text-slate-600 bg-gray-100 px-6 py-3 rounded-full">
              <Phone className="w-4 h-4" />
              <span className="font-semibold tracking-wider text-sm">+91 6367807635</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/jatin-sharma-82121217a/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-violet-600 transition-colors bg-gray-100 p-3 rounded-full hover:bg-gray-200"
              >
                <FaLinkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/MrtitaniumJ"
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-violet-600 transition-colors bg-gray-100 p-3 rounded-full hover:bg-gray-200"
              >
                <FaGithub className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>

            <div className="type-footer-copy">
              © {new Date().getFullYear()} Jatin Sharma.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
