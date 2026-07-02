import { socials, BAND_NAME } from "@/lib/band-assets";

export function Footer() {
  return (
    <footer className="relative bg-secondary px-4 py-24">
      <div className="mx-auto max-w-6xl border-t-4 border-foreground pt-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="font-pixel text-2xl text-foreground drop-shadow-[3px_3px_0_var(--neon-pink)]">
              {BAND_NAME}
            </div>
            <p className="font-mono-retro mt-2 text-xl text-muted-foreground">
              © 2026 · ALL RIGHTS RESERVED
            </p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn"
                  style={{
                    background: "var(--neon-purple)",
                    color: "var(--foreground)",
                  }}
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}