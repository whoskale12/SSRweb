import { useEffect, useRef } from "react";
import type { Feature } from "@/lib/band-assets";

/**
 * A self-contained animated pixel illustration rendered on a <canvas>.
 * Five looping scenes, one per feature — everything is drawn from coloured
 * rectangles at a tiny logical resolution and scaled up crisp (no images).
 *
 * Movement is time-driven (a single rAF clock), and the whole loop pauses for
 * users who prefer reduced motion (a single static frame is drawn instead).
 */
const W = 160;
const H = 90;

export function PixelScene({
  art,
  color,
  className,
}: {
  art: Feature["art"];
  color: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let start = 0;

    const px = (x: number, y: number, w: number, h: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    };

    const draw = (t: number) => {
      // sky
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0a1030");
      g.addColorStop(1, "#06081c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      if (art === "city") drawCity(px, color, t);
      else if (art === "combat") drawCombat(px, color, t);
      else if (art === "swap") drawSwap(px, color, t);
      else if (art === "town") drawTown(px, color, t);
      else drawCook(px, color, t);

      // local scanlines for the CRT feel
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
    };

    const loop = (now: number) => {
      if (!start) start = now;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    if (reduce) draw(0.6);
    else raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [art, color]);

  return (
    <canvas
      ref={ref}
      width={W}
      height={H}
      className={className}
      style={{ imageRendering: "pixelated", width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}

type PX = (x: number, y: number, w: number, h: number, c: string) => void;

/* ---------------- Scene: tour the world (scrolling city + train) ---------- */
function drawCity(px: PX, color: string, t: number) {
  // twinkling stars
  for (let i = 0; i < 24; i++) {
    const x = (i * 53) % W;
    const y = (i * 29) % 40;
    if (Math.sin(t * 3 + i) > 0.3) px(x, y, 1, 1, "#eaf6ff");
  }
  // two parallax skylines
  const band = (speed: number, base: number, c: string, n: number) => {
    const off = (t * speed) % 24;
    for (let i = -1; i < W / 12 + 2; i++) {
      const seed = (i * 2654435761) >>> 0;
      const h = 14 + (seed % n);
      px(i * 12 - off, H - base - h, 9, h, c);
      // lit windows
      if ((seed >> 3) % 2) px(i * 12 - off + 2, H - base - h + 3, 2, 2, color);
    }
  };
  band(6, 18, "#141a40", 28);
  band(14, 12, "#0d1336", 20);
  // ground
  px(0, H - 14, W, 14, "#06081c");
  px(0, H - 14, W, 1, color);
  // train sliding left → right, wraps around
  const tx = ((t * 40) % (W + 60)) - 60;
  px(tx, H - 26, 50, 12, color);
  px(tx + 50, H - 22, 6, 8, color); // nose
  for (let w = 0; w < 5; w++) px(tx + 4 + w * 9, H - 23, 5, 4, "#06081c"); // windows
  px(tx + 8, H - 14, 4, 3, "#141a40"); // wheels
  px(tx + 36, H - 14, 4, 3, "#141a40");
  // smoke puffs
  for (let s = 0; s < 4; s++) {
    const a = (t * 30 + s * 14) % 60;
    px(tx - 4 - a, H - 30 - a * 0.4, 3, 3, "rgba(143,166,216,0.5)");
  }
}

/* ---------------- Scene: riff or fry (two fighters clash) ----------------- */
function drawCombat(px: PX, color: string, t: number) {
  px(0, H - 16, W, 16, "#0d1336");
  const lunge = Math.sin(t * 4) * 6;
  // left fighter
  fighter(px, 36 + lunge, H - 40, color);
  // right fighter
  fighter(px, W - 36 - 16 - lunge, H - 40, "#ff2e88", true);
  // clash star in the middle, pulsing
  if (Math.sin(t * 8) > 0) {
    const cx = W / 2;
    const cy = H - 34;
    px(cx - 1, cy - 8, 2, 16, "#ffe14d");
    px(cx - 8, cy - 1, 16, 2, "#ffe14d");
    px(cx - 5, cy - 5, 3, 3, "#ffffff");
    px(cx + 2, cy + 2, 3, 3, "#ffffff");
  }
  // speed lines
  for (let i = 0; i < 6; i++) {
    const y = 14 + i * 8;
    const x = (t * 60 + i * 20) % W;
    px(x, y, 8, 1, "rgba(46,230,255,0.4)");
  }
}
function fighter(px: PX, x: number, y: number, c: string, flip = false) {
  px(x + 4, y, 8, 6, c); // head
  px(x + 2, y + 6, 12, 12, c); // body
  px(x + 5, y + 2, 2, 2, "#06081c"); // eye
  // arm + guitar/pan toward centre
  const ax = flip ? x - 6 : x + 12;
  px(ax, y + 8, 8, 3, c);
  px(flip ? ax - 4 : ax + 8, y + 6, 4, 7, "#ffe14d");
  px(x + 3, y + 18, 3, 5, "#141a40"); // legs
  px(x + 9, y + 18, 3, 5, "#141a40");
}

/* ---------------- Scene: swap the lineup (sprites switch places) ---------- */
function drawSwap(px: PX, color: string, t: number) {
  px(0, H - 16, W, 16, "#0d1336");
  const phase = (Math.sin(t * 2) + 1) / 2; // 0..1
  const ax = 30 + phase * 80;
  const bx = 110 - phase * 80;
  const hop = Math.abs(Math.sin(t * 4)) * 8;
  blob(px, ax, H - 30 - hop, color);
  blob(px, bx, H - 30 - hop, "#39ff8b");
  // swap arrows
  const ay = H - 40;
  px(W / 2 - 10, ay, 20, 1, "#8fa6d8");
  px(W / 2 + 8, ay - 2, 2, 2, "#8fa6d8");
  px(W / 2 - 10, ay + 6, 20, 1, "#8fa6d8");
  px(W / 2 - 10, ay + 4, 2, 2, "#8fa6d8");
}
function blob(px: PX, x: number, y: number, c: string) {
  px(x, y + 2, 16, 14, c);
  px(x + 2, y, 12, 4, c);
  px(x + 3, y + 5, 3, 3, "#ffffff");
  px(x + 10, y + 5, 3, 3, "#ffffff");
  px(x + 4, y + 6, 1, 1, "#06081c");
  px(x + 11, y + 6, 1, 1, "#06081c");
}

/* ---------------- Scene: small town life (house + smoke + cat) ----------- */
function drawTown(px: PX, color: string, t: number) {
  px(0, H - 16, W, 16, "#141a40");
  // house
  const hx = 54;
  const hy = H - 46;
  px(hx, hy, 52, 30, "#0d1336");
  px(hx, hy, 52, 2, color);
  // roof (stepped)
  for (let i = 0; i < 8; i++) px(hx + i * 3, hy - 2 - i * 2, 52 - i * 6, 2, color);
  px(hx + 20, hy + 12, 12, 14, "#06081c"); // door
  px(hx + 6, hy + 6, 8, 8, "#ffe14d"); // window glow
  px(hx + 38, hy + 6, 8, 8, "#ffe14d");
  // chimney + rising smoke
  px(hx + 40, hy - 16, 6, 8, "#141a40");
  for (let s = 0; s < 5; s++) {
    const a = (t * 18 + s * 12) % 60;
    const sway = Math.sin(t * 2 + s) * 4;
    px(hx + 41 + sway, hy - 18 - a, 4, 4, `rgba(143,166,216,${0.6 - a / 100})`);
  }
  // cat with twitching tail
  const cx = 28;
  const cy = H - 24;
  px(cx, cy, 10, 6, color);
  px(cx + 1, cy - 3, 2, 3, color); // ear
  px(cx + 7, cy - 3, 2, 3, color);
  const tail = Math.sin(t * 5) * 3;
  px(cx + 10, cy - 2 + tail, 2, 5, color);
}

/* ---------------- Scene: mix things up (frying pan + notes) -------------- */
function drawCook(px: PX, color: string, t: number) {
  px(0, H - 16, W, 16, "#0d1336");
  // flame flicker under the pan
  for (let i = 0; i < 7; i++) {
    const fh = 6 + ((Math.sin(t * 12 + i) + 1) / 2) * 8;
    px(W / 2 - 18 + i * 5, H - 22 - fh, 3, fh, i % 2 ? "#ff2e88" : "#ffe14d");
  }
  // pan (bowl + handle)
  px(W / 2 - 22, H - 24, 44, 5, "#283470");
  px(W / 2 - 22, H - 24, 44, 2, "#8fa6d8");
  px(W / 2 + 22, H - 23, 18, 3, "#283470");
  // ingredients/notes tossed up with gravity
  const colors = [color, "#2ee6ff", "#ffe14d", "#39ff8b"];
  for (let i = 0; i < 4; i++) {
    const cycle = (t * 1.3 + i * 0.6) % 2; // 0..2 s
    const up = Math.sin((cycle / 2) * Math.PI); // parabola 0..1..0
    const x = W / 2 - 14 + i * 9 + Math.sin(t + i) * 2;
    const y = H - 28 - up * 34;
    px(x, y, 4, 4, colors[i]);
    px(x + 1, y - 2, 1, 2, colors[i]); // little note stem
  }
}
