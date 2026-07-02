import { useEffect, useRef, useState } from "react";
import { bgm } from "@/lib/bgm";
import { sfx } from "@/lib/sfx";
import { Toggle, IconButton } from "./SwitchChrome";

const CRT_KEY = "ssr:crt";

function applyCrt(on: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("crt-off", !on);
}

/**
 * Switch-style "System Settings" — a matte-grey popover launched from a gear
 * icon, housing sliding toggles for music, UI sound FX and CRT scanlines.
 */
export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [bgmOn, setBgmOn] = useState(false);
  const [sfxOn, setSfxOn] = useState(false);
  const [crtOn, setCrtOn] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // Keep local UI in sync with the audio singletons.
  useEffect(() => {
    const sync = () => {
      setBgmOn(bgm.enabled);
      setSfxOn(sfx.enabled);
    };
    sync();
    const unsubBgm = bgm.subscribe(sync);
    const unsubSfx = sfx.subscribe(sync);

    const crtPref =
      typeof window !== "undefined"
        ? window.localStorage.getItem(CRT_KEY) !== "off"
        : true;
    setCrtOn(crtPref);
    applyCrt(crtPref);

    return () => {
      unsubBgm();
      unsubSfx();
    };
  }, []);

  // Dismiss on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sfx.back();
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <IconButton
        aria-label="System settings"
        aria-expanded={open}
        active={open}
        onClick={() => {
          sfx.select();
          setOpen((o) => !o);
        }}
      >
        ⚙
      </IconButton>

      {open && (
        <div
          role="dialog"
          aria-label="System settings"
          className="matte-panel animate-toast absolute right-0 top-11 z-[100] w-64 p-3"
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="font-pixel text-[9px] tracking-widest text-matte-fg/70">
              SYSTEM SETTINGS
            </span>
            <span className="font-pixel text-[8px] text-joycon-blue">◉</span>
          </div>

          <Toggle
            label="BACKGROUND MUSIC"
            hint="Chiptune loop"
            checked={bgmOn}
            onChange={(v) => bgm.setEnabled(v)}
          />
          <Toggle
            label="UI SOUND FX"
            hint="Hover & select blips"
            checked={sfxOn}
            onChange={(v) => sfx.setEnabled(v)}
          />
          <Toggle
            label="CRT SCANLINES"
            hint="Retro screen overlay"
            checked={crtOn}
            onChange={(v) => {
              setCrtOn(v);
              applyCrt(v);
              if (typeof window !== "undefined") {
                window.localStorage.setItem(CRT_KEY, v ? "on" : "off");
              }
            }}
          />

          <div className="mt-2 border-t border-matte-600 px-1 pt-2 font-mono-retro text-sm text-matte-fg/50">
            Press <span className="text-joycon-blue">Esc</span> to close
          </div>
        </div>
      )}
    </div>
  );
}
