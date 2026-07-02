import { c as albums, i as albumStories } from "./band-assets-Pr38IaNp.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./album._albumId-C9uM5eKX.mjs";
import { i as Reveal, n as Footer, r as Nav } from "./Reveal-C-yKx68V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/album._albumId-BqR1yEpN.js
var import_jsx_runtime = require_jsx_runtime();
function AlbumDetailPage() {
	const { albumId } = Route.useParams();
	const id = parseInt(albumId);
	const album = albums.find((a) => a.id === id);
	const story = albumStories.find((s) => s.albumId === id);
	if (!album || !story) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-[60vh] items-center justify-center px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl text-foreground md:text-5xl",
							children: "ALBUM NOT FOUND"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-mono-retro text-xl text-muted-foreground",
							children: "The album you're looking for doesn't exist in our discography."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							className: "pixel-btn mt-8 inline-block",
							style: {
								background: "var(--neon-cyan)",
								color: "var(--foreground)"
							},
							children: "▶ BACK TO HOME"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative bg-background px-4 py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-5xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 flex items-center gap-2 font-pixel text-[9px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/",
									className: "hover:text-neon-cyan transition-colors",
									children: "HOME"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "▸" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/#music",
									className: "hover:text-neon-cyan transition-colors",
									children: "DISCOGRAPHY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "▸" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: album.title
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 inline-block border-2 bg-card px-4 py-2 font-pixel text-[10px] tracking-wider shadow-[3px_3px_0_0_var(--background)]",
							style: {
								borderColor: story.color,
								color: story.color
							},
							children: [story.disc, " ▸ INSERT STORY DISC"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "crt-overlay relative border-4 bg-ink p-3",
								style: {
									borderColor: story.color,
									boxShadow: `8px 8px 0 0 var(--background), 0 0 24px ${story.color}55`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: album.cover,
									alt: album.title,
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
									album.tracks > 1 ? "S" : "",
									" · ",
									album.length
								] })]
							})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl md:text-4xl",
									style: {
										color: story.color,
										textShadow: "3px 3px 0 var(--background)"
									},
									children: album.title
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: .1,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 font-mono-retro text-2xl italic leading-snug text-foreground/85",
										children: story.logline
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 space-y-4",
									children: story.paragraphs.map((p, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
										delay: .2 + j * .1,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono-retro text-xl leading-relaxed text-foreground/80",
											children: p
										})
									}, j))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
									delay: .5,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mb-4 font-pixel text-[11px] tracking-wider text-foreground",
											children: "TRACK STORIES"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-3",
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
										})]
									})
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-16 flex flex-wrap items-center justify-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/",
										className: "pixel-btn",
										style: {
											background: "var(--neon-cyan)",
											color: "var(--foreground)"
										},
										children: "▶ BACK TO HOME"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/albums",
										className: "pixel-btn",
										style: {
											background: "var(--neon-purple)",
											color: "var(--foreground)"
										},
										children: "▶ ALL ALBUMS"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/story",
										className: "pixel-btn",
										style: {
											background: "var(--neon-pink)",
											color: "var(--foreground)"
										},
										children: "▶ BAND STORY"
									})
								]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { AlbumDetailPage as component };
