// Shared background-music controller. Wraps the ChiptuneEngine in a module-level
// singleton so playback survives client-side route changes and can be driven
// from anywhere (the Settings popover, a quick-mute icon, etc.). Preserves the
// original autoplay-safe behaviour: sound only ever starts inside a user
// gesture — either the first interaction on the page or an explicit toggle.

import { ChiptuneEngine } from "./chiptune";

const STORAGE_KEY = "neonstatic:bgm";

class BgmController {
  private engine: ChiptuneEngine | null = null;
  private _enabled = true; // default intent ON, but silent until a gesture
  private armed = false;
  private listeners = new Set<() => void>();

  /** Restore preference and arm the first-gesture autostart (client only). */
  init(): void {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "off")
      this._enabled = false;
    this.arm();
    this.emit();
  }

  get enabled(): boolean {
    return this._enabled;
  }

  get playing(): boolean {
    return this.engine?.isPlaying ?? false;
  }

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn());
  }

  private getEngine(): ChiptuneEngine {
    if (!this.engine) this.engine = new ChiptuneEngine();
    return this.engine;
  }

  private arm(): void {
    if (this.armed || typeof window === "undefined") return;
    this.armed = true;
    const onFirstGesture = () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      if (this._enabled && !this.engine?.isPlaying) {
        void this.getEngine()
          .start()
          .then(() => this.emit());
      }
    };
    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);
  }

  setEnabled(on: boolean): void {
    this._enabled = on;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    }
    const engine = this.getEngine();
    if (on) {
      void engine.start().then(() => this.emit());
    } else {
      engine.stop();
    }
    this.emit();
  }

  toggle(): void {
    this.setEnabled(!this._enabled);
  }
}

export const bgm = new BgmController();
