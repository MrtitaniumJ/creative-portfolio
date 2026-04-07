"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  SKILLS_GRAPH_LINKS,
  SKILLS_GRAPH_NODES,
  skillsGraphSummary,
  type GraphNodeDef,
} from "@/data/skillsGraph";
import { layoutSkillLabel } from "@/components/d3/skillLabelLayout";

type SimNode = d3.SimulationNodeDatum &
  GraphNodeDef & {
    skillLines?: string[];
    skillFontSize?: number;
  };

const GROUP = {
  fill: ["url(#hubGrad)", "#0d9488", "#ea580c", "#a21caf"] as const,
  stroke: ["#5b21b6", "#0f766e", "#c2410c", "#86198f"] as const,
  link: ["#94a3b8", "#2dd4bf", "#fb923c", "#e879f9"] as const,
  skillFill: ["url(#skillGrad1)", "url(#skillGrad2)", "url(#skillGrad3)"] as const,
};

function cloneNodes(): SimNode[] {
  return SKILLS_GRAPH_NODES.map((n) => ({ ...n })) as SimNode[];
}

function cloneLinks() {
  return SKILLS_GRAPH_LINKS.map((l) => ({ ...l }));
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/** Viewport width → scale for hub/category radii and skill label bounds. */
function layoutScaleForWidth(w: number) {
  if (w < 360) return 0.5;
  if (w < 400) return 0.56;
  if (w < 480) return 0.66;
  if (w < 560) return 0.78;
  if (w < 640) return 0.85;
  if (w < 720) return 0.92;
  return 1;
}

function graphHeightForWidth(w: number, vh: number) {
  // Taller canvas in portrait so the graph spreads vertically instead of clipping horizontally.
  const aspect = w < 400 ? 1.22 : w < 640 ? 1.02 : 0.78;
  const minH = w < 360 ? 300 : w < 480 ? 340 : 460;
  const maxH = w < 400 ? 560 : w < 640 ? 620 : 720;
  let h = Math.round(clamp(w * aspect, minH, maxH));
  h = Math.min(h, Math.round(vh * 0.82));
  return Math.max(h, w < 400 ? 280 : 300);
}

function addSkillGradients(defs: d3.Selection<SVGDefsElement, unknown, null, undefined>) {
  const pairs: [string, string, string][] = [
    ["skillGrad1", "#5eead4", "#0f766e"],
    ["skillGrad2", "#fdba74", "#c2410c"],
    ["skillGrad3", "#e879f9", "#86198f"],
  ];
  pairs.forEach(([id, a, b]) => {
    const lg = defs
      .append("linearGradient")
      .attr("id", id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    lg.append("stop").attr("offset", "0%").attr("stop-color", a);
    lg.append("stop").attr("offset", "100%").attr("stop-color", b);
  });
}

export default function SkillsForceGraph({ reduceMotion }: { reduceMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<d3.Simulation<SimNode, undefined> | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measureCanvas = document.createElement("canvas");

    const run = () => {
      simRef.current?.stop();
      d3.select(el).selectAll("*").remove();

      const width = Math.max(1, Math.round(el.getBoundingClientRect().width));
      if (width < 48) return;
      const vh =
        typeof window !== "undefined" ? Math.max(320, window.visualViewport?.height ?? window.innerHeight) : 800;
      const height = graphHeightForWidth(width, vh);
      const layoutScale = layoutScaleForWidth(width);
      const narrow = width < 400;
      const compact = width < 640;
      /** Scale + pan entire graph so it stays inside the SVG (fixes mobile clipping). */
      const useFit = width < 640;

      const nodes = cloneNodes();
      const links = cloneLinks();

      for (const n of nodes) {
        if (n.kind === "root" || n.kind === "category") {
          const floor = n.kind === "root" ? 30 : 24;
          n.radius = Math.max(floor, Math.round(n.radius * layoutScale));
        }
      }

      const skillPad = Math.max(7, Math.round(11 * layoutScale));
      const skillMinR = Math.max(16, Math.round(20 * layoutScale));
      const skillMaxR = Math.max(24, Math.round((narrow ? 40 : 48) * layoutScale));

      for (const n of nodes) {
        if (n.kind === "skill") {
          const lay = layoutSkillLabel(n.label, measureCanvas, {
            pad: skillPad,
            minR: skillMinR,
            maxR: skillMaxR,
          });
          n.radius = lay.radius;
          n.skillLines = lay.lines;
          n.skillFontSize = lay.fontSize;
        }
      }

      const cx = width / 2;
      const cy = height / 2;
      const root = nodes.find((n) => n.id === "root");
      const categories = nodes.filter((n) => n.kind === "category");
      if (root) {
        root.x = cx;
        root.y = cy;
      }
      const ringR = Math.min(width, height) * (narrow ? 0.075 : compact ? 0.11 : 0.15);
      categories.forEach((n, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / categories.length;
        n.x = cx + Math.cos(a) * ringR;
        n.y = cy + Math.sin(a) * ringR;
      });
      const skillJitter = narrow ? 10 : compact ? 16 : 22;
      const skillBase = narrow ? 14 : compact ? 20 : 28;
      nodes
        .filter((n) => n.kind === "skill")
        .forEach((n) => {
          const cat = links.find((l) => l.target === n.id)?.source as string | undefined;
          const parent = nodes.find((p) => p.id === cat);
          const angle = Math.random() * Math.PI * 2;
          const dist = (parent?.radius ?? 36) + n.radius + skillBase + Math.random() * skillJitter;
          n.x = (parent?.x ?? cx) + Math.cos(angle) * dist;
          n.y = (parent?.y ?? cy) + Math.sin(angle) * dist;
        });

      const charge = narrow ? -180 : compact ? -260 : width < 900 ? -360 : -420;
      const rootLinkD = Math.round(narrow ? 72 : compact ? 88 : 102);
      const collidePad = narrow ? 5 : compact ? 6 : 8;
      const linkW = narrow ? 1.5 : compact ? 1.75 : 2;

      const svg = d3
        .select(el)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", height)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr(
          "class",
          `select-none max-h-[78dvh] w-full max-w-full sm:max-h-[720px] ${useFit ? "overflow-hidden" : "overflow-visible"}`,
        )
        .attr("role", "img")
        .attr(
          "aria-label",
          `Interactive skill graph. Technologies include ${skillsGraphSummary()}.`,
        );

      const defs = svg.append("defs");
      addSkillGradients(defs);

      const grad = defs
        .append("linearGradient")
        .attr("id", "hubGrad")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
      grad.append("stop").attr("offset", "0%").attr("stop-color", "#7c3aed");
      grad.append("stop").attr("offset", "55%").attr("stop-color", "#c026d3");
      grad.append("stop").attr("offset", "100%").attr("stop-color", "#4f46e5");

      defs
        .append("filter")
        .attr("id", "skillTextShadow")
        .attr("x", "-40%")
        .attr("y", "-40%")
        .attr("width", "180%")
        .attr("height", "180%")
        .append("feDropShadow")
        .attr("dx", 0)
        .attr("dy", 1.2)
        .attr("stdDeviation", 1.4)
        .attr("flood-color", "#0f172a")
        .attr("flood-opacity", 0.45);

      defs
        .append("filter")
        .attr("id", "nodeGlow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%")
        .append("feDropShadow")
        .attr("dx", 0)
        .attr("dy", 4)
        .attr("stdDeviation", 6)
        .attr("flood-color", "#6366f1")
        .attr("flood-opacity", 0.35);

      const linkGroup = (d: d3.SimulationLinkDatum<SimNode>) => {
        const s = d.source as SimNode | string;
        const t = d.target as SimNode | string;
        const ns = typeof s === "string" ? nodes.find((x) => x.id === s) : s;
        const nt = typeof t === "string" ? nodes.find((x) => x.id === t) : t;
        if (ns?.kind === "root") return nt?.group ?? 0;
        if (nt?.kind === "root") return ns?.group ?? 0;
        return ns?.group ?? 1;
      };

      let bboxMidX = cx;
      let bboxMidY = cy;
      let fitScale = 1;
      const fitPad = useFit ? (narrow ? 10 : 14) : 0;

      const fitWrap = svg.append("g").attr("class", "graph-fit");

      const updateFitTransform = () => {
        if (!useFit) {
          fitWrap.attr("transform", null);
          bboxMidX = cx;
          bboxMidY = cy;
          fitScale = 1;
          return;
        }
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const d of nodes) {
          const x = d.x ?? 0;
          const y = d.y ?? 0;
          const r = d.radius + 8;
          minX = Math.min(minX, x - r);
          maxX = Math.max(maxX, x + r);
          minY = Math.min(minY, y - r);
          maxY = Math.max(maxY, y + r);
        }
        const bw = Math.max(maxX - minX, 72);
        const bh = Math.max(maxY - minY, 72);
        bboxMidX = (minX + maxX) / 2;
        bboxMidY = (minY + maxY) / 2;
        const sx = (width - 2 * fitPad) / bw;
        const sy = (height - 2 * fitPad) / bh;
        fitScale = clamp(Math.min(sx, sy), 0.3, 1);
        fitWrap.attr(
          "transform",
          `translate(${width / 2},${height / 2}) scale(${fitScale}) translate(${-bboxMidX},${-bboxMidY})`,
        );
      };

      const gLinks = fitWrap.append("g").attr("class", "links").attr("stroke-linecap", "round");

      const linkSel = gLinks
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", linkW)
        .attr("opacity", 0.78)
        .attr("stroke", (d) => GROUP.link[linkGroup(d)] ?? GROUP.link[0]);

      const drag = (simulation: d3.Simulation<SimNode, undefined>) => {
        const dragGroup = (event: d3.D3DragEvent<SVGGElement, SimNode, SimNode>) => {
          const t = event.sourceEvent?.target;
          if (!(t instanceof Element)) return null;
          return t.closest("g") as SVGGElement | null;
        };

        const svgEl = svg.node() as SVGSVGElement | null;

        const dragstarted = (
          event: d3.D3DragEvent<SVGGElement, SimNode, SimNode>,
          d: SimNode,
        ) => {
          if (!event.active) simulation.alphaTarget(0.38).restart();
          d.fx = d.x;
          d.fy = d.y;
          const gEl = dragGroup(event);
          if (gEl) d3.select(gEl).style("cursor", "grabbing");
        };
        const dragged = (event: d3.D3DragEvent<SVGGElement, SimNode, SimNode>, d: SimNode) => {
          if (useFit && svgEl) {
            const src = (event.sourceEvent ?? event) as unknown as Parameters<typeof d3.pointer>[0];
            const [px, py] = d3.pointer(src, svgEl);
            d.fx = bboxMidX + (px - width / 2) / fitScale;
            d.fy = bboxMidY + (py - height / 2) / fitScale;
          } else {
            d.fx = event.x;
            d.fy = event.y;
          }
        };
        const dragended = (
          event: d3.D3DragEvent<SVGGElement, SimNode, SimNode>,
          d: SimNode,
        ) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
          const gEl = dragGroup(event);
          if (gEl) d3.select(gEl).style("cursor", "grab");
        };
        return d3
          .drag<SVGGElement, SimNode>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      };

      const simulation = d3
        .forceSimulation<SimNode>(nodes)
        .force(
          "link",
          d3
            .forceLink<SimNode, d3.SimulationLinkDatum<SimNode>>(links)
            .id((d) => d.id)
            .distance((d) => {
              const a = d.source as SimNode;
              const b = d.target as SimNode;
              if (a.kind === "root" || b.kind === "root") return rootLinkD;
              const extra = narrow ? 16 : compact ? 19 : 22;
              return (a.radius + b.radius) * (narrow ? 0.82 : 0.9) + extra;
            })
            .strength(narrow ? 0.92 : 0.88),
        )
        .force("charge", d3.forceManyBody().strength(charge))
        .force("center", d3.forceCenter(cx, cy))
        .force(
          "collide",
          d3.forceCollide<SimNode>().radius((d) => d.radius + collidePad),
        )
        .velocityDecay(narrow ? 0.58 : 0.52);

      simRef.current = simulation;

      const dragBehavior = drag(simulation);

      const nodeG = fitWrap
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("cursor", "grab")
        .call(dragBehavior as never);

      nodeG.each(function (d) {
        const g = d3.select(this);
        g.append("title").text(d.label);

        if (d.kind === "root") {
          g.append("circle")
            .attr("class", "pointer-events-none")
            .attr("r", d.radius + (narrow ? 12 : compact ? 15 : 18))
            .attr("fill", "url(#hubGrad)")
            .attr("opacity", 0.22);
        }

        const shape = g
          .append("circle")
          .attr("class", "graph-node-shape")
          .attr("r", d.radius)
          .attr("stroke", GROUP.stroke[d.group] ?? GROUP.stroke[0])
          .attr("stroke-width", d.kind === "root" ? 2.75 : d.kind === "skill" ? 2.25 : 2)
          .style("transition", "filter 0.2s ease");

        if (d.kind === "skill") {
          const gi = Math.max(0, Math.min(2, d.group - 1));
          shape
            .attr("fill", GROUP.skillFill[gi])
            .style("filter", "url(#nodeGlow)")
            .attr("opacity", 0.98);
        } else {
          shape
            .attr("fill", GROUP.fill[d.group] ?? GROUP.fill[0])
            .style("filter", d.kind === "root" ? "url(#nodeGlow)" : "none");
        }

        const catFs = d.label.length > 15 ? 7.5 : 8.5;
        const fs =
          d.kind === "category"
            ? clamp(catFs * (narrow ? 0.88 : compact ? 0.94 : 1), 6.5, 9.5)
            : d.kind === "root"
              ? clamp(10 * (narrow ? 0.82 : compact ? 0.9 : 1), 7.5, 11)
              : 11;

        if (d.kind === "root") {
          const lines = d.label.split(" ");
          const mid = Math.ceil(lines.length / 2);
          const l1 = lines.slice(0, mid).join(" ");
          const l2 = lines.slice(mid).join(" ");
          const tg = g
            .append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "#ffffff")
            .attr("font-weight", "700")
            .attr("font-family", "var(--font-sans), system-ui, sans-serif")
            .attr("letter-spacing", "0.06em")
            .style("text-transform", "uppercase")
            .style("font-size", `${fs}px`)
            .style("pointer-events", "none");
          tg.append("tspan").attr("x", 0).attr("dy", "-0.55em").text(l1.toUpperCase());
          tg.append("tspan").attr("x", 0).attr("dy", "1.15em").text(l2.toUpperCase());
        } else if (d.kind === "category") {
          const upper = d.label.toUpperCase();
          const amp = upper.includes(" & ");
          const catText = g
            .append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "#ffffff")
            .attr("font-weight", "600")
            .attr("font-family", "var(--font-mono), ui-monospace, monospace")
            .attr("letter-spacing", "0.04em")
            .style("font-size", `${fs}px`)
            .style("pointer-events", "none");
          if (amp) {
            const [a, b] = upper.split(/\s+&\s+/, 2);
            catText.append("tspan").attr("x", 0).attr("dy", "-0.42em").text(`${a} &`);
            catText.append("tspan").attr("x", 0).attr("dy", "1.05em").text(b);
          } else {
            catText.attr("dominant-baseline", "central").style("text-transform", "uppercase").text(upper);
          }
        } else {
          const lines = d.skillLines ?? [d.label];
          const fontPx = d.skillFontSize ?? 10;
          const textEl = g
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "rgba(255,255,255,0.97)")
            .attr("font-weight", "600")
            .attr("font-family", "var(--font-sans), system-ui, sans-serif")
            .attr("letter-spacing", "0.02em")
            .style("font-size", `${fontPx}px`)
            .style("pointer-events", "none")
            .style("filter", "url(#skillTextShadow)");
          const lh = 1.14;
          lines.forEach((line, i) => {
            textEl
              .append("tspan")
              .attr("x", 0)
              .attr(
                "dy",
                i === 0 ? `${-((lines.length - 1) / 2) * lh}em` : `${lh}em`,
              )
              .text(line);
          });
        }
      });

      nodeG
        .on("mouseenter", function (_e, d) {
          d3.select(this)
            .select(".graph-node-shape")
            .interrupt()
            .transition()
            .duration(160)
            .ease(d3.easeCubicOut)
            .attr("r", d.radius * 1.07)
            .attr("stroke-width", d.kind === "skill" ? 3 : d.kind === "root" ? 3.1 : 2.6)
            .style("filter", "url(#nodeGlow) drop-shadow(0 0 12px rgba(139,92,246,0.45))");
        })
        .on("mouseleave", function (_e, d) {
          const sw = d.kind === "root" ? 2.75 : d.kind === "skill" ? 2.25 : 2;
          d3.select(this)
            .select(".graph-node-shape")
            .interrupt()
            .transition()
            .duration(260)
            .ease(d3.easeCubicOut)
            .attr("r", d.radius)
            .attr("stroke-width", sw)
            .style(
              "filter",
              d.kind === "skill" || d.kind === "root" ? "url(#nodeGlow)" : "none",
            );
        });

      const linkEnd = (e: SimNode | string): SimNode =>
        typeof e === "string" ? nodes.find((n) => n.id === e)! : e;

      const tick = () => {
        linkSel
          .attr("x1", (d) => linkEnd(d.source as SimNode | string).x ?? 0)
          .attr("y1", (d) => linkEnd(d.source as SimNode | string).y ?? 0)
          .attr("x2", (d) => linkEnd(d.target as SimNode | string).x ?? 0)
          .attr("y2", (d) => linkEnd(d.target as SimNode | string).y ?? 0);

        nodeG.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);

        updateFitTransform();
      };

      const settleTicks = narrow ? 540 : compact ? 500 : 480;
      if (reduceMotion) {
        simulation.stop();
        simulation.alpha(1);
        for (let i = 0; i < settleTicks; i += 1) simulation.tick();
        tick();
        simulation.alpha(0);
      }

      simulation.on("tick", tick);
    };

    run();
    const ro = new ResizeObserver(() => run());
    ro.observe(el);
    const vv = window.visualViewport;
    const onVvResize = () => run();
    vv?.addEventListener("resize", onVvResize);
    return () => {
      vv?.removeEventListener("resize", onVvResize);
      ro.disconnect();
      simRef.current?.stop();
      d3.select(el).selectAll("*").remove();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full min-w-0 max-w-5xl touch-manipulation overflow-hidden rounded-xl border border-slate-200/70 bg-linear-to-b from-white/65 via-white/45 to-slate-50/40 px-1.5 py-4 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-6 md:px-5 md:py-7"
      style={{ touchAction: "pan-y" }}
    />
  );
}
