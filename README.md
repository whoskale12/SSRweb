# SSR SUPREMACY

> NOW I SEE YOU, NOW I DON'T

A retro-inspired, pixel-perfect band website for SSR SUPREMACY. Built with modern web technologies and a nostalgic aesthetic inspired by Eastward and classic arcade games.

![Band Website](https://img.shields.io/badge/Status-Live-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-18-blue)

## 🎮 About

SSR SUPREMACY is a 5-member band that blends R&B, rock, and electronic music with a distinctive retro-arcade aesthetic. This website serves as the band's digital headquarters, featuring:

- **Interactive Band Members** - Meet all 5 players with pixel-art sprites and character stats
- **Album Discography** - Explore our releases with detailed "Story Disc" lore
- **Live Tour Dates** - Never miss a show
- **Merch Store** - Official band merchandise
- **Origin Story** - Discover how the band formed in a near-future neon dystopia

## 🛠️ Tech Stack

### Core
- **[React 18](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TanStack Router](https://tanstack.com/router)** - File-based routing with SSR
- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework
- **[Nitro](https://nitro.unjs.io/)** - Server-side rendering & deployment

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide Icons](https://lucide.dev/)** - Icon system

### Developer Experience
- **[Vite](https://vitejs.dev/)** - Lightning-fast dev server & build tool
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime & package manager
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 📦 Installation

### Prerequisites
- **Bun** (recommended) or **Node.js 18+**
- Git

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/whoskale12/SSRweb.git
cd SSRweb

# Install dependencies with Bun (recommended)
bun install

# Or with npm
npm install
```

## 🚀 Development

```bash
# Start development server (with HMR)
bun run dev

# Or with npm
npm run dev
```

The site will be available at `http://localhost:3000`

## 🏗️ Build & Deploy

```bash
# Build for production
bun run build

# Preview production build
bun run start

# Or with npm
npm run build
npm run start
```

### Deployment Targets
The project is configured for deployment on:
- **Cloudflare Pages** (primary)
- **Vercel**
- **Netlify**
- Any Node.js hosting

## 📁 Project Structure

```
SSRweb/
├── src/
│   ├── assets/           # Images, fonts, and static assets
│   │   ├── hero-*.png    # Hero section parallax layers
│   │   ├── member-*.png  # Band member sprites
│   │   └── album-*.jpg   # Album covers
│   ├── components/
│   │   ├── band/         # Band-specific components
│   │   │   ├── Hero.tsx
│   │   │   ├── Members.tsx
│   │   │   ├── Discography.tsx
│   │   │   ├── Story.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/           # Reusable UI components (shadcn)
│   ├── lib/
│   │   ├── band-assets.ts   # Band data, members, albums
│   │   ├── utils.ts         # Utility functions
│   │   └── toast.ts         # Toast notifications
│   ├── routes/              # File-based routes
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Home page
│   │   ├── albums.tsx       # Album listing
│   │   ├── album.$albumId.tsx  # Album details
│   │   ├── story.tsx        # Band story
│   │   └── merch.tsx        # Merchandise
│   ├── styles.css           # Global styles & Tailwind
│   ├── router.tsx           # Router configuration
│   └── server.ts            # Server entry point
├── public/                  # Static public assets
├── .output/                 # Build output (Nitro)
└── package.json
```

## 🎨 Features

### Retro-Arcade Aesthetic
- **Pixel-Perfect Sprites** - Procedurally generated character avatars
- **CRT Effects** - Scanlines, glow, and vintage monitor styling
- **8-bit UI** - Custom pixel fonts and interface elements
- **Neon Color Palette** - Eastward-inspired color system

### Interactive Elements
- **Parallax Scrolling** - Multi-layer hero with depth
- **Hover Animations** - Band members react to interaction
- **Interactive Album Covers** - 3D transformations on hover
- **Sound Effects** - Chiptune audio feedback (optional)

### Performance
- **Server-Side Rendering** - Fast initial page loads
- **Code Splitting** - Optimized bundle sizes
- **Image Optimization** - Lazy loading and responsive images
- **Zero CLS** - Stable layout without content shifts

## 🎵 Band Members

| Name | Role | Instrument | Bio |
|------|------|------------|-----|
| **JAY** | Vocals | Mic | Player 1. Screams in 8-bit, drinks coffee in 16-bit |
| **Kale** | Bass | Bass Guitar | A cheerful soul with a quiet side, obsessed with cats |
| **MOSS** | Bass | Bass Guitar | Player 3. Holds the low end together with duct tape and pure vibes |
| **Ari** | Drums | Drums | Player 4. Fastest fingers on the cabinet |
| **Dafa** | Synth | Synth/Keys | Player 5. Speaks fluent square-wave and dreams in chiptune |

## 📀 Discography

1. **No Better Self** (2026) - 2 tracks, 04:38
2. **DreamCreeper** (2026) - 2 tracks, 03:00
3. **The Untold Stories** (2025) - 1 track, 02:58

## 🔧 Configuration

### Environment Variables
Create a `.env` file for any API keys or secrets:

```env
# Example (currently none required)
# VITE_API_URL=https://api.example.com
```

### Tailwind Colors
The project uses a custom Eastward-inspired color palette defined in `tailwind.config.js`:

```javascript
colors: {
  'neon-pink': '#d9533b',
  'neon-cyan': '#5ab3c2',
  'neon-green': '#8aa85f',
  'neon-yellow': '#f2b950',
  'neon-purple': '#9c7594'
}
```

## 🤝 Contributing

This is a private band website. For bug reports or suggestions:
1. Contact the band via WhatsApp: [+62 881010949870](https://wa.me/62881010949870)
2. Instagram: [@ssrsupremacy_](https://www.instagram.com/ssrsupremacy_)

## 📞 Contact

- **WhatsApp**: +62 881010949870
- **Instagram**: [@ssrsupremacy_](https://www.instagram.com/ssrsupremacy_)
- **Bandcamp**: [Simple Fun Records](https://simplefunrecords.bandcamp.com/album/now-i-see-you-now-i-dont)

## 📄 License

© 2026 SSR SUPREMACY. All rights reserved.

---

**Built with ❤️ and 🎮 by SSR SUPREMACY**

*Now I see you, now I don't.*