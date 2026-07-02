import { a as __toESM } from "../_runtime.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
import { h as socials, l as bgm, m as sfx, t as BAND_NAME } from "./band-assets-Pr38IaNp.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Reveal-C-yKx68V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BUTTONS = [
	{
		label: "X",
		color: "var(--joycon-blue)",
		area: "1 / 2 / 2 / 3"
	},
	{
		label: "Y",
		color: "var(--neon-yellow)",
		area: "2 / 1 / 3 / 2"
	},
	{
		label: "A",
		color: "var(--joycon-red)",
		area: "2 / 3 / 3 / 4"
	},
	{
		label: "B",
		color: "var(--neon-green)",
		area: "3 / 2 / 4 / 3"
	}
];
function AbxyCluster({ size = 28, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `grid ${className}`,
		style: {
			gridTemplateColumns: `repeat(3, ${size}px)`,
			gridTemplateRows: `repeat(3, ${size}px)`,
			gap: 2
		},
		"aria-hidden": true,
		children: BUTTONS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex items-center justify-center font-pixel select-none",
			style: {
				gridArea: b.area,
				fontSize: size * .42,
				color: "var(--ink)",
				background: b.color,
				border: "2px solid var(--ink)",
				borderRadius: "50%",
				boxShadow: "2px 2px 0 0 var(--ink)",
				lineHeight: 1
			},
			children: b.label
		}, b.label))
	});
}
/**
* A tiny Switch "home" pill — the circular home button flanked by the two
* Joy-Con neon bars. Great as a nav marker or footer stamp.
*/
function SwitchHomeBadge({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-1 ${className}`,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-6 w-2",
				style: {
					background: "var(--joycon-red)",
					border: "2px solid var(--ink)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-8 w-8 items-center justify-center",
				style: {
					background: "var(--card)",
					border: "2px solid var(--ink)",
					borderRadius: "50%",
					boxShadow: "2px 2px 0 0 var(--ink)",
					color: "var(--cream)",
					fontSize: 14
				},
				children: "⌂"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-6 w-2",
				style: {
					background: "var(--joycon-blue)",
					border: "2px solid var(--ink)"
				}
			})
		]
	});
}
/**
* Matte-grey Nintendo-Switch-style toggle switch. Grey track when off, Joy-Con
* blue when on, with a sliding knob. Plays a select blip on change.
*/
function Toggle({ checked, onChange, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		onMouseEnter: () => sfx.hover(),
		onClick: () => {
			sfx.select();
			onChange(!checked);
		},
		className: "flex w-full items-center justify-between gap-4 rounded-[var(--radius-switch)] px-3 py-2 text-left transition-colors hover:bg-matte-700",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-pixel text-[10px] tracking-wider text-matte-fg",
			children: label
		}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block font-mono-retro text-sm text-matte-fg/60",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
			style: {
				background: checked ? "var(--joycon-blue)" : "var(--matte-600)",
				borderColor: checked ? "var(--joycon-blue)" : "var(--matte-600)",
				boxShadow: checked ? "0 0 10px rgba(90,179,194,0.6)" : "none"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-0.5 h-4 w-4 rounded-full bg-matte-fg transition-all",
				style: { left: checked ? "1.5rem" : "0.15rem" }
			})
		})]
	});
}
/**
* Sleek matte icon button for modern chrome (sound / settings). Rounded, subtle
* blue glow on hover, with a soft cursor tick.
*/
function IconButton({ children, active, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onMouseEnter: () => sfx.hover(),
		...rest,
		className: "flex h-9 w-9 items-center justify-center rounded-[var(--radius-switch)] border text-base transition-all hover:-translate-y-0.5",
		style: {
			background: "var(--matte-700)",
			color: active ? "var(--joycon-blue)" : "var(--matte-fg)",
			borderColor: active ? "var(--joycon-blue)" : "var(--matte-600)",
			boxShadow: active ? "0 0 12px rgba(90,179,194,0.5)" : "none"
		},
		children
	});
}
var CRT_KEY = "ssr:crt";
function applyCrt(on) {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("crt-off", !on);
}
/**
* Switch-style "System Settings" — a matte-grey popover launched from a gear
* icon, housing sliding toggles for music, UI sound FX and CRT scanlines.
*/
function SettingsMenu() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [bgmOn, setBgmOn] = (0, import_react.useState)(false);
	const [sfxOn, setSfxOn] = (0, import_react.useState)(false);
	const [crtOn, setCrtOn] = (0, import_react.useState)(true);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			setBgmOn(bgm.enabled);
			setSfxOn(sfx.enabled);
		};
		sync();
		const unsubBgm = bgm.subscribe(sync);
		const unsubSfx = sfx.subscribe(sync);
		const crtPref = typeof window !== "undefined" ? window.localStorage.getItem(CRT_KEY) !== "off" : true;
		setCrtOn(crtPref);
		applyCrt(crtPref);
		return () => {
			unsubBgm();
			unsubSfx();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") {
				sfx.back();
				setOpen(false);
			}
		};
		window.addEventListener("mousedown", onDown);
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("mousedown", onDown);
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
			"aria-label": "System settings",
			"aria-expanded": open,
			active: open,
			onClick: () => {
				sfx.select();
				setOpen((o) => !o);
			},
			children: "⚙"
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-label": "System settings",
			className: "matte-panel animate-toast absolute right-0 top-11 z-[100] w-64 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[9px] tracking-widest text-matte-fg/70",
						children: "SYSTEM SETTINGS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[8px] text-joycon-blue",
						children: "◉"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					label: "BACKGROUND MUSIC",
					hint: "Chiptune loop",
					checked: bgmOn,
					onChange: (v) => bgm.setEnabled(v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					label: "UI SOUND FX",
					hint: "Hover & select blips",
					checked: sfxOn,
					onChange: (v) => sfx.setEnabled(v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					label: "CRT SCANLINES",
					hint: "Retro screen overlay",
					checked: crtOn,
					onChange: (v) => {
						setCrtOn(v);
						applyCrt(v);
						if (typeof window !== "undefined") window.localStorage.setItem(CRT_KEY, v ? "on" : "off");
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 border-t border-matte-600 px-1 pt-2 font-mono-retro text-sm text-matte-fg/50",
					children: [
						"Press ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-joycon-blue",
							children: "Esc"
						}),
						" to close"
					]
				})
			]
		})]
	});
}
var links = [
	{
		href: "/#members",
		label: "PLAYERS",
		icon: "👾"
	},
	{
		href: "/#music",
		label: "MUSIC",
		icon: "♪"
	},
	{
		href: "/albums",
		label: "ALBUMS",
		icon: "💿"
	},
	{
		href: "/merch",
		label: "MERCH",
		icon: "🎽"
	},
	{
		href: "/story",
		label: "STORY",
		icon: "✦"
	}
];
function NavLink({ href, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		onMouseEnter: () => sfx.hover(),
		onClick: () => sfx.select(),
		className: "group relative font-pixel text-[10px] tracking-wider text-matte-fg/80 transition-colors hover:text-matte-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-neon-yellow opacity-0 transition-opacity group-hover:opacity-100",
				children: ["▶", " "]
			}),
			label,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-joycon-blue shadow-[0_0_8px_var(--joycon-blue)] transition-all duration-150 group-hover:w-full group-focus-visible:w-full" })
		]
	});
}
function Nav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [sfxOn, setSfxOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sync = () => setSfxOn(sfx.enabled);
		sync();
		return sfx.subscribe(sync);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "sticky top-0 z-50 w-full border-b border-joycon-blue/40 bg-matte-800/95 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					onClick: () => sfx.select(),
					className: "font-display text-sm text-cream drop-shadow-[2px_2px_0_var(--neon-pink)] md:text-lg",
					children: BAND_NAME
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-7 md:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						href: l.href,
						label: l.label
					}) }, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchHomeBadge, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							"aria-label": sfxOn ? "Mute UI sound" : "Enable UI sound",
							active: sfxOn,
							onClick: () => {
								sfx.toggle();
							},
							children: sfxOn ? "🔊" : "🔈"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsMenu, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								"aria-label": "Open menu",
								"aria-expanded": open,
								onClick: () => {
									sfx.select();
									setOpen(true);
								},
								children: "☰"
							})
						})
					]
				})
			]
		})
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeMenuOverlay, { onClose: () => {
		sfx.back();
		setOpen(false);
	} })] });
}
function HomeMenuOverlay({ onClose }) {
	const tileRefs = (0, import_react.useRef)([]);
	const [active, setActive] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		tileRefs.current[0]?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") {
				onClose();
				return;
			}
			const cols = 2;
			const n = links.length;
			let next = active;
			if (e.key === "ArrowRight") next = (active + 1) % n;
			else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
			else if (e.key === "ArrowDown") next = Math.min(active + cols, n - 1);
			else if (e.key === "ArrowUp") next = Math.max(active - cols, 0);
			else return;
			e.preventDefault();
			setActive(next);
			tileRefs.current[next]?.focus();
			sfx.hover();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Menu",
		className: "fixed inset-0 z-[9999] flex flex-col bg-matte-900/97 backdrop-blur-sm md:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-pixel text-[10px] tracking-widest text-matte-fg/60",
					children: "HOME MENU"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					"aria-label": "Close menu",
					onClick: onClose,
					children: "✕"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid flex-1 grid-cols-2 content-center gap-4 px-6 pb-24",
				children: links.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: l.href,
					ref: (el) => {
						tileRefs.current[i] = el;
					},
					onMouseEnter: () => sfx.hover(),
					onFocus: () => setActive(i),
					onClick: () => sfx.select(),
					className: "switch-nav-tile group aspect-square flex-col gap-2 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "text-4xl",
							children: l.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-pixel text-[10px] tracking-wider",
							children: l.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "press-cue font-mono-retro text-sm text-joycon-blue",
							children: "Ⓐ SELECT"
						})
					]
				}, l.href))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-6 border-t border-matte-600 bg-matte-800/90 py-3 font-mono-retro text-sm text-matte-fg/70",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-joycon-blue",
						children: "Ⓐ"
					}), " Select"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-joycon-red",
						children: "Ⓑ"
					}), " Back"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "✛ Move"
					})
				]
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative bg-secondary px-4 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl border-t-4 border-foreground pt-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 md:grid-cols-[1fr_auto] md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-pixel text-2xl text-foreground drop-shadow-[3px_3px_0_var(--neon-pink)]",
					children: BAND_NAME
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono-retro mt-2 text-xl text-muted-foreground",
					children: "© 2026 · ALL RIGHTS RESERVED"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-wrap gap-3",
					children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "pixel-btn",
						style: {
							background: "var(--neon-purple)",
							color: "var(--foreground)"
						},
						children: s.name
					}) }, s.name))
				})]
			})
		})
	});
}
function Reveal({ children, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 30
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .5,
			delay,
			ease: "easeOut"
		},
		children
	});
}
function SectionHeading({ kicker, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-14 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 inline-block border-2 border-neon-cyan bg-card px-4 py-2 font-pixel text-[10px] tracking-[0.2em] text-neon-cyan shadow-[3px_3px_0_0_var(--ink)]",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl uppercase tracking-[0.04em] text-cream [text-shadow:3px_3px_0_var(--neon-pink),6px_6px_0_var(--ink)] md:text-4xl",
			children: title
		})]
	});
}
//#endregion
export { SectionHeading as a, Reveal as i, Footer as n, Nav as r, AbxyCluster as t };
