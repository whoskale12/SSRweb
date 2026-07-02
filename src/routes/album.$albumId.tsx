import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/band/Nav";
import { Footer } from "@/components/band/Footer";
import { albums, albumStories } from "@/lib/band-assets";
import { Reveal } from "@/components/band/Reveal";

export const Route = createFileRoute("/album/$albumId")({
  head: ({ params }) => {
    const albumId = parseInt(params.albumId);
    const album = albums.find((a) => a.id === albumId);
    
    return {
      meta: [
        { title: album ? `${album.title} — SSR SUPREMACY` : "Album — SSR SUPREMACY" },
        {
          name: "description",
          content: album 
            ? `The story behind ${album.title}. ${album.year} · ${album.tracks} tracks.`
            : "Album story",
        },
        { 
          property: "og:title", 
          content: album ? `${album.title} — SSR SUPREMACY` : "Album — SSR SUPREMACY" 
        },
      ],
    };
  },
  component: AlbumDetailPage,
});

function AlbumDetailPage() {
  const { albumId } = Route.useParams();
  const id = parseInt(albumId);
  
  const album = albums.find((a) => a.id === id);
  const story = albumStories.find((s) => s.albumId === id);

  if (!album || !story) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <Nav />
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-3xl text-foreground md:text-5xl">
              ALBUM NOT FOUND
            </h1>
            <p className="mt-4 font-mono-retro text-xl text-muted-foreground">
              The album you're looking for doesn't exist in our discography.
            </p>
            <a
              href="/"
              className="pixel-btn mt-8 inline-block"
              style={{
                background: "var(--neon-cyan)",
                color: "var(--foreground)",
              }}
            >
              ▶ BACK TO HOME
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      
      <section className="relative bg-background px-4 py-24">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <Reveal>
            <div className="mb-8 flex items-center gap-2 font-pixel text-[9px] text-muted-foreground">
              <a href="/" className="hover:text-neon-cyan transition-colors">
                HOME
              </a>
              <span>▸</span>
              <a href="/#music" className="hover:text-neon-cyan transition-colors">
                DISCOGRAPHY
              </a>
              <span>▸</span>
              <span className="text-foreground">{album.title}</span>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-8 inline-block border-2 bg-card px-4 py-2 font-pixel text-[10px] tracking-wider shadow-[3px_3px_0_0_var(--background)]"
              style={{ 
                borderColor: story.color,
                color: story.color 
              }}
            >
              {story.disc} ▸ INSERT STORY DISC
            </div>
          </Reveal>

          <article className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            {/* Cover + meta */}
            <Reveal>
              <div>
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
                    {album.tracks > 1 ? "S" : ""} · {album.length}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Narrative */}
            <div>
              <Reveal>
                <h1
                  className="font-display text-2xl md:text-4xl"
                  style={{
                    color: story.color,
                    textShadow: "3px 3px 0 var(--background)",
                  }}
                >
                  {album.title}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 font-mono-retro text-2xl italic leading-snug text-foreground/85">
                  {story.logline}
                </p>
              </Reveal>

              <div className="mt-6 space-y-4">
                {story.paragraphs.map((p, j) => (
                  <Reveal key={j} delay={0.2 + j * 0.1}>
                    <p className="font-mono-retro text-xl leading-relaxed text-foreground/80">
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* Track vignettes */}
              <Reveal delay={0.5}>
                <div className="mt-8">
                  <h2 className="mb-4 font-pixel text-[11px] tracking-wider text-foreground">
                    TRACK STORIES
                  </h2>
                  <ul className="space-y-3">
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
              </Reveal>
            </div>
          </article>

          {/* Navigation */}
          <Reveal delay={0.6}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/"
                className="pixel-btn"
                style={{
                  background: "var(--neon-cyan)",
                  color: "var(--foreground)",
                }}
              >
                ▶ BACK TO HOME
              </a>
              <a
                href="/albums"
                className="pixel-btn"
                style={{
                  background: "var(--neon-purple)",
                  color: "var(--foreground)",
                }}
              >
                ▶ ALL ALBUMS
              </a>
              <a
                href="/story"
                className="pixel-btn"
                style={{
                  background: "var(--neon-pink)",
                  color: "var(--foreground)",
                }}
              >
                ▶ BAND STORY
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}