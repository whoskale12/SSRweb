import { albums } from "@/lib/band-assets";
import { sfx } from "@/lib/sfx";
import { Reveal, SectionHeading } from "./Reveal";

export function Discography() {
  return (
    <section id="music" className="relative bg-secondary px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker="▸ TRACK LIST" title="DISCOGRAPHY" />
        </Reveal>

        <Reveal>
          <div className="mx-auto max-w-2xl">
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              {albums.map((a) => (
                <a
                  key={a.id}
                  href={`/album/${a.id}`}
                  onMouseEnter={() => sfx.hover()}
                  onClick={() => sfx.select()}
                  className="switch-tile group relative aspect-square overflow-hidden border-4 border-foreground"
                  style={{
                    boxShadow: "4px 4px 0 0 var(--foreground)",
                  }}
                >
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="pixelated h-full w-full object-cover transition-opacity group-hover:opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="font-pixel text-[10px] text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                      {a.title}
                    </p>
                    {a.subtitle && (
                      <p className="font-pixel text-[8px] text-neon-cyan drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] mt-1">
                        {a.subtitle}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
