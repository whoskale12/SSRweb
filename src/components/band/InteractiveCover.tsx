import { useState, useRef, useEffect } from "react";
import { albums, albumStories, NEON } from "@/lib/band-assets";
import { Reveal, SectionHeading } from "./Reveal";

// Flatten all tracks from all albums into a single array
interface Track {
  id: number;
  title: string;
  note: string;
  albumId: number;
  albumTitle: string;
  albumCover: string;
  albumColor: string;
  albumLogline: string;
  albumParagraphs: string[];
  audioUrl: string; // Placeholder - user can replace with actual audio URLs
}

const allTracks: Track[] = [];
albumStories.forEach((story) => {
  const album = albums.find((a) => a.id === story.albumId);
  if (album) {
    story.tracks.forEach((track, index) => {
      allTracks.push({
        id: allTracks.length + 1,
        title: track.title,
        note: track.note,
        albumId: story.albumId,
        albumTitle: album.title,
        albumCover: album.cover,
        albumColor: story.color,
        albumLogline: story.logline,
        albumParagraphs: story.paragraphs,
        // Placeholder audio URL - replace with actual Bandcamp embed or MP3 files
        audioUrl: `https://example.com/audio/${story.albumId}-${index + 1}.mp3`,
      });
    });
  }
});

export function InteractiveCover() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = allTracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % allTracks.length);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + allTracks.length) % allTracks.length);
  };

  const handleTrackEnd = () => {
    handleNext();
  };

  return (
    <section id="interactive-cover" className="relative bg-background px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            kicker="▸ NOW PLAYING"
            title="INTERACTIVE COVER & STORY"
          />
        </Reveal>

        <Reveal>
          <div className="mx-auto max-w-3xl">
            {/* Audio Player */}
            <div className="mb-8 rounded-lg border-4 border-foreground bg-card p-6">
              <div className="mb-4 text-center">
                <div className="font-pixel text-sm text-muted-foreground">
                  TRACK {currentTrackIndex + 1} / {allTracks.length}
                </div>
                <h3 className="mt-2 font-display text-2xl text-foreground">
                  {currentTrack.title}
                </h3>
                <p className="font-mono-retro text-sm text-muted-foreground">
                  {currentTrack.albumTitle}
                </p>
              </div>

              {/* Audio Element (hidden) */}
              <audio
                ref={audioRef}
                src={currentTrack.audioUrl}
                onEnded={handleTrackEnd}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevious}
                  className="pixel-btn"
                  style={{
                    background: "var(--neon-cyan)",
                    color: "var(--background)",
                  }}
                >
                  ◄ PREV
                </button>

                <button
                  onClick={handlePlayPause}
                  className="pixel-btn text-xl"
                  style={{
                    background: currentTrack.albumColor,
                    color: "var(--background)",
                    minWidth: "120px",
                  }}
                >
                  {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                </button>

                <button
                  onClick={handleNext}
                  className="pixel-btn"
                  style={{
                    background: "var(--neon-cyan)",
                    color: "var(--background)",
                  }}
                >
                  NEXT ►
                </button>
              </div>

              {/* Progress Bar Placeholder */}
              <div className="mt-6 h-2 w-full border-2 border-foreground bg-secondary">
                <div
                  className="h-full transition-all"
                  style={{
                    background: currentTrack.albumColor,
                    width: "0%", // Will animate when audio is playing
                  }}
                />
              </div>
            </div>

            {/* Album Cover Display */}
            <div className="mb-8">
              <button
                onClick={handleNext}
                className="group relative mx-auto block w-full max-w-md overflow-hidden border-4 border-foreground transition-transform hover:-translate-y-1"
                style={{
                  boxShadow: `8px 8px 0 0 ${currentTrack.albumColor}, 12px 12px 0 0 var(--foreground)`,
                }}
              >
                <img
                  src={currentTrack.albumCover}
                  alt={currentTrack.albumTitle}
                  className="pixelated h-full w-full object-cover"
                />
                <div className="absolute inset-0 border-4 border-neon-yellow opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="font-pixel text-lg text-foreground">
                    CLICK FOR NEXT TRACK
                  </span>
                </div>
              </button>
            </div>

            {/* Storytelling Section */}
            <div className="space-y-6 rounded-lg border-4 border-foreground bg-card p-8">
              {/* Track Story Header */}
              <div className="border-b-2 border-foreground pb-4">
                <div
                  className="font-pixel text-xs tracking-wider"
                  style={{ color: currentTrack.albumColor }}
                >
                  DISC {String(currentTrack.albumId).padStart(2, "0")}
                </div>
                <h4 className="mt-2 font-display text-xl text-foreground">
                  {currentTrack.title}
                </h4>
                <p className="mt-2 font-mono-retro text-sm italic text-muted-foreground">
                  {currentTrack.albumLogline}
                </p>
              </div>

              {/* Album Story Paragraphs */}
              <div className="space-y-4">
                {currentTrack.albumParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-mono-retro text-sm leading-relaxed text-foreground"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Track-Specific Note */}
              <div
                className="rounded border-l-4 p-4"
                style={{
                  borderColor: currentTrack.albumColor,
                  background: "var(--secondary)",
                }}
              >
                <div
                  className="mb-2 font-pixel text-xs"
                  style={{ color: currentTrack.albumColor }}
                >
                  ▸ TRACK NOTE
                </div>
                <p className="font-mono-retro text-sm text-foreground">
                  {currentTrack.note}
                </p>
              </div>

              {/* Track Navigation Dots */}
              <div className="flex justify-center gap-2 pt-4">
                {allTracks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTrackIndex(i)}
                    className="h-3 w-3 border-2 border-foreground transition-colors"
                    style={{
                      background: i === currentTrackIndex ? currentTrack.albumColor : "transparent",
                    }}
                    aria-label={`Go to track ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}