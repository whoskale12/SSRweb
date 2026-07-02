import { motion } from "framer-motion";
import { reviews } from "@/lib/band-assets";
import { Reveal } from "./Reveal";

/**
 * Press pull-quotes — the band-site take on Eastward's review-score strip.
 * Big arcade "score" badge + quote, with a hover lift on each card.
 */
export function Reviews() {
  return (
    <section className="relative bg-background px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.source} delay={i * 0.1}>
            <motion.figure
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="crt-overlay flex h-full flex-col border-4 bg-ink p-6"
              style={{
                borderColor: r.color,
                boxShadow: `6px 6px 0 0 var(--background), 0 0 20px ${r.color}40`,
              }}
            >
              <div
                className="mb-4 inline-flex w-fit items-center gap-2 font-display text-2xl"
                style={{ color: r.color, textShadow: "2px 2px 0 var(--background)" }}
              >
                <span aria-hidden>★</span>
                {r.score}
              </div>
              <blockquote className="flex-1 font-mono-retro text-2xl leading-snug text-foreground">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-5 font-pixel text-[9px] tracking-widest text-muted-foreground">
                — {r.source}
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
