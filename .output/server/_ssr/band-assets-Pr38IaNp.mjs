//#region node_modules/.nitro/vite/services/ssr/assets/band-assets-Pr38IaNp.js
var N = {
	A3: 220,
	C4: 261.63,
	D4: 293.66,
	E4: 329.63,
	G4: 392,
	A4: 440,
	B4: 493.88,
	C5: 523.25,
	D5: 587.33,
	E5: 659.25,
	G5: 783.99,
	A5: 880
};
var LEAD = [
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
	null
];
var BASS = [
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
	null
];
var STEPS = 16;
var SECONDS_PER_STEP = 60 / 132 / 2;
var ChiptuneEngine = class {
	ctx = null;
	master = null;
	timer = null;
	step = 0;
	nextNoteTime = 0;
	running = false;
	lookahead = 25;
	scheduleAhead = .12;
	volume;
	constructor(volume = .06) {
		this.volume = volume;
	}
	/** Whether the loop is currently producing sound. */
	get isPlaying() {
		return this.running;
	}
	/** Start (or resume) playback. Safe to call from a click handler. */
	async start() {
		if (this.running) return;
		if (!this.ctx) {
			const Ctor = window.AudioContext || window.webkitAudioContext;
			if (!Ctor) return;
			this.ctx = new Ctor();
			this.master = this.ctx.createGain();
			this.master.gain.value = 0;
			this.master.connect(this.ctx.destination);
		}
		if (this.ctx.state === "suspended") await this.ctx.resume();
		this.running = true;
		this.step = 0;
		this.nextNoteTime = this.ctx.currentTime + .05;
		this.master.gain.cancelScheduledValues(this.ctx.currentTime);
		this.master.gain.setValueAtTime(0, this.ctx.currentTime);
		this.master.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + .8);
		this.timer = setInterval(() => this.scheduler(), this.lookahead);
	}
	/** Stop playback with a short fade-out. */
	stop() {
		if (!this.running || !this.ctx || !this.master) return;
		this.running = false;
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
		const now = this.ctx.currentTime;
		this.master.gain.cancelScheduledValues(now);
		this.master.gain.setValueAtTime(this.master.gain.value, now);
		this.master.gain.linearRampToValueAtTime(0, now + .25);
	}
	/** Release all audio resources. */
	dispose() {
		this.stop();
		if (this.ctx) {
			this.ctx.close();
			this.ctx = null;
			this.master = null;
		}
	}
	scheduler() {
		if (!this.ctx) return;
		while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAhead) {
			this.scheduleStep(this.step, this.nextNoteTime);
			this.nextNoteTime += SECONDS_PER_STEP;
			this.step = (this.step + 1) % STEPS;
		}
	}
	scheduleStep(step, time) {
		const lead = LEAD[step];
		if (lead) this.blip(lead, time, "square", .55, SECONDS_PER_STEP * .9);
		const bass = BASS[step];
		if (bass) this.blip(bass, time, "triangle", .9, SECONDS_PER_STEP * 1.4);
		if (step % 2 === 1) this.noiseTick(time);
	}
	blip(freq, time, type, gain, duration) {
		if (!this.ctx || !this.master) return;
		const osc = this.ctx.createOscillator();
		const env = this.ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, time);
		env.gain.setValueAtTime(0, time);
		env.gain.linearRampToValueAtTime(gain, time + .01);
		env.gain.exponentialRampToValueAtTime(1e-4, time + duration);
		osc.connect(env);
		env.connect(this.master);
		osc.start(time);
		osc.stop(time + duration + .02);
	}
	noiseTick(time) {
		if (!this.ctx || !this.master) return;
		const dur = .05;
		const frames = Math.floor(this.ctx.sampleRate * dur);
		const buffer = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
		const data = buffer.getChannelData(0);
		for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
		const src = this.ctx.createBufferSource();
		src.buffer = buffer;
		const hp = this.ctx.createBiquadFilter();
		hp.type = "highpass";
		hp.frequency.value = 7e3;
		const env = this.ctx.createGain();
		env.gain.setValueAtTime(.15, time);
		env.gain.exponentialRampToValueAtTime(1e-4, time + dur);
		src.connect(hp);
		hp.connect(env);
		env.connect(this.master);
		src.start(time);
		src.stop(time + dur);
	}
};
var STORAGE_KEY$1 = "neonstatic:bgm";
var BgmController = class {
	engine = null;
	_enabled = true;
	armed = false;
	listeners = /* @__PURE__ */ new Set();
	/** Restore preference and arm the first-gesture autostart (client only). */
	init() {
		if (typeof window === "undefined") return;
		if (window.localStorage.getItem(STORAGE_KEY$1) === "off") this._enabled = false;
		this.arm();
		this.emit();
	}
	get enabled() {
		return this._enabled;
	}
	get playing() {
		return this.engine?.isPlaying ?? false;
	}
	subscribe(fn) {
		this.listeners.add(fn);
		return () => this.listeners.delete(fn);
	}
	emit() {
		this.listeners.forEach((fn) => fn());
	}
	getEngine() {
		if (!this.engine) this.engine = new ChiptuneEngine();
		return this.engine;
	}
	arm() {
		if (this.armed || typeof window === "undefined") return;
		this.armed = true;
		const onFirstGesture = () => {
			window.removeEventListener("pointerdown", onFirstGesture);
			window.removeEventListener("keydown", onFirstGesture);
			if (this._enabled && !this.engine?.isPlaying) this.getEngine().start().then(() => this.emit());
		};
		window.addEventListener("pointerdown", onFirstGesture);
		window.addEventListener("keydown", onFirstGesture);
	}
	setEnabled(on) {
		this._enabled = on;
		if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY$1, on ? "on" : "off");
		const engine = this.getEngine();
		if (on) engine.start().then(() => this.emit());
		else engine.stop();
		this.emit();
	}
	toggle() {
		this.setEnabled(!this._enabled);
	}
};
var bgm = new BgmController();
var STORAGE_KEY = "ssr:sfx";
var SfxEngine = class {
	ctx = null;
	master = null;
	_enabled = false;
	lastHover = 0;
	listeners = /* @__PURE__ */ new Set();
	/** Read the persisted preference (client only). Safe to call repeatedly. */
	init() {
		if (typeof window === "undefined") return;
		this._enabled = window.localStorage.getItem(STORAGE_KEY) === "on";
		this.emit();
	}
	get enabled() {
		return this._enabled;
	}
	subscribe(fn) {
		this.listeners.add(fn);
		return () => this.listeners.delete(fn);
	}
	emit() {
		this.listeners.forEach((fn) => fn());
	}
	/** Toggling ON happens inside a click gesture, so we can warm the context. */
	setEnabled(on) {
		this._enabled = on;
		if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
		if (on) this.ensure().then(() => this.render("select"));
		this.emit();
	}
	toggle() {
		this.setEnabled(!this._enabled);
	}
	prefersReducedMotion() {
		return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}
	async ensure() {
		if (typeof window === "undefined") return;
		if (!this.ctx) {
			const Ctor = window.AudioContext || window.webkitAudioContext;
			if (!Ctor) return;
			this.ctx = new Ctor();
			this.master = this.ctx.createGain();
			this.master.gain.value = .09;
			this.master.connect(this.ctx.destination);
		}
		if (this.ctx.state === "suspended") await this.ctx.resume();
	}
	play(name) {
		if (!this._enabled || this.prefersReducedMotion()) return;
		if (typeof window === "undefined") return;
		if (name === "hover") {
			const now = Date.now();
			if (now - this.lastHover < 55) return;
			this.lastHover = now;
		}
		this.ensure().then(() => this.render(name));
	}
	hover() {
		this.play("hover");
	}
	select() {
		this.play("select");
	}
	back() {
		this.play("back");
	}
	toast() {
		this.play("toast");
	}
	blip(freq, at, dur, type, gain, glideTo) {
		if (!this.ctx || !this.master) return;
		const osc = this.ctx.createOscillator();
		const env = this.ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, at);
		if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, at + dur);
		env.gain.setValueAtTime(0, at);
		env.gain.linearRampToValueAtTime(gain, at + .008);
		env.gain.exponentialRampToValueAtTime(1e-4, at + dur);
		osc.connect(env);
		env.connect(this.master);
		osc.start(at);
		osc.stop(at + dur + .02);
	}
	render(name) {
		if (!this.ctx) return;
		const t = this.ctx.currentTime;
		switch (name) {
			case "hover":
				this.blip(1180, t, .05, "square", .5);
				break;
			case "select":
				this.blip(660, t, .07, "square", .6);
				this.blip(990, t + .06, .12, "square", .6);
				break;
			case "back":
				this.blip(520, t, .12, "triangle", .55, 300);
				break;
			case "toast":
				this.blip(880, t, .05, "sine", .5);
				this.blip(1320, t + .05, .09, "sine", .45);
				break;
		}
	}
};
var sfx = new SfxEngine();
var hero_sky_default = "/assets/hero-sky-D9i0tI8L.jpg";
var hero_city_default = "/assets/hero-city-C79MFnCC.png";
var hero_ground_default = "/assets/hero-ground-CLGXwZ5f.png";
var member_vocalist_default = "/assets/member-vocalist-CjeYt65O.png";
var activeimagevocalist_default = "/assets/activeimagevocalist-BhmqNBZ5.png";
var member_guitarist_default = "/assets/member-guitarist-BVicOdV9.png";
var activeimageguitarist_default = "/assets/activeimageguitarist-Ca-IjPLi.png";
var member_guitarist2_default = "/assets/member-guitarist2-BEJn4HxN.png";
var activeimageguitarist2_default = "/assets/activeimageguitarist2-CXhed2_8.png";
var member_bassist_default = "/assets/member-bassist-Juxnf_WY.png";
var member_drummer_default = "/assets/member-drummer-BRjaRRJg.png";
var activeimagedrummer_default = "/assets/activeimagedrummer-DkMtQYjs.png";
var album_1_default = "/assets/album-1-DeBltdfO.jpg";
var album_2_default = "/assets/album-1-DeBltdfO.jpg";
var album_3_default = "/assets/album-3-DJ6V6PwG.jpg";
var BAND_NAME = "SSR SUPREMACY";
var BAND_TAGLINE = "NOW I SEE YOU, NOW I DON'T";
var heroLayers = {
	sky: hero_sky_default,
	city: hero_city_default,
	ground: hero_ground_default
};
var NEON = {
	pink: "#d9533b",
	cyan: "#5ab3c2",
	green: "#8aa85f",
	yellow: "#f2b950",
	purple: "#9c7594"
};
/**
* Programmatically synthesize a symmetric 16x16 pixel-art sprite as an inline
* SVG data URI. Fully self-contained — no binary asset needed. Deterministic
* per (seed, color) via a tiny xorshift PRNG so a member always looks the same.
*/
function pixelSprite(seed, color) {
	const grid = 16;
	const half = grid / 2;
	let s = seed * 2654435761 >>> 0 || 1;
	const rand = () => {
		s ^= s << 13;
		s >>>= 0;
		s ^= s >> 17;
		s ^= s << 5;
		s >>>= 0;
		return s / 4294967296;
	};
	let rects = "";
	for (let y = 2; y < grid - 1; y++) for (let x = 0; x < half; x++) if (rand() > .5) {
		const mx = grid - 1 - x;
		rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
		if (mx !== x) rects += `<rect x="${mx}" y="${y}" width="1" height="1"/>`;
	}
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${grid}" height="${grid}" shape-rendering="crispEdges"><g fill="${color}">${rects}</g></svg>`;
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
var members = [
	{
		id: "p1-riko",
		name: "JAY",
		role: "VOCALS",
		bio: "Player 1. Screams in 8-bit, drinks coffee in 16-bit. Born inside a CRT and never pressed CONTINUE. Holds the high score for longest sustained note: 14.2 seconds.",
		stats: {
			Instrument: "Vocals / Mic",
			"Favourite Food": "",
			Likes: "Reverb, neon rain, boss themes",
			Dislikes: "Silence, mute buttons"
		},
		idleImage: member_vocalist_default,
		activeImage: activeimagevocalist_default,
		color: NEON.pink
	},
	{
		id: "p2-jin",
		name: "Kale",
		role: "BASS",
		bio: "A cheerful soul with a quiet side. I'm someone who brings vibrant energy to the room, though I equally cherish my calm, reflective moments to recharge.\n\nMusic is my ultimate escape and passion. I'm deeply into R&B, with Daniel Caesar being a massive inspiration for my vibe. When I'm not vibing to smooth tracks, you can find me sharing my musical energy on stage; I actively fill in and collaborate with bands like MEZUM and ASCEND.\n\nOh, and if there's one thing you should know about me: I am absolutely obsessed with cats!",
		stats: {
			Instrument: "Bass Guitar",
			"Favourite Food": "Tempe Guyur, extra distortion",
			Likes: "Whammy bars, Playing Roblox Games",
			Dislikes: "Out-of-tune amps, women"
		},
		idleImage: member_guitarist_default,
		activeImage: activeimageguitarist_default,
		color: NEON.cyan
	},
	{
		id: "p3-moss",
		name: "MOSS",
		role: "BASS",
		bio: "Player 3. Holds the low end together with duct tape and pure vibes. A defensive tank build — slow, unshakeable, felt more than heard. Speaks in sub-frequencies.",
		stats: {
			Instrument: "Bass Guitar",
			"Favourite Food": "Cold pizza, room temperature",
			Likes: "Deep grooves, long naps",
			Dislikes: "Treble, hurrying"
		},
		idleImage: member_bassist_default,
		activeImage: member_bassist_default,
		color: NEON.green
	},
	{
		id: "p4-pixie",
		name: "Ari",
		role: "DRUMS",
		bio: "Player 4. Cardio class for snares and a personal vendetta against silence. Inputs are frame-perfect; the metronome asks PIXIE for advice. Fastest fingers on the cabinet.",
		stats: {
			Instrument: "Drums / Percussion",
			"Favourite Food": "Energy gummies (blue flavour)",
			Likes: "Double kicks, combo counters",
			Dislikes: "Ballads, rest notes"
		},
		idleImage: member_drummer_default,
		activeImage: activeimagedrummer_default,
		color: NEON.yellow
	},
	{
		id: "p5-nova",
		name: "Dafa",
		role: "SYNTH",
		bio: "Player 5. A late unlock — the secret character behind every glowing pad and arpeggio. Speaks fluent square-wave and dreams in chiptune. Rumoured to be partly software.",
		stats: {
			Instrument: "Synth / Keys",
			"Favourite Food": "Pixel-perfect mints",
			Likes: "Arpeggios, save points, modular cables",
			Dislikes: "Dead batteries, lag"
		},
		idleImage: member_guitarist2_default,
		activeImage: activeimageguitarist2_default,
		color: NEON.purple
	}
];
var albums = [
	{
		id: 1,
		title: "No Better Self",
		year: 2026,
		cover: album_1_default,
		tracks: 2,
		length: "04:38"
	},
	{
		id: 2,
		title: "DreamCreeper",
		year: 2026,
		cover: album_2_default,
		tracks: 2,
		length: "03:00"
	},
	{
		id: 3,
		title: "The Untold Stories",
		year: 2025,
		cover: album_3_default,
		tracks: 1,
		length: "2:58"
	}
];
var albumStories = [
	{
		albumId: 1,
		disc: "DISC 01",
		color: NEON.pink,
		logline: "The save file where the band finally met their own reflection.",
		paragraphs: [
			"\"No Better Self\" started as a dare: track the whole thing in one all-nighter — no overdubs, no undo. The band booked the practice space until sunrise and pressed record on a tape deck older than any of them.",
			"Halfway through, the CRT in the corner flickered on by itself and showed each player their own character sprite, pixel-perfect, staring back. Every take after that felt like a boss fight against the version of yourself you keep on pause.",
			"What survived the night became this record: two tracks, zero retries, and a title that admits the obvious — there is no better self waiting at the next checkpoint. This is the run you get."
		],
		tracks: [{
			title: "No Better Self",
			note: "The opening riff is the actual first take — you can hear JAY laugh right before the last chorus."
		}, {
			title: "Mirror Match",
			note: "Bass and synth trade the same four bars until you can't tell who's copying whom. That's the point."
		}]
	},
	{
		albumId: 2,
		disc: "DISC 02",
		color: NEON.cyan,
		logline: "A glitch learned to walk through dreams, and it hummed this back to us.",
		paragraphs: [
			"\"DreamCreeper\" is the band's night-shift record. Written between 2 and 5 a.m., when the city's streaming algorithm goes quiet and the only signal left is static with a heartbeat.",
			"The crew swears a stray process kept adding notes to the project file overnight — arpeggios nobody played, a snare that appears once and never returns. They stopped deleting it and started answering it.",
			"The result creeps: soft where you expect loud, landing a combo the moment you drop your guard. Play it with headphones and the room disappears."
		],
		tracks: [{
			title: "DreamCreeper",
			note: "Built around the 'ghost' arpeggio the band found already in the file. Nobody has admitted to writing it."
		}, {
			title: "Lucid Static",
			note: "The fade-out isn't a fade — it's the tape running out. They kept it."
		}]
	},
	{
		albumId: 3,
		disc: "DISC 03",
		color: NEON.purple,
		logline: "Before the high score, before the neon — one coin, one continue.",
		paragraphs: [
			"\"The Untold Stories\" is where it all boots up: the single that existed before the band had a name, a logo, or a plan. Recorded on borrowed gear in a room with one working light.",
			"It's the origin cutscene — three minutes explaining why five strangers pooled their coins into the same busted arcade cabinet and refused to walk away when the machine asked for more.",
			"Everything the band became is compressed in here, waiting for START. It's short because origins are short. The rest is the game you're already playing."
		],
		tracks: [{
			title: "The Untold Stories",
			note: "One take, one track, one continue. The count-in you hear is the last time they ever needed one."
		}]
	}
];
var socials = [
	{
		name: "Instagram",
		handle: "@ssrsupremacy_",
		href: "https://www.instagram.com/ssrsupremacy_?igsh=MXY2dnN6c3dkeTNzMw=="
	},
	{
		name: "Bandcamp",
		handle: "simplefunrecords",
		href: "https://simplefunrecords.bandcamp.com/album/now-i-see-you-now-i-dont"
	},
	{
		name: "WhatsApp",
		handle: "Contact Us",
		href: "https://wa.me/62881010949870"
	}
];
NEON.cyan, NEON.pink, NEON.yellow;
NEON.cyan, NEON.pink, NEON.green, NEON.yellow, NEON.purple;
var story = {
	kicker: "▸ INSERT STORY DISC",
	heading: "SOMETIME IN THE NEAR-FUTURE...",
	paragraphs: [
		"The world turned its volume down. Streaming algorithms flattened every song into the same grey hum, and the cities forgot how to make noise.",
		"Underground, five players found an abandoned arcade cabinet still wired to a busted amplifier. They pressed START. The machine asked for a coin — and a band.",
		"Now NEON STATIC tours the surface, frying the silence one pixel-perfect riff at a time. They wield a synth, a frying-pan-shaped guitar, and a high score nobody has matched."
	],
	signature: "— synthesized in Neo-Kyoto by NEON STATIC"
};
NEON.cyan, NEON.pink, NEON.yellow, NEON.green, NEON.purple;
//#endregion
export { album_1_default as a, albums as c, hero_city_default as d, members as f, story as g, socials as h, albumStories as i, bgm as l, sfx as m, BAND_TAGLINE as n, album_2_default as o, pixelSprite as p, NEON as r, album_3_default as s, BAND_NAME as t, heroLayers as u };
