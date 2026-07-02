import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/band/Nav";
import { Merch } from "@/components/band/Merch";
import { Footer } from "@/components/band/Footer";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [
      { title: "Merch Catalog — SSR SUPREMACY" },
      {
        name: "description",
        content:
          "Katalog merch resmi SSR SUPREMACY. Pilih size, warna, & qty lalu order langsung via WhatsApp.",
      },
      { property: "og:title", content: "Merch Catalog — SSR SUPREMACY" },
      {
        property: "og:description",
        content:
          "Tee, hoodie, cap, vinyl & poster. Order langsung via WhatsApp.",
      },
    ],
  }),
  component: MerchPage,
});

function MerchPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Merch />
      <Footer />
    </main>
  );
}
