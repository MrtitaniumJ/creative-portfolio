/** Flat skill labels (no categories) — merged from former bento groups, deduped. */
export const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "REST",
  "JWT",
  "Python",
  "AWS",
  "Docker",
  "CI/CD",
  "Vercel",
  "OpenAI",
  "Gemini",
  "Lang patterns",
  "RAG basics",
] as const;

export type SkillLabel = (typeof SKILLS)[number];
