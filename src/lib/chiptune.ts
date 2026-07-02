// Self-contained 8-bit / chiptune background-music engine built on the native
// Web Audio API. No binary assets, no network — the melody, bass and percussive
// blips are synthesized live from square/triangle oscillators and looped
// seamlessly with a look-ahead scheduler (the standard "A Tale of Two Clocks"
// pattern). Construct lazily and only inside a user gesture so it stays within
// browser autoplay rules.

type Note = number | null; // frequency in Hz, or null for a rest

// Equal-tempered note frequencies we need (Hz).
const N = {
  A3: 220.0,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
  A5: 880.0,
} as const;

// A nostalgic looping lead line (16 steps) — bright and a little wistful.
const LEAD: Note[] = [
  N.A4,
  N.C5,
  N.E5,
  N.C5,
  N.D5,
  N.B4,
  N.G4,
  N.B4,
  N.A4,
  N.C5,
  N.E5,
  N.A5,
  N.G5,
  N.E5,
  N.D5,
  null,
];

// A simple root-note bass that walks under the lead.
const BASS: Note[] = [
  N.A3,
  null,
  N.A3,
  null,
  N.D4,
  null,
  N.D4,
  null,
  N.A3,
  null,
  N.A3,
  null,
  N.E4,
  null,
  N.E4,
  null,
];

const STEPS = 16;
const TEMPO = 132; // BPM
const SECONDS_PER_STEP = 60 / TEMPO / 2; // eighth notes

export class ChiptuneEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private step = 0;
  private nextNoteTime = 0;
  private running = false;

  private readonly lookahead = 25; // ms between scheduler ticks
  private readonly scheduleAhead = 0.12; // seconds of audio scheduled in advance
  private readonly volume: number;

  constructor(volume = 0.06) {
    this.volume = volume;
  }

  /** Whether the loop is currently producing sound. */
  get isPlaying(): boolean {
    return this.running;
  }

  /** Start (or resume) playback. Safe to call from a click handler. */
  async start(): Promise<void> {
    if (this.running) return;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return; // Web Audio unsupported — fail quietly.
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
    }
    // Browsers start the context "suspended" until a gesture resumes it.
    if (this.ctx.state === "suspended") await this.ctx.resume();

    this.running = true;
    this.step = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    // Gentle fade-in so it starts quietly.
    this.master!.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master!.gain.setValueAtTime(0, this.ctx.currentTime);
    this.master!.gain.linearRampToValueAtTime(
      this.volume,
      this.ctx.currentTime + 0.8,
    );

    this.timer = setInterval(() => this.scheduler(), this.lookahead);
  }

  /** Stop playback with a short fade-out. */
  stop(): void {
    if (!this.running || !this.ctx || !this.master) return;
    this.running = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.25);
  }

  /** Release all audio resources. */
  dispose(): void {
    this.stop();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.master = null;
    }
  }

  // Queue any notes that fall within the look-ahead window.
  private scheduler(): void {
    if (!this.ctx) return;
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAhead) {
      this.scheduleStep(this.step, this.nextNoteTime);
      this.nextNoteTime += SECONDS_PER_STEP;
      this.step = (this.step + 1) % STEPS;
    }
  }

  private scheduleStep(step: number, time: number): void {
    const lead = LEAD[step];
    if (lead) this.blip(lead, time, "square", 0.55, SECONDS_PER_STEP * 0.9);

    const bass = BASS[step];
    if (bass) this.blip(bass, time, "triangle", 0.9, SECONDS_PER_STEP * 1.4);

    // Hi-hat-ish tick on the off-beats for groove.
    if (step % 2 === 1) this.noiseTick(time);
  }

  // One short oscillator note with a percussive envelope.
  private blip(
    freq: number,
    time: number,
    type: OscillatorType,
    gain: number,
    duration: number,
  ): void {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(gain, time + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(env);
    env.connect(this.master);
    osc.start(time);
    osc.stop(time + duration + 0.02);
  }

  // Tiny filtered-noise tick that reads as a chiptune hi-hat.
  private noiseTick(time: number): void {
    if (!this.ctx || !this.master) return;
    const dur = 0.05;
    const frames = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const hp = this.ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7000;
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.15, time);
    env.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    src.connect(hp);
    hp.connect(env);
    env.connect(this.master);
    src.start(time);
    src.stop(time + dur);
  }
}
