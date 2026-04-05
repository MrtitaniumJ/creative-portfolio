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
      <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-transparent pb-28 md:pb-32">
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
