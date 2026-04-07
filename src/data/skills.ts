/** Flat skill labels (no categories) — merged from former bento groups, deduped. */
export const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "REST",
  "JWT",
  "Python",
  "AWS",
  "Docker",
  "CI/CD",
  "Selenium",
  "Gemini",
  "Jest",
  "Stripe",
] as const;

export type SkillLabel = (typeof SKILLS)[number];
