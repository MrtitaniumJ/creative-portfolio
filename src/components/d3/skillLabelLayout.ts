/** Fit skill label(s) in a circle using canvas text metrics (client-only). */

const FONT_WEIGHT = 600;
const FAMILY = "ui-sans-serif, system-ui, sans-serif, var(--font-sans)";

export interface SkillLabelLayout {
  lines: string[];
  fontSize: number;
  radius: number;
}

export interface SkillLayoutOpts {
  minR?: number;
  maxR?: number;
  pad?: number;
}

function measureLine(ctx: CanvasRenderingContext2D, text: string, fontSize: number): number {
  ctx.font = `${FONT_WEIGHT} ${fontSize}px ${FAMILY}`;
  return ctx.measureText(text).width;
}

function tryFit(
  lines: string[],
  pad: number,
  minR: number,
  maxR: number,
  canvas: HTMLCanvasElement,
): SkillLabelLayout {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { lines, fontSize: 9, radius: minR };
  let best: SkillLabelLayout = { lines, fontSize: 7, radius: maxR };
  for (let fs = 11.5; fs >= 6.75; fs -= 0.5) {
    const widths = lines.map((l) => measureLine(ctx, l, fs));
    const wMax = Math.max(0, ...widths);
    const lineGap = fs * 0.15;
    const h = lines.length * fs + (lines.length - 1) * lineGap;
    const need = Math.hypot(wMax / 2, h / 2) + pad;
    const r = Math.min(maxR, Math.max(minR, Math.ceil(need)));
    best = { lines, fontSize: fs, radius: r };
    if (wMax <= 2 * (r - pad) - 1 && h <= 2 * (r - pad) - 1) {
      return best;
    }
  }
  return best;
}

/**
 * Long labels → two lines (word break preferred), then shrink font until it fits.
 */
export function layoutSkillLabel(
  label: string,
  canvas: HTMLCanvasElement,
  opts?: SkillLayoutOpts,
): SkillLabelLayout {
  const pad = opts?.pad ?? 12;
  const minR = opts?.minR ?? 24;
  const maxR = opts?.maxR ?? 50;

  const single = tryFit([label], pad, minR, maxR, canvas);
  if (single.fontSize >= 8) return single;

  let lines: string[] = [label];
  if (label.length > 9) {
    const space = label.lastIndexOf(" ", Math.min(14, label.length - 1));
    if (space > 2) {
      lines = [label.slice(0, space), label.slice(space + 1).trim()];
    } else {
      const dot = label.indexOf(".");
      if (dot > 0 && dot < label.length - 1) {
        lines = [label.slice(0, dot + 1), label.slice(dot + 1).trim()];
      } else {
        const mid = Math.ceil(label.length / 2);
        lines = [label.slice(0, mid), label.slice(mid)];
      }
    }
  }

  return tryFit(lines, pad, minR, maxR, canvas);
}
