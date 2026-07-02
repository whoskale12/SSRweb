import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-14 text-center">
      <div className="mb-5 inline-block border-2 border-neon-cyan bg-card px-4 py-2 font-pixel text-[10px] tracking-[0.2em] text-neon-cyan shadow-[3px_3px_0_0_var(--ink)]">
        {kicker}
      </div>
      {/* Loud Eastward-style display heading: all-caps, wide tracking, warm double drop-shadow */}
      <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-cream [text-shadow:3px_3px_0_var(--neon-pink),6px_6px_0_var(--ink)] md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
