import { c as albums, i as albumStories } from "./band-assets-Pr38IaNp.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as SectionHeading, i as Reveal, n as Footer, r as Nav } from "./Reveal-C-yKx68V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/albums-HJAiF3q8.js
var import_jsx_runtime = require_jsx_runtime();
var albumById = new Map(albums.map((a) => [a.id, a]));
/**
* "Album Stories" — a per-record storytelling page in the same 8-bit PS2 style
* as the rest of the site. Each album gets a CRT-framed cover, a logline, the
* story behind the record, and a short vignette per track. Layout alternates
* left/right on desktop and stacks cleanly on mobile.
*/
function AlbumStory() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "album",
		className: "relative bg-background px-4 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					kicker: "▸ INSERT STORY DISC",
					title: "ALBUM STORIES"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mb-16 max-w-2xl text-center font-mono-retro text-2xl leading-snug text-muted-foreground",
					children: "Every record is a level. Here's the lore behind each one — the late nights, the glitches, and the coins it took to keep going."
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-16 md:space-y-24",
					children: albumStories.map((story, i) => {
						const album = albumById.get(story.albumId);
						if (!album) return null;
						const flip = i % 2 === 1;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: flip ? "md:order-2" : "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "crt-overlay relative border-4 bg-ink p-3",
									style: {
										borderColor: story.color,
										boxShadow: `8px 8px 0 0 var(--background), 0 0 24px ${story.color}55`
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: album.cover,
										alt: album.title,
										loading: "lazy",
										className: "pixelated aspect-square w-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center justify-between font-pixel text-[9px] tracking-widest",
									style: { color: story.color },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: story.disc }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										album.year,
										" · ",
										album.tracks,
										" TRACK",
										album.tracks > 1 ? "S" : ""
									] })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: flip ? "md:order-1" : "",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl md:text-3xl",
										style: {
											color: story.color,
											textShadow: "3px 3px 0 var(--background)"
										},
										children: album.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-mono-retro text-2xl italic leading-snug text-foreground/85",
										children: story.logline
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 space-y-4",
										children: story.paragraphs.map((p, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono-retro text-xl leading-relaxed text-foreground/80",
											children: p
										}, j))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-6 space-y-3",
										children: story.tracks.map((t, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "scanlines border-l-4 bg-card/60 p-3 pl-4",
											style: { borderColor: story.color },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-pixel text-[9px] text-muted-foreground",
													children: String(k + 1).padStart(2, "0")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-pixel text-[10px] text-foreground",
													children: t.title
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 font-mono-retro text-lg leading-snug text-muted-foreground",
												children: t.note
											})]
										}, t.title))
									})
								]
							})]
						}) }, story.albumId);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/story",
						className: "pixel-btn",
						style: {
							background: "var(--neon-purple)",
							color: "var(--foreground)"
						},
						children: "▶ BAND ORIGIN STORY"
					})
				}) })
			]
		})
	});
}
function AlbumsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlbumStory, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { AlbumsPage as component };
