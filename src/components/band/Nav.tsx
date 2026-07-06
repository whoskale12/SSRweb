import { useEffect, useRef, useState } from "react";
import { BAND_NAME } from "@/lib/band-assets";
import { sfx } from "@/lib/sfx";
import { isFormal, setFormal } from "@/lib/formal";
import { SwitchHomeBadge } from "@/components/band/JoyCon";
import { IconButton } from "@/components/band/SwitchChrome";
import { SettingsMenu } from "@/components/band/SettingsMenu";

// Absolute paths so section anchors also work when navigating from /albums etc.
const links = [
  { href: "/#members", label: "PLAYERS", icon: "👾" },
  { href: "/#music", label: "MUSIC", icon: "♪" },
  { href: "/albums", label: "ALBUMS", icon: "💿" },
  { href: "/merch", label: "MERCH", icon: "🎽" },
  { href: "/story", label: "STORY", icon: "✦" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onMouseEnter={() => sfx.hover()}
      onClick={() => sfx.select()}
      className="group relative font-pixel text-[10px] tracking-wider text-matte-fg/80 transition-colors hover:text-matte-fg"
    >
      <span className="text-neon-yellow opacity-0 transition-opacity group-hover:opacity-100">
        ▶{" "}
      </span>
      {label}
      {/* sleek Joy-Con-blue underline glow that wipes in on hover/focus */}
      <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-joycon-blue shadow-[0_0_8px_var(--joycon-blue)] transition-all duration-150 group-hover:w-full group-focus-visible:w-full" />
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [sfxOn, setSfxOn] = useState(false);
  const [formalOn, setFormalOn] = useState(false);

  useEffect(() => {
    const sync = () => setSfxOn(sfx.enabled);
    sync();
    return sfx.subscribe(sync);
  }, []);

  // Reflect the persisted Formal Mode preference once mounted (SSR-safe).
  useEffect(() => {
    setFormalOn(isFormal());
  }, []);

  return (
    <>
      {/* ---------- Sleek matte "console" top-bar ---------- */}
      <nav className="sticky top-0 z-50 w-full border-b border-joycon-blue/40 bg-matte-800/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <a
            href="/"
            onClick={() => sfx.select()}
            className="font-display text-sm text-cream drop-shadow-[2px_2px_0_var(--neon-pink)] md:text-lg"
          >
            {BAND_NAME}
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} label={l.label} />
              </li>
            ))}
          </ul>

          {/* Right cluster: console chrome */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <SwitchHomeBadge />
            </div>
            <IconButton
              aria-label={
                formalOn ? "Switch to pixel mode" : "Switch to formal mode"
              }
              aria-pressed={formalOn}
              active={formalOn}
              title={formalOn ? "Formal mode: ON" : "Formal mode: OFF"}
              onClick={() => {
                sfx.select();
                setFormalOn(setFormal(!formalOn));
              }}
            >
              {formalOn ? "🎩" : "👾"}
            </IconButton>
            <IconButton
              aria-label={sfxOn ? "Mute UI sound" : "Enable UI sound"}
              active={sfxOn}
              onClick={() => {
                sfx.toggle();
              }}
            >
              {sfxOn ? "🔊" : "🔈"}
            </IconButton>
            <SettingsMenu />
            {/* Mobile menu launcher */}
            <div className="md:hidden">
              <IconButton
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => {
                  sfx.select();
                  setOpen(true);
                }}
              >
                ☰
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

      {/* ---------- Mobile Switch Home-Menu grid overlay ---------- */}
      {open && (
        <HomeMenuOverlay
          onClose={() => {
            sfx.back();
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

function HomeMenuOverlay({ onClose }: { onClose: () => void }) {
  const tileRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [active, setActive] = useState(0);

  // Focus the first tile on open + wire arrow-key navigation (Switch feel).
  useEffect(() => {
    tileRefs.current[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      const cols = 2;
      const n = links.length;
      let next = active;
      if (e.key === "ArrowRight") next = (active + 1) % n;
      else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
      else if (e.key === "ArrowDown") next = Math.min(active + cols, n - 1);
      else if (e.key === "ArrowUp") next = Math.max(active - cols, 0);
      else return;
      e.preventDefault();
      setActive(next);
      tileRefs.current[next]?.focus();
      sfx.hover();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[9999] flex flex-col bg-matte-900/97 backdrop-blur-sm md:hidden"
    >
      <div className="flex items-center justify-between px-5 py-3">
        <span className="font-pixel text-[10px] tracking-widest text-matte-fg/60">
          HOME MENU
        </span>
        <IconButton aria-label="Close menu" onClick={onClose}>
          ✕
        </IconButton>
      </div>

      <div className="grid flex-1 grid-cols-2 content-center gap-4 px-6 pb-24">
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            onMouseEnter={() => sfx.hover()}
            onFocus={() => setActive(i)}
            onClick={() => sfx.select()}
            className="switch-nav-tile group aspect-square flex-col gap-2 p-3"
          >
            <span aria-hidden className="text-4xl">
              {l.icon}
            </span>
            <span className="font-pixel text-[10px] tracking-wider">
              {l.label}
            </span>
            <span className="press-cue font-mono-retro text-sm text-joycon-blue">
              Ⓐ SELECT
            </span>
          </a>
        ))}
      </div>

      {/* Switch-style control hint bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-6 border-t border-matte-600 bg-matte-800/90 py-3 font-mono-retro text-sm text-matte-fg/70">
        <span>
          <span className="text-joycon-blue">Ⓐ</span> Select
        </span>
        <span>
          <span className="text-joycon-red">Ⓑ</span> Back
        </span>
        <span className="hidden sm:inline">✛ Move</span>
      </div>
    </div>
  );
}
