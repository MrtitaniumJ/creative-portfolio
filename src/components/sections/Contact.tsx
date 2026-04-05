"use client";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-4 overflow-hidden bg-background pb-28 pt-14 md:pb-32 md:pt-16"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 lg:p-16 bg-white text-foreground border border-gray-200 relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>

          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 relative z-10 tracking-tight text-gray-900">
            Let&apos;s Build Something.
          </h2>
          <p className="text-slate-600 font-sans text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
            I am currently open for opportunities, collaborations, or just a chat
            about the future of the web, AI, and enterprise automation.
          </p>

          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <a
              href="mailto:jkjatinsharma72@gmail.com"
              className="flex items-center gap-3 px-10 py-5 bg-violet-600 text-white rounded-full font-bold hover:bg-violet-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-violet-500/50 text-lg"
            >
              <Mail className="w-5 h-5" /> Say Hello
            </a>
          </div>

          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
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

            <div className="text-sm font-sans font-medium text-slate-500 tracking-wider">
              © {new Date().getFullYear()} Jatin Sharma.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
