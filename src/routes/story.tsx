import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/band/Nav";
import { Story } from "@/components/band/Story";
import { Footer } from "@/components/band/Footer";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — SSR SUPREMACY" },
      {
        name: "description",
        content:
          "The origin story of SSR SUPREMACY. How five players found an arcade cabinet and started a band.",
      },
      { property: "og:title", content: "Our Story — SSR SUPREMACY" },
      {
        property: "og:description",
        content:
          "Underground origins. Pixel-perfect noise. The story behind the band.",
      },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Story />
      <Footer />
    </main>
  );
}
