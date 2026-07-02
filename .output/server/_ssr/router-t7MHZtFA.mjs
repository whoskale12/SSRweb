import { a as __toESM } from "../_runtime.mjs";
import { l as bgm, m as sfx } from "./band-assets-Pr38IaNp.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$5 } from "./album._albumId-C9uM5eKX.mjs";
import { n as onToast } from "./toast-msgtu51x.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-t7MHZtFA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DpTCFd0c.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
/**
* Switch-style system notification host. Mounted once at the root; renders a
* top-right stack of matte-grey toasts that auto-dismiss. Fire one anywhere
* with emitToast().
*/
function SystemToast() {
	const [toasts, setToasts] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		return onToast((t) => {
			sfx.toast();
			setToasts((cur) => [...cur, t]);
			window.setTimeout(() => {
				setToasts((cur) => cur.filter((x) => x.id !== t.id));
			}, 3400);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed right-4 top-16 z-[10000] flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-2",
		children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "status",
			className: "matte-panel animate-toast pointer-events-auto flex items-start gap-3 p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "text-lg leading-none",
				children: t.icon ?? "◉"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-pixel text-[8px] tracking-widest text-joycon-blue",
				children: t.kicker ?? "SYSTEM"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-mono-retro text-base leading-snug text-matte-fg",
				children: t.message
			})] })]
		}, t.id))
	});
}
/**
* Client-only bootstrap: restores audio preferences and arms the autoplay-safe
* first-gesture starter for background music. Renders nothing.
*/
function AudioBoot() {
	(0, import_react.useEffect)(() => {
		bgm.init();
		sfx.init();
	}, []);
	return null;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioBoot, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemToast, {})
		]
	});
}
var $$splitComponentImporter$3 = () => import("./story-CSspfwdu.mjs");
var Route$3 = createFileRoute("/story")({
	head: () => ({ meta: [
		{ title: "Our Story — SSR SUPREMACY" },
		{
			name: "description",
			content: "The origin story of SSR SUPREMACY. How five players found an arcade cabinet and started a band."
		},
		{
			property: "og:title",
			content: "Our Story — SSR SUPREMACY"
		},
		{
			property: "og:description",
			content: "Underground origins. Pixel-perfect noise. The story behind the band."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./merch-Bhd-F7OX.mjs");
var Route$2 = createFileRoute("/merch")({
	head: () => ({ meta: [
		{ title: "Merch Catalog — SSR SUPREMACY" },
		{
			name: "description",
			content: "Katalog merch resmi SSR SUPREMACY. Pilih size, warna, & qty lalu order langsung via WhatsApp."
		},
		{
			property: "og:title",
			content: "Merch Catalog — SSR SUPREMACY"
		},
		{
			property: "og:description",
			content: "Tee, hoodie, cap, vinyl & poster. Order langsung via WhatsApp."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./albums-HJAiF3q8.mjs");
var Route$1 = createFileRoute("/albums")({
	head: () => ({ meta: [
		{ title: "Album Stories — SSR SUPREMACY" },
		{
			name: "description",
			content: "The story behind every record. Late nights, glitches, and the coins it took to keep going."
		},
		{
			property: "og:title",
			content: "Album Stories — SSR SUPREMACY"
		},
		{
			property: "og:description",
			content: "Every record is a level. Here's the lore behind each one."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-Ct9XYFn1.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "NEON STATIC — Indie Pixel Rock Band" },
		{
			name: "description",
			content: "Official site of NEON STATIC. Character select, discography, and pixel-perfect chaos."
		},
		{
			property: "og:title",
			content: "NEON STATIC — Indie Pixel Rock Band"
		},
		{
			property: "og:description",
			content: "Pixel hearts, analog souls. New album out now."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var StoryRoute = Route$3.update({
	id: "/story",
	path: "/story",
	getParentRoute: () => Route$4
});
var MerchRoute = Route$2.update({
	id: "/merch",
	path: "/merch",
	getParentRoute: () => Route$4
});
var AlbumsRoute = Route$1.update({
	id: "/albums",
	path: "/albums",
	getParentRoute: () => Route$4
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	AlbumsRoute,
	MerchRoute,
	StoryRoute,
	AlbumAlbumIdRoute: Route$5.update({
		id: "/album/$albumId",
		path: "/album/$albumId",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
