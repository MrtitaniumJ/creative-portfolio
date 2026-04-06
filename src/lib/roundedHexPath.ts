import { path as pathFactory } from "d3-path";

/** Flat-top regular hexagon vertices (circumradius R). */
function hexVertices(cx: number, cy: number, R: number) {
  const verts: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 6 + (i * Math.PI) / 3;
    verts.push({ x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) });
  }
  return verts;
}

/**
 * Rounded flat-top hex path (quadratic corners), built with d3-path.
 * cornerR should be < ~35% of edge length for a regular hex of radius R.
 */
export function roundedHexPath(
  cx: number,
  cy: number,
  R: number,
  cornerR: number,
): string {
  const n = 6;
  const verts = hexVertices(cx, cy, R);
  const trim = Math.min(cornerR / Math.tan(Math.PI / 3), R * 0.32);

  const starts: { x: number; y: number }[] = [];
  const ends: { x: number; y: number }[] = [];

  for (let i = 0; i < n; i++) {
    const B = verts[i];
    const A = verts[(i + n - 1) % n];
    const C = verts[(i + 1) % n];
    const lenBA = Math.hypot(B.x - A.x, B.y - A.y) || 1;
    const lenBC = Math.hypot(C.x - B.x, C.y - B.y) || 1;
    const t1 = Math.min(trim, lenBA * 0.42);
    const t2 = Math.min(trim, lenBC * 0.42);
    starts[i] = {
      x: B.x + ((A.x - B.x) / lenBA) * t1,
      y: B.y + ((A.y - B.y) / lenBA) * t1,
    };
    ends[i] = {
      x: B.x + ((C.x - B.x) / lenBC) * t2,
      y: B.y + ((C.y - B.y) / lenBC) * t2,
    };
  }

  const p = pathFactory();
  p.moveTo(starts[0].x, starts[0].y);
  for (let i = 0; i < n; i++) {
    const B = verts[i];
    p.quadraticCurveTo(B.x, B.y, ends[i].x, ends[i].y);
    const next = (i + 1) % n;
    p.lineTo(starts[next].x, starts[next].y);
  }
  p.closePath();
  return p.toString();
}

export function skillRingProgress(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const t = (h >>> 0) / 0xffffffff;
  return 0.5 + t * 0.42;
}
