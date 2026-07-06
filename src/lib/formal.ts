/**
 * "Formal Mode" — a clean, minimalist light theme (modeled on
 * thepanturas.com/store): paper background, black text, Inter sans, thin
 * borders, no CRT scanlines / neon glow / block shadows. Toggling adds the
 * `formal` class to <html>; all visual changes live in styles.css under
 * `html.formal`. Preference is persisted to localStorage and re-applied on
 * boot (see AudioBoot in __root.tsx) so there's no flash between routes.
 */
const FORMAL_KEY = "ssr:formal";

/** SSR-safe read of the saved preference (default: off / pixel mode). */
export function isFormal(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(FORMAL_KEY) === "on";
}

/** Toggle the `formal` class on <html> to match `on`. */
export function applyFormal(on: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("formal", on);
}

/** Persist + apply. Returns the value written so callers can sync UI state. */
export function setFormal(on: boolean): boolean {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(FORMAL_KEY, on ? "on" : "off");
  }
  applyFormal(on);
  return on;
}
