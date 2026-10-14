"use client";

import { useEffect, useRef } from "react";

type ShapeKind = "circle" | "square" | "triangle" | "mixed";

interface ShapeWavesProps {
  text?: string;
  fontFamily?: string;
  fontWeight?: number;
  textSize?: number;
  shapes?: ShapeKind;
  cellSize?: number;
  dotSize?: number;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  speed?: number;
  scale?: number;
  contrast?: number;
  brightness?: number;
  flow?: number;
  direction?: number;
  fade?: number;
  interactive?: boolean;
  splashRadius?: number;
  splashStrength?: number;
  glow?: number;
  intro?: boolean;
  introDuration?: number;
  paused?: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  kind: "circle" | "square" | "triangle",
  x: number,
  y: number,
  size: number
) {
  if (kind === "circle") {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === "square") {
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
  } else {
    const h = size * 0.9;
    ctx.beginPath();
    ctx.moveTo(x, y - h / 2);
    ctx.lineTo(x + h / 2, y + h / 2);
    ctx.lineTo(x - h / 2, y + h / 2);
    ctx.closePath();
    ctx.fill();
  }
}

export default function ShapeWaves({
  text = "",
  fontFamily = "system-ui, sans-serif",
  fontWeight = 600,
  textSize = 0.6,
  shapes = "mixed",
  cellSize = 8,
  dotSize = 0.6,
  color = "#84CC16",
  hoverColor = "#bad492",
  backgroundColor = "#ffffff",
  speed = 0.3,
  scale = 0.3,
  contrast = 1,
  brightness = 0.3,
  flow = 0,
  direction = 0,
  fade = 0.45,
  interactive = true,
  splashRadius = 40,
  splashStrength = 0.85,
  glow = 0.3,
  intro = true,
  introDuration = 1.6,
  paused = false,
}: ShapeWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });
  const ripplesRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const container = canvas.parentElement;
    if (!container) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mask: Uint8Array | null = null;
    let cols = 0;
    let rows = 0;

    function buildMask() {
      cols = Math.max(1, Math.floor(width / cellSize));
      rows = Math.max(1, Math.floor(height / cellSize));
      if (!text) {
        mask = null;
        return;
      }
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(width));
      off.height = Math.max(1, Math.floor(height));
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.fillStyle = "#000";
      octx.fillRect(0, 0, off.width, off.height);
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `${fontWeight} ${Math.floor(height * textSize)}px ${fontFamily}`;
      octx.fillText(text, off.width / 2, off.height / 2);
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const m = new Uint8Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = Math.min(off.width - 1, Math.floor(c * cellSize + cellSize / 2));
          const py = Math.min(off.height - 1, Math.floor(r * cellSize + cellSize / 2));
          const idx = (py * off.width + px) * 4;
          m[r * cols + c] = data[idx] > 40 ? 1 : 0;
        }
      }
      mask = m;
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildMask();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    }
    function onLeave() {
      mouseRef.current.active = false;
    }
    function onClick(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      ripplesRef.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t: 0 });
    }
    if (interactive) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
      canvas.addEventListener("click", onClick);
    }

    const bg = hexToRgb(backgroundColor);
    const fg = hexToRgb(color);
    const hoverRgb = hexToRgb(hoverColor);
    const dirRad = (direction * Math.PI) / 180;
    const shapeCycle: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];

    let raf = 0;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (paused) return;
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000;
      const introT = intro ? Math.min(1, elapsed / introDuration) : 1;

      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = backgroundColor;
      ctx!.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      ripplesRef.current = ripplesRef.current.filter((r) => r.t < 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (mask && mask[r * cols + c] === 0) continue;

          const cx = c * cellSize + cellSize / 2;
          const cy = r * cellSize + cellSize / 2;

          const wave =
            Math.sin(
              c * 0.35 * Math.cos(dirRad) +
                r * 0.35 * Math.sin(dirRad) +
                elapsed * speed * 4 +
                flow * (c + r) * 0.05
            ) *
              0.5 +
            0.5;

          let value = (wave - 0.5) * contrast + 0.5 + (brightness - 0.5);
          value = Math.max(0, Math.min(1, value));

          let heat = 0;
          if (interactive && mouse.active) {
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < splashRadius) {
              heat = Math.max(heat, (1 - dist / splashRadius) * splashStrength);
            }
          }
          for (const rip of ripplesRef.current) {
            const dx = cx - rip.x;
            const dy = cy - rip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ringR = rip.t * splashRadius * 2.2;
            const ringWidth = splashRadius * 0.6;
            const d = Math.abs(dist - ringR);
            if (d < ringWidth) {
              heat = Math.max(heat, (1 - d / ringWidth) * splashStrength * (1 - rip.t));
            }
          }

          let introFactor = 1;
          if (intro) {
            const delay = ((c + r) / (cols + rows)) * 0.6;
            introFactor = Math.max(0, Math.min(1, (introT - delay) / (1 - delay || 1)));
          }

          const finalValue = Math.min(1, value * fade + heat);
          const rgb: [number, number, number] = [
            lerp(bg[0], lerp(fg[0], hoverRgb[0], heat), finalValue),
            lerp(bg[1], lerp(fg[1], hoverRgb[1], heat), finalValue),
            lerp(bg[2], lerp(fg[2], hoverRgb[2], heat), finalValue),
          ];

          const size = cellSize * dotSize * (0.7 + value * scale + heat * 0.5) * introFactor;
          if (size <= 0.2) continue;

          ctx!.fillStyle = `rgb(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0})`;
          if (heat > 0.05 && glow > 0) {
            ctx!.shadowColor = hoverColor;
            ctx!.shadowBlur = glow * 24 * heat;
          } else {
            ctx!.shadowBlur = 0;
          }

          let kind: "circle" | "square" | "triangle" = "circle";
          if (shapes === "mixed") {
            kind = shapeCycle[(c * 7 + r * 13) % 3];
          } else if (shapes !== undefined) {
            kind = shapes as "circle" | "square" | "triangle";
          }
          drawShape(ctx!, kind, cx, cy, size);
        }
      }

      for (const rip of ripplesRef.current) {
        rip.t += 0.016 / 0.8;
      }
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (interactive) {
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
        canvas.removeEventListener("click", onClick);
      }
    };
  }, [
    text,
    fontFamily,
    fontWeight,
    textSize,
    shapes,
    cellSize,
    dotSize,
    color,
    hoverColor,
    backgroundColor,
    speed,
    scale,
    contrast,
    brightness,
    flow,
    direction,
    fade,
    interactive,
    splashRadius,
    splashStrength,
    glow,
    intro,
    introDuration,
    paused,
  ]);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
