import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { members, pixelSprite, NEON } from "@/lib/band-assets";
import { sfx } from "@/lib/sfx";
import { Reveal, SectionHeading } from "./Reveal";

// Little decorative pixel buddy that peeks over the profile card (screenshot vibe).
const buddySprite = pixelSprite(99, NEON.cyan);

export function Members() {
  const [selected, setSelected] = useState(0);
  const active = members[selected];

  return (
    <section id="members" className="relative bg-background px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading kicker="▸ PLAYER SELECT" title="CHARACTER SELECT" />
        </Reveal>

        {/* ---------- Top row: 5 selectable avatars ---------- */}
        <Reveal>
          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {members.map((m, i) => {
              const isActive = i === selected;
              return (
                <button
                  key={m.id}
                  onMouseEnter={() => sfx.hover()}
                  onClick={() => {
                    sfx.select();
                    setSelected(i);
                  }}
                  aria-pressed={isActive}
                  aria-label={`Select ${m.name}`}
                  className="group relative aspect-[3/4] overflow-hidden transition-transform duration-150 hover:-translate-y-1"
                  style={{
                    border: `4px solid ${isActive ? m.color : "var(--muted)"}`,
                    boxShadow: isActive
                      ? `4px 4px 0 0 var(--ink), 0 0 16px ${m.color}`
                      : "4px 4px 0 0 var(--ink)",
                    background: isActive
                      ? `linear-gradient(180deg, ${m.color}33, transparent)`
                      : "var(--card)",
                  }}
                >
                  <img
                    src={isActive ? m.activeImage : m.idleImage}
                    alt={m.name}
                    loading="lazy"
                    className={`pixelated h-full w-full object-contain p-1 transition-all duration-200 ${
                      isActive
                        ? "animate-idle scale-105"
                        : "opacity-50 grayscale group-hover:opacity-80 group-hover:grayscale-0"
                    }`}
                  />
                  {/* selector arrow on the active card, like an arcade cursor */}
                  {isActive && (
                    <span
                      className="absolute left-1/2 top-1 -translate-x-1/2 font-pixel text-[10px]"
                      style={{ color: m.color }}
                    >
                      ▼
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-1 text-center font-pixel text-[7px] text-cream md:text-[9px]">
                    {m.name}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---------- Profile card ---------- */}
        <Reveal delay={0.1}>
          <div
            className="crt-overlay relative mt-8 border-4 bg-ink p-6 md:p-10"
            style={{
              borderColor: active.color,
              boxShadow: `8px 8px 0 0 var(--background), 0 0 24px ${active.color}55`,
            }}
          >
            {/* floating pixel buddy peeking over the top-right corner */}
            <img
              src={buddySprite}
              alt=""
              aria-hidden
              className="pixelated animate-idle pointer-events-none absolute -top-10 right-6 hidden h-16 w-16 md:block"
              style={{ filter: `drop-shadow(0 0 8px ${NEON.cyan})` }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid gap-8 md:grid-cols-[1.1fr_1fr]"
              >
                {/* Left: name + bio */}
                <div>
                  <div
                    className="mb-1 font-pixel text-[10px] tracking-widest"
                    style={{ color: active.color }}
                  >
                    PLAYER {selected + 1} / {active.role}
                  </div>
                  <h3
                    className="font-display text-2xl md:text-4xl"
                    style={{
                      color: active.color,
                      textShadow: `3px 3px 0 var(--background)`,
                    }}
                  >
                    {active.name}
                  </h3>
                  <p className="mt-4 max-w-prose font-mono-retro text-xl leading-snug text-cream">
                    {active.bio}
                  </p>
                </div>

                {/* Right: lined stat list */}
                <dl className="self-start">
                  {Object.entries(active.stats).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-4 border-b border-cream/20 py-3"
                    >
                      <dt className="font-pixel text-[9px] uppercase tracking-wider text-cream/60">
                        {label}
                      </dt>
                      <dd className="text-right font-mono-retro text-xl text-cream">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
