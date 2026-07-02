import { a as __toESM } from "../_runtime.mjs";
import { n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { g as story, p as pixelSprite, r as NEON } from "./band-assets-Pr38IaNp.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as Reveal, n as Footer, r as Nav } from "./Reveal-C-yKx68V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/story-CSspfwdu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var skyline = Array.from({ length: 22 }, (_, i) => {
	let s = i * 2654435761 >>> 0 || 1;
	s ^= s << 13;
	s >>>= 0;
	s ^= s >> 17;
	return {
		h: 20 + s % 70,
		w: 14 + s % 18
	};
});
var storyBuddy = pixelSprite(42, NEON.purple);
/**
* "Sometime in the near-future..." — Eastward's story beat, retold for the band.
* Two parallax layers (a scrolling neon skyline + drifting buddy) sit behind the
* narrative copy and shift as the section passes the viewport.
*/
function Story() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const skylineX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
	const buddyY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		id: "story",
		className: "relative overflow-hidden bg-ink px-4 py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: { x: skylineX },
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 opacity-40",
				"aria-hidden": true,
				children: skyline.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-[var(--neon-purple)]",
					style: {
						height: `${b.h}px`,
						width: `${b.w}px`,
						boxShadow: "0 0 8px var(--neon-purple)"
					}
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: storyBuddy,
				alt: "",
				"aria-hidden": true,
				style: { y: buddyY },
				className: "pixelated pointer-events-none absolute right-[8%] top-1/2 hidden h-24 w-24 md:block"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 inline-block border-2 border-neon-purple bg-card px-4 py-2 font-pixel text-[10px] tracking-wider text-neon-purple shadow-[3px_3px_0_0_var(--background)]",
						children: story.kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-foreground drop-shadow-[3px_3px_0_var(--neon-purple)] md:text-3xl",
						children: story.heading
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 space-y-6",
						children: story.paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .1 + i * .1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono-retro text-2xl leading-relaxed text-foreground/85",
								children: p
							})
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .5,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 font-pixel text-[10px] tracking-widest text-neon-cyan",
							children: story.signature
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-16 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/albums",
								className: "pixel-btn",
								style: {
									background: "var(--neon-cyan)",
									color: "var(--foreground)"
								},
								children: "▶ ALBUM STORIES"
							})
						})
					})
				]
			})
		]
	});
}
function StoryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { StoryPage as component };
