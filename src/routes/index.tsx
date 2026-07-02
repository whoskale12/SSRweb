import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/band/Nav";
import { Hero } from "@/components/band/Hero";
import { Marquee } from "@/components/band/Marquee";
import { Members } from "@/components/band/Members";
import { Discography } from "@/components/band/Discography";
import { Footer } from "@/components/band/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEON STATIC — Indie Pixel Rock Band" },
      {
        name: "description",
        content:
          "Official site of NEON STATIC. Character select, discography, and pixel-perfect chaos.",
      },
      { property: "og:title", content: "NEON STATIC — Indie Pixel Rock Band" },
      {
        property: "og:description",
        content: "Pixel hearts, analog souls. New album out now.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Members />
      <Discography />
      <Footer />
    </main>
  );
}
