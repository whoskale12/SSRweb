import { a as __toESM } from "../_runtime.mjs";
import { a as album_1_default, d as hero_city_default, m as sfx, o as album_2_default, s as album_3_default } from "./band-assets-Pr38IaNp.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as SectionHeading, i as Reveal, n as Footer, r as Nav } from "./Reveal-C-yKx68V.mjs";
import { t as emitToast } from "./toast-msgtu51x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/merch-Bhd-F7OX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var galery1_default = "/assets/galery1-BRBt75WL.jpg";
/**
* ======================================================================
*  GANTI nomor di bawah ini dengan nomor WhatsApp tujuan order.
*  Format: kode negara + nomor, TANPA "+", spasi, atau "0" di depan.
*  Contoh Indonesia: 0812-3456-7890  ->  "6281234567890"
* ======================================================================
*/
var WHATSAPP_NUMBER = "6281234567890";
var merchItems = [
	{
		id: "tee-glitch",
		name: "Glitch Logo Tee",
		category: "T-SHIRT",
		price: 165e3,
		image: album_1_default,
		blurb: "Kaos cotton combed 24s, sablon plastisol logo glitch.",
		sizes: [
			"S",
			"M",
			"L",
			"XL",
			"XXL"
		],
		colors: [
			{
				name: "Putih",
				hex: "#fffde5"
			},
			{
				name: "Hitam",
				hex: "#06111f"
			},
			{
				name: "Navy",
				hex: "#0b1e33"
			}
		],
		hasSizeChart: true
	},
	{
		id: "hoodie-static",
		name: "Static Pullover Hoodie",
		category: "HOODIE",
		price: 32e4,
		image: album_2_default,
		blurb: "Hoodie fleece tebal, bordir dada kiri + print punggung.",
		sizes: [
			"M",
			"L",
			"XL",
			"XXL"
		],
		colors: [
			{
				name: "Hitam",
				hex: "#06111f"
			},
			{
				name: "Cream",
				hex: "#fffde5"
			},
			{
				name: "Rust",
				hex: "#d9533b"
			}
		],
		hasSizeChart: true
	},
	{
		id: "cap-pixel",
		name: "Pixel Dad Cap",
		category: "HEADWEAR",
		price: 12e4,
		image: galery1_default,
		blurb: "Topi baseball unstructured, bordir sprite 8-bit.",
		colors: [{
			name: "Navy",
			hex: "#0b1e33"
		}, {
			name: "Mustard",
			hex: "#f2b950"
		}]
	},
	{
		id: "vinyl-lp",
		name: "Debut LP — Vinyl 12\"",
		category: "VINYL",
		price: 45e4,
		image: album_3_default,
		blurb: "Piringan hitam warna teal, gatefold sleeve + poster."
	},
	{
		id: "poster-tour",
		name: "Tour Poster A2",
		category: "POSTER",
		price: 85e3,
		image: hero_city_default,
		blurb: "Poster art kota pixel, dicetak di art paper 210gsm."
	}
];
/** Size chart apparel (kaos/hoodie), satuan cm. */
var apparelSizeChart = [
	{
		size: "S",
		chestCm: 48,
		lengthCm: 68,
		sleeveCm: 20
	},
	{
		size: "M",
		chestCm: 51,
		lengthCm: 71,
		sleeveCm: 21
	},
	{
		size: "L",
		chestCm: 54,
		lengthCm: 74,
		sleeveCm: 22
	},
	{
		size: "XL",
		chestCm: 57,
		lengthCm: 76,
		sleeveCm: 23
	},
	{
		size: "XXL",
		chestCm: 60,
		lengthCm: 78,
		sleeveCm: 24
	}
];
/** Rupiah dengan pemisah ribuan titik — tanpa Intl agar aman di Cloudflare Workers. */
function formatIDR(value) {
	return "Rp" + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
/**
* Bangun deep-link WhatsApp berisi pesan order yang sudah terisi otomatis,
* tersinkron dengan pilihan user (produk, size, warna, qty, subtotal).
*/
function buildWhatsAppOrderUrl(item, sel) {
	const lines = [
		"Halo, saya tertarik untuk order merch SSR SUPREMACY:",
		"",
		`• Produk : ${item.name}`
	];
	if (sel.size) lines.push(`• Size   : ${sel.size}`);
	if (sel.color) lines.push(`• Warna  : ${sel.color}`);
	lines.push(`• Qty    : ${sel.qty}`);
	lines.push(`• Subtotal : ${formatIDR(item.price * sel.qty)}`);
	lines.push("", "Apakah masih tersedia?");
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
/**
* One merch product with live size / color / qty selectors. The "Beli via
* WhatsApp" button is a plain <a> whose href is rebuilt every render from the
* current selection, so the order message stays perfectly in sync — no JS
* needed to fire the redirect.
*/
function MerchCard({ item, onOpenSizeChart }) {
	const [size, setSize] = (0, import_react.useState)(item.sizes?.[0] ?? "");
	const [color, setColor] = (0, import_react.useState)(item.colors?.[0]?.name ?? "");
	const [qty, setQty] = (0, import_react.useState)(1);
	const waUrl = buildWhatsAppOrderUrl(item, {
		size: size || void 0,
		color: color || void 0,
		qty
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "joycon-frame flex h-full flex-col p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-3 aspect-square overflow-hidden border-2 border-ink bg-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.image,
					alt: item.name,
					loading: "lazy",
					className: "pixelated h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-0 top-0 bg-ink px-2 py-1 font-pixel text-[8px] tracking-wider text-neon-yellow",
					children: item.category
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-sm leading-tight text-foreground",
				children: item.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono-retro text-xl text-neon-cyan",
				children: formatIDR(item.price)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono-retro text-base leading-snug text-muted-foreground",
				children: item.blurb
			}),
			item.sizes && item.sizes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-[9px] tracking-wider text-foreground",
						children: "SIZE"
					}), item.hasSizeChart && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onOpenSizeChart,
						className: "font-pixel text-[8px] tracking-wider text-neon-cyan underline underline-offset-2 hover:text-neon-yellow",
						children: "SIZE CHART"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: item.sizes.map((s) => {
						const on = s === size;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onMouseEnter: () => sfx.hover(),
							onClick: () => {
								sfx.select();
								setSize(s);
							},
							"aria-pressed": on,
							className: "flex h-9 min-w-9 items-center justify-center px-2 font-pixel text-[9px]",
							style: {
								border: "2px solid",
								borderColor: on ? "var(--neon-cyan)" : "var(--border)",
								background: on ? "var(--neon-cyan)" : "transparent",
								color: on ? "var(--ink)" : "var(--foreground)",
								boxShadow: on ? "2px 2px 0 0 var(--ink)" : "none"
							},
							children: s
						}, s);
					})
				})]
			}),
			item.colors && item.colors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-pixel text-[9px] tracking-wider text-foreground",
					children: ["WARNA: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-neon-yellow",
						children: color
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: item.colors.map((c) => {
						const on = c.name === color;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onMouseEnter: () => sfx.hover(),
							onClick: () => {
								sfx.select();
								setColor(c.name);
							},
							"aria-label": c.name,
							"aria-pressed": on,
							title: c.name,
							className: "h-8 w-8",
							style: {
								background: c.hex,
								border: "2px solid",
								borderColor: on ? "var(--neon-cyan)" : "var(--border)",
								boxShadow: on ? "0 0 0 2px var(--cream), 2px 2px 0 0 var(--ink)" : "none"
							}
						}, c.name);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-pixel text-[9px] tracking-wider text-foreground",
					children: "QTY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 inline-flex items-center border-2 border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								sfx.hover();
								setQty((q) => Math.max(1, q - 1));
							},
							"aria-label": "Kurangi jumlah",
							className: "h-9 w-9 font-pixel text-sm text-foreground hover:bg-secondary",
							children: "−"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-live": "polite",
							className: "w-10 text-center font-mono-retro text-xl text-foreground",
							children: qty
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								sfx.hover();
								setQty((q) => Math.min(99, q + 1));
							},
							"aria-label": "Tambah jumlah",
							className: "h-9 w-9 font-pixel text-sm text-foreground hover:bg-secondary",
							children: "+"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-baseline justify-between font-mono-retro",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base text-muted-foreground",
						children: "Subtotal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl text-foreground",
						children: formatIDR(item.price * qty)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: waUrl,
					target: "_blank",
					rel: "noreferrer",
					onMouseEnter: () => sfx.hover(),
					onClick: () => {
						sfx.select();
						emitToast(`${item.name} — ${qty}x${size ? ` · ${size}` : ""}${color ? ` · ${color}` : ""} disiapkan. Lanjutkan di WhatsApp!`, {
							kicker: "ORDER",
							icon: "🛒"
						});
					},
					className: "pixel-btn w-full !text-[0.62rem]",
					style: {
						background: "#25d366",
						color: "var(--ink)",
						borderColor: "var(--ink)"
					},
					children: "BELI VIA WHATSAPP"
				})]
			})
		]
	});
}
function Merch() {
	const [chartOpen, setChartOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "merch",
		className: "relative bg-background px-4 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					kicker: "▸ ITEM SHOP",
					title: "MERCH CATALOG"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mx-auto mb-12 max-w-xl text-center font-mono-retro text-lg leading-snug text-muted-foreground",
					children: [
						"Pilih size, warna, & jumlah — lalu klik",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-neon-green",
							children: "BELI VIA WHATSAPP"
						}),
						". Pesananmu otomatis terisi di chat, tinggal tekan kirim tanpa perlu ketik manual."
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: merchItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i % 3 * .08,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MerchCard, {
							item,
							onOpenSizeChart: () => setChartOpen(true)
						})
					}, item.id))
				})
			]
		}), chartOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeChartModal, { onClose: () => setChartOpen(false) })]
	});
}
function SizeChartModal({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Size chart apparel",
		onClick: onClose,
		className: "fixed inset-0 z-[9999] flex items-center justify-center bg-ink/85 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "pixel-card w-full max-w-md bg-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-foreground",
						children: "SIZE CHART"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Tutup size chart",
						className: "font-pixel text-sm text-neon-pink hover:text-neon-yellow",
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 font-mono-retro text-base text-muted-foreground",
					children: "Ukuran flat, satuan cm · toleransi ±1–2 cm."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse font-mono-retro",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b-2 border-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-left font-pixel text-[9px] text-neon-cyan",
								children: "SIZE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right font-pixel text-[9px] text-neon-cyan",
								children: "DADA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right font-pixel text-[9px] text-neon-cyan",
								children: "PANJANG"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right font-pixel text-[9px] text-neon-cyan",
								children: "LENGAN"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: apparelSizeChart.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-pixel text-[10px] text-neon-yellow",
								children: r.size
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right text-lg text-foreground",
								children: r.chestCm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right text-lg text-foreground",
								children: r.lengthCm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right text-lg text-foreground",
								children: r.sleeveCm
							})
						]
					}, r.size)) })]
				})
			]
		})
	});
}
function MerchPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Merch, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { MerchPage as component };
