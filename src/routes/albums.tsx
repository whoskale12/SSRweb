import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/band/Nav";
import { AlbumStory } from "@/components/band/AlbumStory";
import { Footer } from "@/components/band/Footer";

export const Route = createFileRoute("/albums")({
  head: () => ({
    meta: [
      { title: "Album Stories — SSR SUPREMACY" },
      {
        name: "description",
        content:
          "The story behind every record. Late nights, glitches, and the coins it took to keep going.",
      },
      { property: "og:title", content: "Album Stories — SSR SUPREMACY" },
      {
        property: "og:description",
        content:
          "Every record is a level. Here's the lore behind each one.",
      },
    ],
  }),
  component: AlbumsPage,
});

function AlbumsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <AlbumStory />
      <Footer />
    </main>
  );
}