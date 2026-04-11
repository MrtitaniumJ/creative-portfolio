/** Canonical site URL for metadata, sitemap, and robots (no trailing slash). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

/** Single source of truth for meta / OG / Twitter description copy. */
export const SITE_DESCRIPTION =
  "I build things people actually use—from first sketch to the details that survive real traffic.";

export const SITE_TITLE = "Jatin Sharma | Full-stack engineer & builder";

export const SITE_TAGLINE = "Full-stack engineer · products, mentorship, calm craft";
