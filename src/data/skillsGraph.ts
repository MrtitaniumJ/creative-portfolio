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
    label: "How I ship",
    kind: "root",
    group: 0,
    radius: 54,
  },
  {
    id: "cloud",
    label: "Cloud & delivery",
    kind: "category",
    group: 1,
    radius: 36,
  },
  {
    id: "js",
    label: "TypeScript & APIs",
    kind: "category",
    group: 2,
    radius: 36,
  },
  {
    id: "py",
    label: "AI & data",
    kind: "category",
    group: 3,
    radius: 36,
  },
  { id: "aws", label: "AWS", kind: "skill", group: 1, radius: 24 },
  { id: "docker", label: "Docker", kind: "skill", group: 1, radius: 24 },
  { id: "cicd", label: "CI/CD", kind: "skill", group: 1, radius: 22 },
  { id: "s3", label: "S3", kind: "skill", group: 1, radius: 22 },
  { id: "react", label: "React", kind: "skill", group: 2, radius: 24 },
  { id: "next", label: "Next.js", kind: "skill", group: 2, radius: 24 },
  { id: "ts", label: "TypeScript", kind: "skill", group: 2, radius: 24 },
  { id: "express", label: "Express", kind: "skill", group: 2, radius: 24 },
  { id: "python", label: "Python", kind: "skill", group: 3, radius: 24 },
  { id: "pg", label: "PostgreSQL", kind: "skill", group: 3, radius: 22 },
  { id: "mongo", label: "MongoDB", kind: "skill", group: 3, radius: 22 },
  { id: "selenium", label: "Selenium", kind: "skill", group: 3, radius: 22 },
  { id: "gemini", label: "Gemini", kind: "skill", group: 3, radius: 22 },
];

export const SKILLS_GRAPH_LINKS: GraphLinkDef[] = [
  { source: "root", target: "cloud" },
  { source: "root", target: "js" },
  { source: "root", target: "py" },
  { source: "cloud", target: "aws" },
  { source: "cloud", target: "docker" },
  { source: "cloud", target: "cicd" },
  { source: "cloud", target: "s3" },
  { source: "js", target: "react" },
  { source: "js", target: "next" },
  { source: "js", target: "ts" },
  { source: "js", target: "express" },
  { source: "py", target: "python" },
  { source: "py", target: "pg" },
  { source: "py", target: "mongo" },
  { source: "py", target: "selenium" },
  { source: "py", target: "gemini" },
];

export function skillsGraphSummary(): string {
  return SKILLS_GRAPH_NODES.filter((n) => n.kind === "skill")
    .map((n) => n.label)
    .join(", ");
}
