import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { ScrollProgressProvider } from "@/components/layout/ScrollProgressContext";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";

export default function Home() {
  return (
    <ScrollProgressProvider>
      <ScrollProgressBar />
      <main
        id="main-content"
        className="relative flex w-full max-w-full flex-col overflow-x-hidden bg-transparent pb-0"
      >
        <Hero />
        <AboutMe />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </ScrollProgressProvider>
  );
}
