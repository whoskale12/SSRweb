// Nintendo-Switch-style UI sound effects, synthesized live via the Web Audio
// API (same approach as the chiptune BGM engine — no binary assets). A single
// shared instance persists across route changes because it lives at module
// scope. Muted by DEFAULT: nothing plays until the user opts in, and it always
// honours prefers-reduced-motion.

const STORAGE_KEY = "ssr:sfx";

type SfxName = "hover" | "select" | "back" | "toast";

class SfxEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private _enabled = false;
  private lastHover = 0;
  private listeners = new Set<() => void>();

  /** Read the persisted preference (client only). Safe to call repeatedly. */
  init(): void {
    if (typeof window === "undefined") return;
    this._enabled = window.localStorage.getItem(STORAGE_KEY) === "on";
    this.emit();
  }

  get enabled(): boolean {
    return this._enabled;
  }

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn());
  }

  /** Toggling ON happens inside a click gesture, so we can warm the context. */
  setEnabled(on: boolean): void {
    this._enabled = on;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    }
    if (on) {
      void this.ensure().then(() => this.render("select"));
    }
    this.emit();
  }

  toggle(): void {
    this.setEnabled(!this._enabled);
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  private async ensure(): Promise<void> {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.09;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }

  private play(name: SfxName): void {
    if (!this._enabled || this.prefersReducedMotion()) return;
    if (typeof window === "undefined") return;
    if (name === "hover") {
      const now = Date.now();
      if (now - this.lastHover < 55) return; // throttle rapid pointer moves
      this.lastHover = now;
    }
    void this.ensure().then(() => this.render(name));
  }

  hover(): void {
    this.play("hover");
  }
  select(): void {
    this.play("select");
  }
  back(): void {
    this.play("back");
  }
  toast(): void {
    this.play("toast");
  }

  // One short oscillator "blip" with a percussive envelope, optionally gliding.
  private blip(
    freq: number,
    at: number,
    dur: number,
    type: OscillatorType,
    gain: number,
    glideTo?: number,
  ): void {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, at);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, at + dur);
    env.gain.setValueAtTime(0, at);
    env.gain.linearRampToValueAtTime(gain, at + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    osc.connect(env);
    env.connect(this.master);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  private render(name: SfxName): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    switch (name) {
      case "hover": // crisp little cursor tick
        this.blip(1180, t, 0.05, "square", 0.5);
        break;
      case "select": // bright two-step confirm
        this.blip(660, t, 0.07, "square", 0.6);
        this.blip(990, t + 0.06, 0.12, "square", 0.6);
        break;
      case "back": // soft downward cancel
        this.blip(520, t, 0.12, "triangle", 0.55, 300);
        break;
      case "toast": // gentle system pop
        this.blip(880, t, 0.05, "sine", 0.5);
        this.blip(1320, t + 0.05, 0.09, "sine", 0.45);
        break;
    }
  }
}

export const sfx = new SfxEngine();
