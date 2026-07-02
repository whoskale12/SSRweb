import { c as albums } from "./band-assets-Pr38IaNp.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/album._albumId-C9uM5eKX.js
var $$splitComponentImporter = () => import("./album._albumId-BqR1yEpN.mjs");
var Route = createFileRoute("/album/$albumId")({
	head: ({ params }) => {
		const albumId = parseInt(params.albumId);
		const album = albums.find((a) => a.id === albumId);
		return { meta: [
			{ title: album ? `${album.title} — SSR SUPREMACY` : "Album — SSR SUPREMACY" },
			{
				name: "description",
				content: album ? `The story behind ${album.title}. ${album.year} · ${album.tracks} tracks.` : "Album story"
			},
			{
				property: "og:title",
				content: album ? `${album.title} — SSR SUPREMACY` : "Album — SSR SUPREMACY"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
