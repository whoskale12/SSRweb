import { albums, albumStories } from "@/lib/band-assets";
import { Reveal, SectionHeading } from "./Reveal";

// Look up album cover/meta by id so the story stays in sync with the discography.
const albumById = new Map(albums.map((a) => [a.id, a]));

/**
 * "Album Stories" — a per-record storytelling page in the same 8-bit PS2 style
 * as the rest of the site. Each album gets a CRT-framed cover, a logline, the
 * story behind the record, and a short vignette per track. Layout alternates
 * left/right on desktop and stacks cleanly on mobile.
 */
export function AlbumStory() {
  return (
    <section id="album" className="relative bg-background px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading kicker="▸ INSERT STORY DISC" title="ALBUM STORIES" />
        </Reveal>

        <Reveal>
          <p className="mx-auto mb-16 max-w-2xl text-center font-mono-retro text-2xl leading-snug text-muted-foreground">
            Every record is a level. Here&apos;s the lore behind each one — the
            late nights, the glitches, and the coins it took to keep going.
          </p>
        </Reveal>

        <div className="space-y-16 md:space-y-24">
          {albumStories.map((story, i) => {
            const album = albumById.get(story.albumId);
            if (!album) return null;
            const flip = i % 2 === 1;

            return (
              <Reveal key={story.albumId}>
                <article className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                  {/* ---------- Cover + meta ---------- */}
                  <div className={flip ? "md:order-2" : ""}>
                    <div
                      className="crt-overlay relative border-4 bg-ink p-3"
                      style={{
                        borderColor: story.color,
                        boxShadow: `8px 8px 0 0 var(--background), 0 0 24px ${story.color}55`,
                      }}
                    >
                      <img
                        src={album.cover}
                        alt={album.title}
                        loading="lazy"
                        className="pixelated aspect-square w-full object-cover"
                      />
                    </div>
                    <div
                      className="mt-4 flex items-center justify-between font-pixel text-[9px] tracking-widest"
                      style={{ color: story.color }}
                    >
                      <span>{story.disc}</span>
                      <span>
                        {album.year} · {album.tracks} TRACK
                        {album.tracks > 1 ? "S" : ""}
                      </span>
                    </div>
                  </div>

                  {/* ---------- Narrative ---------- */}
                  <div className={flip ? "md:order-1" : ""}>
                    <h3
                      className="font-display text-xl md:text-3xl"
                      style={{
                        color: story.color,
                        textShadow: "3px 3px 0 var(--background)",
                      }}
                    >
                      {album.title}
                    </h3>
                    <p className="mt-3 font-mono-retro text-2xl italic leading-snug text-foreground/85">
                      {story.logline}
                    </p>

                    <div className="mt-5 space-y-4">
                      {story.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className="font-mono-retro text-xl leading-relaxed text-foreground/80"
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Track vignettes */}
                    <ul className="mt-6 space-y-3">
                      {story.tracks.map((t, k) => (
                        <li
                          key={t.title}
                          className="scanlines border-l-4 bg-card/60 p-3 pl-4"
                          style={{ borderColor: story.color }}
                        >
                          <div className="flex items-baseline gap-3">
                            <span className="font-pixel text-[9px] text-muted-foreground">
                              {String(k + 1).padStart(2, "0")}
                            </span>
                            <span className="font-pixel text-[10px] text-foreground">
                              {t.title}
                            </span>
                          </div>
                          <p className="mt-2 font-mono-retro text-lg leading-snug text-muted-foreground">
                            {t.note}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Navigation CTA ---------- */}
        <Reveal>
          <div className="mt-20 text-center">
            <a
              href="/story"
              className="pixel-btn"
              style={{
                background: "var(--neon-purple)",
                color: "var(--foreground)",
              }}
            >
              ▶ BAND ORIGIN STORY
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
