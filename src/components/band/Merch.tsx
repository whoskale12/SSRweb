import { useState } from "react";
import { merchItems, apparelSizeChart } from "@/lib/merch";
import { MerchCard } from "./MerchCard";
import { Reveal, SectionHeading } from "./Reveal";

export function Merch() {
  const [chartOpen, setChartOpen] = useState(false);

  return (
    <section id="merch" className="relative bg-background px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading kicker="▸ ITEM SHOP" title="MERCH CATALOG" />
        </Reveal>

        <Reveal>
          <p className="mx-auto mb-12 max-w-xl text-center font-mono-retro text-lg leading-snug text-muted-foreground">
            Pilih size, warna, & jumlah — lalu klik{" "}
            <span className="text-neon-green">BELI VIA WHATSAPP</span>.
            Pesananmu otomatis terisi di chat, tinggal tekan kirim tanpa perlu
            ketik manual.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {merchItems.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.08}>
              <MerchCard
                item={item}
                onOpenSizeChart={() => setChartOpen(true)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {chartOpen && <SizeChartModal onClose={() => setChartOpen(false)} />}
    </section>
  );
}

function SizeChartModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Size chart apparel"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/85 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pixel-card w-full max-w-md bg-card p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base text-foreground">SIZE CHART</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup size chart"
            className="font-pixel text-sm text-neon-pink hover:text-neon-yellow"
          >
            ✕
          </button>
        </div>

        <p className="mb-4 font-mono-retro text-base text-muted-foreground">
          Ukuran flat, satuan cm · toleransi ±1–2 cm.
        </p>

        <table className="w-full border-collapse font-mono-retro">
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="py-2 text-left font-pixel text-[9px] text-neon-cyan">
                SIZE
              </th>
              <th className="py-2 text-right font-pixel text-[9px] text-neon-cyan">
                DADA
              </th>
              <th className="py-2 text-right font-pixel text-[9px] text-neon-cyan">
                PANJANG
              </th>
              <th className="py-2 text-right font-pixel text-[9px] text-neon-cyan">
                LENGAN
              </th>
            </tr>
          </thead>
          <tbody>
            {apparelSizeChart.map((r) => (
              <tr key={r.size} className="border-b border-border">
                <td className="py-2 font-pixel text-[10px] text-neon-yellow">
                  {r.size}
                </td>
                <td className="py-2 text-right text-lg text-foreground">
                  {r.chestCm}
                </td>
                <td className="py-2 text-right text-lg text-foreground">
                  {r.lengthCm}
                </td>
                <td className="py-2 text-right text-lg text-foreground">
                  {r.sleeveCm}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
