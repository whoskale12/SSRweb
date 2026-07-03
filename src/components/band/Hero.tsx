import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  heroLayers,
  members,
  BAND_NAME,
  BAND_TAGLINE,
} from "@/lib/band-assets";
import { AbxyCluster } from "@/components/band/JoyCon";

// Scattered character sprite positions (% of container) — one per band member.
// Adjusted for better mobile spacing: moved higher + more spread out
const charPositions = [
  {
    left: "0%",
    bottom: "18%",
    size: "16vh",
    sizeDesktop: "28vh",
    rotate: -6,
    delay: 0,
  },
  {
    left: "18%",
    bottom: "15%",
    size: "17vh",
    sizeDesktop: "34vh",
    rotate: 3,
    delay: 0.12,
  },
  {
    left: "38%",
    bottom: "20%",
    size: "16vh",
    sizeDesktop: "30vh",
    rotate: -2,
    delay: 0.24,
  },
  {
    right: "17%",
    bottom: "16%",
    size: "17vh",
    sizeDesktop: "34vh",
    rotate: 4,
    delay: 0.36,
  },
  {
    right: "0%",
    bottom: "19%",
    size: "16vh",
    sizeDesktop: "28vh",
    rotate: 6,
    delay: 0.48,
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  // Viewport-based sprite sizing, resolved AFTER mount so it never touches
  // `window` during SSR (defaults to the desktop sizes on the server).
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const cityY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const groundY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative h-[100vh] min-h-[640px] w-full overflow-hidden bg-background paper-grain"
    >
      {/* Title — brush ink */}
      <motion.div
        style={{ y: titleY }}
        className="absolute inset-x-0 top-[18%] md:top-[18%] z-30 flex flex-col items-center justify-center px-4 text-center"
      >
        <h1 className="font-display text-[clamp(1.2rem,8vw,4.5rem)] leading-tight text-foreground drop-shadow-[2px_2px_0_var(--neon-pink)] md:drop-shadow-[4px_4px_0_var(--neon-pink)]">
          {BAND_NAME}
        </h1>
        <p className="mt-4 font-mono-retro text-xl tracking-[0.25em] text-neon-cyan md:text-2xl">
          {BAND_TAGLINE}
        </p>
      </motion.div>

      {/* Joy-Con ABXY cluster top-right — "press A to play" console flavour */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="absolute right-5 top-[20%] z-30 hidden flex-col items-center gap-2 md:flex"
      >
        <AbxyCluster size={30} className="animate-idle" />
        <span className="font-pixel text-[9px] text-neon-cyan">Ⓐ PLAY</span>
      </motion.div>

      {/* Sticker badge top-left, like Eastward DLC badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="absolute left-4 top-[22%] z-30 hidden w-44 md:block"
      >
        <div className="pixel-card animate-wobble bg-card px-4 py-3 text-center">
          <div className="font-display text-base text-primary">NEW ALBUM</div>
          <div className="font-pixel text-xs text-foreground">OUT NOW</div>
          <a
            href="#music"
            className="mt-1 inline-block font-mono-retro text-base text-primary underline"
          >
            ▸ LISTEN
          </a>
        </div>
      </motion.div>

      {/* Dreamy painted scene (sky + city) inside a soft area */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[62%] overflow-hidden">
        <motion.img
          src={heroLayers.sky}
          alt=""
          style={{ y: skyY }}
          className="absolute inset-0 h-full w-full object-cover opacity-95"
        />
        <motion.img
          src={heroLayers.city}
          alt=""
          style={{ y: cityY }}
          className="pixelated absolute bottom-[14%] left-0 w-full object-contain opacity-95"
        />
        {/* Ground strip */}
        <motion.img
          src={heroLayers.ground}
          alt=""
          style={{ y: groundY }}
          className="pixelated absolute bottom-0 left-0 z-20 w-full"
        />
        {/* PS2-blue tint + scanlines over the warm scene */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(6,8,28,0.55),rgba(6,8,28,0.2)_40%,rgba(6,8,28,0.85))] mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_3px)]" />
      </div>

      {/* Scattered character stickers (foreground) */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {members.map((m, i) => {
          const pos = charPositions[i];
          return (
            <motion.img
              key={m.id}
              src={m.activeImage}
              alt={m.name}
              className="pixelated sticker absolute object-contain animate-idle"
              style={{
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
                height: isDesktop ? pos.sizeDesktop : pos.size,
                ["--tw-rotate" as never]: `${pos.rotate}deg`,
                transform: `rotate(${pos.rotate}deg)`,
                animationDelay: `${pos.delay}s`,
              }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.55 }}
              loading="eager"
            />
          );
        })}
      </div>

      {/* Torn paper transition into the dark marquee strip below */}
      <div className="torn-bottom absolute -bottom-1 left-0 z-40 h-10 w-full bg-foreground" />

      {/* Scroll cue */}
      <div className="absolute bottom-14 left-1/2 z-40 -translate-x-1/2 font-pixel text-xs text-foreground/70 animate-blink">
        ▼ scroll ▼
      </div>
    </section>
  );
}
