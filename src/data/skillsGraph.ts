/** Nodes + links for the skills force graph (center → categories → skills). */

export type GraphNodeKind = "root" | "category" | "skill";

export interface GraphNodeDef {
  id: string;
  label: string;
  kind: GraphNodeKind;
  /** 0 = hub gradient; 1 = teal; 2 = amber; 3 = violet/fuchsia */
  group: number;
  radius: number;
}

export interface GraphLinkDef {
  source: string;
  target: string;
}

export const SKILLS_GRAPH_NODES: GraphNodeDef[] = [
  {
    id: "root",
    label: "My tech landscape",
    kind: "root",
    group: 0,
    radius: 54,
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    kind: "category",
    group: 1,
    radius: 36,
  },
  {
    id: "js",
    label: "JavaScript & web",
    kind: "category",
    group: 2,
    radius: 36,
  },
  {
    id: "py",
    label: "Python & AI",
    kind: "category",
    group: 3,
    radius: 36,
  },
  { id: "aws", label: "AWS", kind: "skill", group: 1, radius: 24 },
  { id: "docker", label: "Docker", kind: "skill", group: 1, radius: 24 },
  { id: "k8s", label: "Kubernetes", kind: "skill", group: 1, radius: 22 },
  { id: "vercel", label: "Vercel", kind: "skill", group: 1, radius: 22 },
  { id: "react", label: "React", kind: "skill", group: 2, radius: 24 },
  { id: "next", label: "Next.js", kind: "skill", group: 2, radius: 24 },
  { id: "ts", label: "TypeScript", kind: "skill", group: 2, radius: 24 },
  { id: "node", label: "Node.js", kind: "skill", group: 2, radius: 24 },
  { id: "python", label: "Python", kind: "skill", group: 3, radius: 24 },
  { id: "pg", label: "PostgreSQL", kind: "skill", group: 3, radius: 22 },
  { id: "django", label: "Django", kind: "skill", group: 3, radius: 22 },
  { id: "openai", label: "OpenAI", kind: "skill", group: 3, radius: 22 },
  { id: "gemini", label: "Gemini", kind: "skill", group: 3, radius: 22 },
];

export const SKILLS_GRAPH_LINKS: GraphLinkDef[] = [
  { source: "root", target: "cloud" },
  { source: "root", target: "js" },
  { source: "root", target: "py" },
  { source: "cloud", target: "aws" },
  { source: "cloud", target: "docker" },
  { source: "cloud", target: "k8s" },
  { source: "cloud", target: "vercel" },
  { source: "js", target: "react" },
  { source: "js", target: "next" },
  { source: "js", target: "ts" },
  { source: "js", target: "node" },
  { source: "py", target: "python" },
  { source: "py", target: "pg" },
  { source: "py", target: "django" },
  { source: "py", target: "openai" },
  { source: "py", target: "gemini" },
];

export function skillsGraphSummary(): string {
  return SKILLS_GRAPH_NODES.filter((n) => n.kind === "skill")
    .map((n) => n.label)
    .join(", ");
}
