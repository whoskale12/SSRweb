import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { story, pixelSprite, NEON } from "@/lib/band-assets";
import { Reveal } from "./Reveal";

// A drifting pixel skyline drawn purely from CSS-positioned blocks — no images.
const skyline = Array.from({ length: 22 }, (_, i) => {
  let s = (i * 2654435761) >>> 0 || 1;
  s ^= s << 13;
  s >>>= 0;
  s ^= s >> 17;
  const h = 20 + (s % 70);
  return { h, w: 14 + (s % 18) };
});

const storyBuddy = pixelSprite(42, NEON.purple);

/**
 * "Sometime in the near-future..." — Eastward's story beat, retold for the band.
 * Two parallax layers (a scrolling neon skyline + drifting buddy) sit behind the
 * narrative copy and shift as the section passes the viewport.
 */
export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const skylineX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const buddyY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  return (
    <section
      ref={ref}
      id="story"
      className="relative overflow-hidden bg-ink px-4 py-28"
    >
      {/* parallax skyline */}
      <motion.div
        style={{ x: skylineX }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 opacity-40"
        aria-hidden
      >
        {skyline.map((b, i) => (
          <div
            key={i}
            className="bg-[var(--neon-purple)]"
            style={{
              height: `${b.h}px`,
              width: `${b.w}px`,
              boxShadow: "0 0 8px var(--neon-purple)",
            }}
          />
        ))}
      </motion.div>

      {/* drifting pixel buddy */}
      <motion.img
        src={storyBuddy}
        alt=""
        aria-hidden
        style={{ y: buddyY }}
        className="pixelated pointer-events-none absolute right-[8%] top-1/2 hidden h-24 w-24 md:block"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="mb-4 inline-block border-2 border-neon-purple bg-card px-4 py-2 font-pixel text-[10px] tracking-wider text-neon-purple shadow-[3px_3px_0_0_var(--background)]">
            {story.kicker}
          </div>
          <h2 className="font-display text-xl text-foreground drop-shadow-[3px_3px_0_var(--neon-purple)] md:text-3xl">
            {story.heading}
          </h2>
        </Reveal>

        <div className="mt-10 space-y-6">
          {story.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="font-mono-retro text-2xl leading-relaxed text-foreground/85">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <p className="mt-10 font-pixel text-[10px] tracking-widest text-neon-cyan">
            {story.signature}
          </p>
        </Reveal>

        {/* Navigation CTA */}
        <Reveal delay={0.6}>
          <div className="mt-16 text-center">
            <a
              href="/albums"
              className="pixel-btn"
              style={{
                background: "var(--neon-cyan)",
                color: "var(--foreground)",
              }}
            >
              ▶ ALBUM STORIES
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
