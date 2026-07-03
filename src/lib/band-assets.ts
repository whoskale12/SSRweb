// Swap any of these to update visuals everywhere.
import heroSky from "@/assets/hero-sky.jpg";
import heroCity from "@/assets/hero-city.png";
import heroGround from "@/assets/hero-ground.png";
import vocalist from "@/assets/member-vocalist.png";
import activeimagevocalist from "@/assets/activeimagevocalist.png";
import guitarist from "@/assets/member-guitarist.png";
import activeimageguitarist from "@/assets/activeimageguitarist.png";
import guitarist2 from "@/assets/member-guitarist2.png";
import activeimageguitarist2 from "@/assets/activeimageguitarist2.png";
import bassist from "@/assets/member-bassist.png";
import drummer from "@/assets/member-drummer.png";
import activeimagedrummer from "@/assets/activeimagedrummer.png";
import activeimagebassist from "@/assets/activeimagebassist.png";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import kaosputih from "@/assets/kaos-putih.jpg";
import kaoshitam from "@/assets/kaos-hitam.jpg";
import kaosputih2 from "@/assets/kaos-putih2.jpg";

export const BAND_NAME = "SSR SUPREMACY";
export const BAND_TAGLINE = "NOW I SEE YOU, NOW I DON'T";

export const heroLayers = {
  sky: heroSky,
  city: heroCity,
  ground: heroGround,
};

/* ---------- Eastward navy + Nintendo Switch Joy-Con palette (hex so it also works inside generated SVG sprites) ---------- */
export const NEON = {
  pink: "#d9533b", // warm rust red
  cyan: "#5ab3c2", // muted teal
  green: "#8aa85f", // sage
  yellow: "#f2b950", // mustard gold
  purple: "#9c7594", // dusty mauve
} as const;

/**
 * Programmatically synthesize a symmetric 16x16 pixel-art sprite as an inline
 * SVG data URI. Fully self-contained — no binary asset needed. Deterministic
 * per (seed, color) via a tiny xorshift PRNG so a member always looks the same.
 */
export function pixelSprite(seed: number, color: string): string {
  const grid = 16;
  const half = grid / 2;
  let s = (seed * 2654435761) >>> 0 || 1;
  const rand = () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
  let rects = "";
  for (let y = 2; y < grid - 1; y++) {
    for (let x = 0; x < half; x++) {
      if (rand() > 0.5) {
        const mx = grid - 1 - x;
        rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
        if (mx !== x)
          rects += `<rect x="${mx}" y="${y}" width="1" height="1"/>`;
      }
    }
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${grid}" height="${grid}" shape-rendering="crispEdges">` +
    `<g fill="${color}">${rects}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export type MemberStats = Record<string, string>;

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  stats: MemberStats;
  idleImage: string;
  activeImage: string;
  color: string;
}

/* Exactly 5 party members — retro-game character sheets. */
export const members: Member[] = [
  {
    id: "p1-riko",
    name: "JAY",
    role: "VOCALS",
    bio: "Player 1. Screams in 8-bit, drinks coffee in 16-bit. Born inside a CRT and never pressed CONTINUE. Holds the high score for longest sustained note: 14.2 seconds.",
    stats: {
      Instrument: "Vocals / Mic",
      "Favourite Food": "",
      Likes: "Reverb, neon rain, boss themes",
      Dislikes: "Silence, mute buttons",
    },
    idleImage: vocalist,
    activeImage: activeimagevocalist,
    color: NEON.pink,
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
      Dislikes: "Out-of-tune amps, women",
    },
    idleImage: guitarist,
    activeImage: activeimageguitarist,
    color: NEON.cyan,
  },
  {
    id: "p3-moss",
    name: "ARI",
    role: "Guitar 2",
    bio: "Player 3. Holds the low end together with duct tape and pure vibes. A defensive tank build — slow, unshakeable, felt more than heard. Speaks in sub-frequencies.",
    stats: {
      Instrument: "Bass Guitar",
      "Favourite Food": "Cold pizza, room temperature",
      Likes: "Deep grooves, long naps",
      Dislikes: "Treble, hurrying",
    },
    idleImage: bassist,
    activeImage: activeimagebassist,
    color: NEON.green,
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
      Dislikes: "Ballads, rest notes",
    },
    idleImage: drummer,
    activeImage: activeimagedrummer,
    color: NEON.yellow,
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
      Dislikes: "Dead batteries, lag",
    },
    idleImage: guitarist2,
    activeImage: activeimageguitarist2,
    color: NEON.purple,
  },
];

export const albums = [
  {
    id: 1,
    title: "Now I See You, Now I Don't",
    subtitle: "Maxi Single",
    year: 2026,
    cover: album1,
    tracks: 2,
    length: "07:38",
  },
  {
    id: 2,
    title: "The Untold Stories",
    subtitle: "Single",
    year: 2025,
    cover: album3,
    tracks: 1,
    length: "2:58",
  },
];

/* ---------- Storytelling behind each album (the "STORY DISC" per record) ---------- */
export interface AlbumStory {
  albumId: number;
  disc: string;
  color: string;
  logline: string;
  paragraphs: string[];
  tracks: { title: string; note: string }[];
}

export const albumStories: AlbumStory[] = [
  {
    albumId: 1,
    disc: "MAXI SINGLE",
    color: NEON.pink,
    logline: "Two sides of the same save file — the run you get and the dream you chase.",
    paragraphs: [
      '"No Better Self" started as a dare: track the whole thing in one all-nighter — no overdubs, no undo. The band booked the practice space until sunrise and pressed record on a tape deck older than any of them.',
      "Halfway through, the CRT in the corner flickered on by itself. First it showed their own reflection, pixel-perfect. Then it glitched and showed something else — a dream walking through static, humming back at them.",
      "What survived the night became this maxi single: two tracks that belong together, zero retries, and a title that admits the obvious — there is no better self waiting at the next checkpoint. This is the run you get, and this is the dream that creeps in when you pause.",
    ],
    tracks: [
      {
        title: "No Better Self",
        note: "The opening riff is the actual first take — you can hear JAY laugh right before the last chorus. A boss fight against the version of yourself you keep on pause.",
      },
      {
        title: "DreamCreeper",
        note: "Built around the 'ghost' arpeggio the band found already in the file. Written between 2 and 5 a.m., when the only signal left is static with a heartbeat.",
      },
    ],
  },
  {
    albumId: 2,
    disc: "DISC 02",
    color: NEON.purple,
    logline: "Before the high score, before the neon — one coin, one continue.",
    paragraphs: [
      '"The Untold Stories" is where it all boots up: the single that existed before the band had a name, a logo, or a plan. Recorded on borrowed gear in a room with one working light.',
      "It's the origin cutscene — three minutes explaining why five strangers pooled their coins into the same busted arcade cabinet and refused to walk away when the machine asked for more.",
      "Everything the band became is compressed in here, waiting for START. It's short because origins are short. The rest is the game you're already playing.",
    ],
    tracks: [
      {
        title: "The Untold Stories",
        note: "One take, one track, one continue. The count-in you hear is the last time they ever needed one.",
      },
    ],
  },
];

export const socials = [
  {
    name: "Instagram",
    handle: "@ssrsupremacy_",
    href: "https://www.instagram.com/ssrsupremacy_?igsh=MXY2dnN6c3dkeTNzMw==",
  },
  {
    name: "Bandcamp",
    handle: "simplefunrecords",
    href: "https://simplefunrecords.bandcamp.com/album/now-i-see-you-now-i-dont",
  },
  {
    name: "WhatsApp",
    handle: "Contact Us",
    href: "https://wa.me/62881010949870",
  },
];

/* ============================================================================
 * Eastward-inspired content — adapted to the band universe.
 * Everything here is plain data; the visuals that consume it are synthesized
 * programmatically (canvas / SVG / CSS), never loaded from binary assets.
 * ========================================================================== */

/* ---------- Press pull-quotes (Eastward "review quotes" section) ---------- */
export interface Review {
  quote: string;
  source: string;
  score: string;
  color: string;
}
export const reviews: Review[] = [
  {
    quote: "Who knew you could have this much fun with a distortion pedal?",
    source: "DUALSHOCK ZINE",
    score: "9/10",
    color: NEON.cyan,
  },
  {
    quote: "An engrossing, unapologetically loud pixel-rock knockout.",
    source: "SCREEN STATIC",
    score: "10/10",
    color: NEON.pink,
  },
  {
    quote: "Clever, vibrant, and gloriously original. Press START.",
    source: "THE GAMER FM",
    score: "9/10",
    color: NEON.yellow,
  },
];

/* ---------- Feature reel (Eastward expandable feature carousel) ---------- */
export interface Feature {
  id: string;
  title: string;
  blurb: string;
  /** Which procedural illustration to draw on the feature card canvas. */
  art: "city" | "combat" | "swap" | "town" | "cook";
  color: string;
}
export const features: Feature[] = [
  {
    id: "tour",
    title: "TOUR THE WORLD",
    blurb:
      "Ride the night-train from neon arcade to rooftop dive. Every city is a new stage, every stage a new boss.",
    art: "city",
    color: NEON.cyan,
  },
  {
    id: "riff",
    title: "RIFF OR FRY",
    blurb:
      "Trade solos in real-time riff battles. Land the combo, drop the bass, fry the silence.",
    art: "combat",
    color: NEON.pink,
  },
  {
    id: "swap",
    title: "SWAP THE LINEUP",
    blurb:
      "Hot-swap players mid-song. Each character unlocks a different sound and a different puzzle to solve.",
    art: "swap",
    color: NEON.green,
  },
  {
    id: "town",
    title: "SMALL TOWN LIFE",
    blurb:
      "Between gigs, hang at the practice space. Talk to the band, feed the cat, tune the analog dreams.",
    art: "town",
    color: NEON.yellow,
  },
  {
    id: "mix",
    title: "MIX THINGS UP",
    blurb:
      "Layer square-waves, triangle bass and noise snares in the mixing minigame to cook your own track.",
    art: "cook",
    color: NEON.purple,
  },
];

/* ---------- Origin story ("Sometime in the near-future...") ---------- */
export const story = {
  kicker: "▸ INSERT STORY DISC",
  heading: "SOMETIME IN THE NEAR-FUTURE...",
  paragraphs: [
    "The world turned its volume down. Streaming algorithms flattened every song into the same grey hum, and the cities forgot how to make noise.",
    "Underground, five players found an abandoned arcade cabinet still wired to a busted amplifier. They pressed START. The machine asked for a coin — and a band.",
    "Now SSR SUPREMACY tours the surface, frying the silence one pixel-perfect riff at a time. They wield a synth, a frying-pan-shaped guitar, and a high score nobody has matched.",
  ],
  signature: "— synthesized in Neo-Kyoto by SSR SUPREMACY",
};

/* ============================================================================
 * Procedural creature sprites for the capsule-machine minigame ("Pixmon").
 * monsterSprite() draws a symmetric little creature with a face as an inline
 * SVG data-URI — deterministic per (seed,color), zero binary assets.
 * ========================================================================== */
export function monsterSprite(seed: number, color: string): string {
  const grid = 12;
  const half = grid / 2;
  let s = (seed * 2654435761) >>> 0 || 1;
  const rand = () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };

  // Blobby body: denser toward the vertical centre so it reads as a creature.
  const body: boolean[][] = Array.from({ length: grid }, () =>
    Array.from({ length: grid }, () => false),
  );
  for (let y = 1; y < grid - 1; y++) {
    const vertical = 1 - Math.abs(y - grid / 2) / (grid / 2); // 0..1 peak in middle
    for (let x = 0; x < half; x++) {
      const horizontal = 1 - x / half;
      const density = 0.35 + vertical * 0.4 + horizontal * 0.2;
      if (rand() < density) {
        body[y][x] = true;
        body[y][grid - 1 - x] = true;
      }
    }
  }
  // Little feet.
  body[grid - 1][3] = body[grid - 1][grid - 4] = true;

  let rects = "";
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      if (body[y][x]) rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
  }

  // Eyes (whites + dark pupils) at fixed symmetric positions for a friendly face.
  const eyeY = 4;
  const eyes =
    `<g fill="#ffffff">` +
    `<rect x="3" y="${eyeY}" width="2" height="2"/>` +
    `<rect x="7" y="${eyeY}" width="2" height="2"/></g>` +
    `<g fill="#06081c">` +
    `<rect x="4" y="${eyeY + 1}" width="1" height="1"/>` +
    `<rect x="7" y="${eyeY + 1}" width="1" height="1"/></g>`;

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${grid}" height="${grid}" shape-rendering="crispEdges">` +
    `<g fill="${color}">${rects}</g>${eyes}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export interface Pixmon {
  id: string;
  name: string;
  color: string;
  seed: number;
  rarity: "COMMON" | "RARE" | "EPIC";
}

/** The 5 collectible capsule monsters (Eastward's "collect 5 Pixballs"). */
export const pixmons: Pixmon[] = [
  { id: "blip", name: "BLIP", color: NEON.cyan, seed: 11, rarity: "COMMON" },
  { id: "fuzz", name: "FUZZ", color: NEON.pink, seed: 27, rarity: "COMMON" },
  { id: "watt", name: "WATT", color: NEON.yellow, seed: 39, rarity: "RARE" },
  { id: "moss", name: "MOSSLET", color: NEON.green, seed: 52, rarity: "RARE" },
  { id: "void", name: "VOID-9", color: NEON.purple, seed: 73, rarity: "EPIC" },
];

export const PIXMON_REWARD_KEY = "neonstatic:pixmon:collected";
