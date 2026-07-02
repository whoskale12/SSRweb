import { a as __toESM } from "../_runtime.mjs";
import { i as AnimatePresence, n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { c as albums, f as members, m as sfx, n as BAND_TAGLINE, p as pixelSprite, r as NEON, t as BAND_NAME, u as heroLayers } from "./band-assets-Pr38IaNp.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as SectionHeading, i as Reveal, n as Footer, r as Nav, t as AbxyCluster } from "./Reveal-C-yKx68V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ct9XYFn1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var charPositions = [
	{
		left: "4%",
		bottom: "8%",
		size: "20vh",
		sizeDesktop: "28vh",
		rotate: -6,
		delay: 0
	},
	{
		left: "23%",
		bottom: "2%",
		size: "24vh",
		sizeDesktop: "34vh",
		rotate: 3,
		delay: .12
	},
	{
		left: "42%",
		bottom: "5%",
		size: "22vh",
		sizeDesktop: "30vh",
		rotate: -2,
		delay: .24
	},
	{
		right: "22%",
		bottom: "3%",
		size: "24vh",
		sizeDesktop: "34vh",
		rotate: 4,
		delay: .36
	},
	{
		right: "3%",
		bottom: "9%",
		size: "20vh",
		sizeDesktop: "28vh",
		rotate: 6,
		delay: .48
	}
];
function Hero() {
	const ref = (0, import_react.useRef)(null);
	const [isDesktop, setIsDesktop] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const update = () => setIsDesktop(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
	const cityY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
	const groundY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
	const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative h-[100vh] min-h-[640px] w-full overflow-hidden bg-background paper-grain",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { y: titleY },
				className: "absolute inset-x-0 top-[18%] md:top-[18%] z-30 flex flex-col items-center justify-center px-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-[clamp(1.2rem,8vw,4.5rem)] leading-tight text-foreground drop-shadow-[2px_2px_0_var(--neon-pink)] md:drop-shadow-[4px_4px_0_var(--neon-pink)]",
					children: BAND_NAME
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-mono-retro text-xl tracking-[0.25em] text-neon-cyan md:text-2xl",
					children: BAND_TAGLINE
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .6
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					delay: .7,
					type: "spring"
				},
				className: "absolute right-5 top-[20%] z-30 hidden flex-col items-center gap-2 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbxyCluster, {
					size: 30,
					className: "animate-idle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-pixel text-[9px] text-neon-cyan",
					children: "Ⓐ PLAY"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .7,
					rotate: -20
				},
				animate: {
					opacity: 1,
					scale: 1,
					rotate: -8
				},
				transition: {
					delay: .6,
					type: "spring"
				},
				className: "absolute left-4 top-[22%] z-30 hidden w-44 md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pixel-card animate-wobble bg-card px-4 py-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-base text-primary",
							children: "NEW ALBUM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-pixel text-xs text-foreground",
							children: "OUT NOW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#music",
							className: "mt-1 inline-block font-mono-retro text-base text-primary underline",
							children: "▸ LISTEN"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 z-10 h-[62%] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: heroLayers.sky,
						alt: "",
						style: { y: skyY },
						className: "absolute inset-0 h-full w-full object-cover opacity-95"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: heroLayers.city,
						alt: "",
						style: { y: cityY },
						className: "pixelated absolute bottom-[14%] left-0 w-full object-contain opacity-95"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: heroLayers.ground,
						alt: "",
						style: { y: groundY },
						className: "pixelated absolute bottom-0 left-0 z-20 w-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(6,8,28,0.55),rgba(6,8,28,0.2)_40%,rgba(6,8,28,0.85))] mix-blend-multiply" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 z-20 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_3px)]" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-30",
				children: members.map((m, i) => {
					const pos = charPositions[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: m.activeImage,
						alt: m.name,
						className: "pixelated sticker absolute object-contain animate-idle",
						style: {
							left: pos.left,
							right: pos.right,
							bottom: pos.bottom,
							height: isDesktop ? pos.sizeDesktop : pos.size,
							["--tw-rotate"]: `${pos.rotate}deg`,
							transform: `rotate(${pos.rotate}deg)`,
							animationDelay: `${pos.delay}s`
						},
						initial: {
							opacity: 0,
							y: 80
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .4 + i * .12,
							duration: .55
						},
						loading: "eager"
					}, m.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "torn-bottom absolute -bottom-1 left-0 z-40 h-10 w-full bg-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-14 left-1/2 z-40 -translate-x-1/2 font-pixel text-xs text-foreground/70 animate-blink",
				children: "▼ scroll ▼"
			})
		]
	});
}
function Marquee() {
	const loop = "★ NEW ALBUM OUT NOW ★ READ THE ALBUM STORIES ★ LIMITED VINYL DROP ★ PRESS START ★ ".repeat(4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative bg-foreground py-3 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "torn-top absolute -top-1 left-0 h-4 w-full bg-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex whitespace-nowrap animate-marquee font-display text-2xl text-background",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-6",
					children: loop
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-6",
					children: loop
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "torn-bottom absolute -bottom-1 left-0 h-4 w-full bg-foreground" })
		]
	});
}
var buddySprite = pixelSprite(99, NEON.cyan);
function Members() {
	const [selected, setSelected] = (0, import_react.useState)(0);
	const active = members[selected];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "members",
		className: "relative bg-background px-4 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					kicker: "▸ PLAYER SELECT",
					title: "CHARACTER SELECT"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-5 gap-2 md:gap-4",
					children: members.map((m, i) => {
						const isActive = i === selected;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onMouseEnter: () => sfx.hover(),
							onClick: () => {
								sfx.select();
								setSelected(i);
							},
							"aria-pressed": isActive,
							"aria-label": `Select ${m.name}`,
							className: "group relative aspect-[3/4] overflow-hidden transition-transform duration-150 hover:-translate-y-1",
							style: {
								border: `4px solid ${isActive ? m.color : "var(--muted)"}`,
								boxShadow: isActive ? `4px 4px 0 0 var(--ink), 0 0 16px ${m.color}` : "4px 4px 0 0 var(--ink)",
								background: isActive ? `linear-gradient(180deg, ${m.color}33, transparent)` : "var(--card)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: isActive ? m.activeImage : m.idleImage,
									alt: m.name,
									loading: "lazy",
									className: `pixelated h-full w-full object-contain p-1 transition-all duration-200 ${isActive ? "animate-idle scale-105" : "opacity-50 grayscale group-hover:opacity-80 group-hover:grayscale-0"}`
								}),
								isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-1/2 top-1 -translate-x-1/2 font-pixel text-[10px]",
									style: { color: m.color },
									children: "▼"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute inset-x-0 bottom-0 bg-ink/80 py-1 text-center font-pixel text-[7px] text-cream md:text-[9px]",
									children: m.name
								})
							]
						}, m.id);
					})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "crt-overlay relative mt-8 border-4 bg-ink p-6 md:p-10",
						style: {
							borderColor: active.color,
							boxShadow: `8px 8px 0 0 var(--background), 0 0 24px ${active.color}55`
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: buddySprite,
							alt: "",
							"aria-hidden": true,
							className: "pixelated animate-idle pointer-events-none absolute -top-10 right-6 hidden h-16 w-16 md:block",
							style: { filter: `drop-shadow(0 0 8px ${NEON.cyan})` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									x: -16
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: 16
								},
								transition: {
									duration: .25,
									ease: "easeOut"
								},
								className: "grid gap-8 md:grid-cols-[1.1fr_1fr]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1 font-pixel text-[10px] tracking-widest",
										style: { color: active.color },
										children: [
											"PLAYER ",
											selected + 1,
											" / ",
											active.role
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl md:text-4xl",
										style: {
											color: active.color,
											textShadow: `3px 3px 0 var(--background)`
										},
										children: active.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 max-w-prose font-mono-retro text-xl leading-snug text-cream",
										children: active.bio
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "self-start",
									children: Object.entries(active.stats).map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-4 border-b border-cream/20 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "font-pixel text-[9px] uppercase tracking-wider text-cream/60",
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-right font-mono-retro text-xl text-cream",
											children: value
										})]
									}, label))
								})]
							}, active.id)
						})]
					})
				})
			]
		})
	});
}
function Discography() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "music",
		className: "relative bg-secondary px-4 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				kicker: "▸ TRACK LIST",
				title: "DISCOGRAPHY"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-4",
					children: albums.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `/album/${a.id}`,
						onMouseEnter: () => sfx.hover(),
						onClick: () => sfx.select(),
						className: "switch-tile group relative aspect-square overflow-hidden border-4 border-foreground",
						style: { boxShadow: "4px 4px 0 0 var(--foreground)" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: a.cover,
								alt: a.title,
								className: "pixelated h-full w-full object-cover transition-opacity group-hover:opacity-90",
								loading: "lazy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-0 left-0 right-0 p-3 text-center opacity-0 transition-opacity group-hover:opacity-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-pixel text-[10px] text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]",
									children: a.title
								})
							})
						]
					}, a.id))
				})
			}) })]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Members, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discography, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Home as component };
