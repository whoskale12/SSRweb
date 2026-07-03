import { useState } from "react";
import { buildWhatsAppOrderUrl, formatIDR, getImageForColor, type MerchItem } from "@/lib/merch";
import { sfx } from "@/lib/sfx";
import { emitToast } from "@/lib/toast";

/**
 * One merch product with live size / color / qty selectors. The "Beli via
 * WhatsApp" button is a plain <a> whose href is rebuilt every render from the
 * current selection, so the order message stays perfectly in sync — no JS
 * needed to fire the redirect.
 */
export function MerchCard({
  item,
  onOpenSizeChart,
}: {
  item: MerchItem;
  onOpenSizeChart: () => void;
}) {
  const [size, setSize] = useState(item.sizes?.[0] ?? "");
  const [color, setColor] = useState(item.colors?.[0]?.name ?? "");
  const [qty, setQty] = useState(1);

  const waUrl = buildWhatsAppOrderUrl(item, {
    size: size || undefined,
    color: color || undefined,
    qty,
  });

  return (
    <div className="joycon-frame flex h-full flex-col p-4">
      {/* Product image */}
      <div className="relative mb-3 aspect-square overflow-hidden border-2 border-ink bg-secondary">
        <img
          key={color}
          src={getImageForColor(item, color)}
          alt={item.name}
          loading="lazy"
          className="pixelated h-full w-full object-cover transition-opacity duration-300"
        />
        <span className="absolute left-0 top-0 bg-ink px-2 py-1 font-pixel text-[8px] tracking-wider text-neon-yellow">
          {item.category}
        </span>
      </div>

      {/* Name + price */}
      <h3 className="font-display text-sm leading-tight text-foreground">
        {item.name}
      </h3>
      <p className="mt-1 font-mono-retro text-xl text-neon-cyan">
        {formatIDR(item.price)}
      </p>
      <p className="mt-1 font-mono-retro text-base leading-snug text-muted-foreground">
        {item.blurb}
      </p>

      {/* Size selector */}
      {item.sizes && item.sizes.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-pixel text-[9px] tracking-wider text-foreground">
              SIZE
            </span>
            {item.hasSizeChart && (
              <button
                type="button"
                onClick={onOpenSizeChart}
                className="font-pixel text-[8px] tracking-wider text-neon-cyan underline underline-offset-2 hover:text-neon-yellow"
              >
                SIZE CHART
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.sizes.map((s) => {
              const on = s === size;
              return (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => sfx.hover()}
                  onClick={() => {
                    sfx.select();
                    setSize(s);
                  }}
                  aria-pressed={on}
                  className="flex h-9 min-w-9 items-center justify-center px-2 font-pixel text-[9px]"
                  style={{
                    border: "2px solid",
                    borderColor: on ? "var(--neon-cyan)" : "var(--border)",
                    background: on ? "var(--neon-cyan)" : "transparent",
                    color: on ? "var(--ink)" : "var(--foreground)",
                    boxShadow: on ? "2px 2px 0 0 var(--ink)" : "none",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color selector */}
      {item.colors && item.colors.length > 0 && (
        <div className="mt-4">
          <span className="font-pixel text-[9px] tracking-wider text-foreground">
            WARNA: <span className="text-neon-yellow">{color}</span>
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.colors.map((c) => {
              const on = c.name === color;
              return (
                <button
                  key={c.name}
                  type="button"
                  onMouseEnter={() => sfx.hover()}
                  onClick={() => {
                    sfx.select();
                    setColor(c.name);
                  }}
                  aria-label={c.name}
                  aria-pressed={on}
                  title={c.name}
                  className="h-8 w-8"
                  style={{
                    background: c.hex,
                    border: "2px solid",
                    borderColor: on ? "var(--neon-cyan)" : "var(--border)",
                    boxShadow: on
                      ? "0 0 0 2px var(--cream), 2px 2px 0 0 var(--ink)"
                      : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity stepper */}
      <div className="mt-4">
        <span className="font-pixel text-[9px] tracking-wider text-foreground">
          QTY
        </span>
        <div className="mt-2 inline-flex items-center border-2 border-border">
          <button
            type="button"
            onClick={() => {
              sfx.hover();
              setQty((q) => Math.max(1, q - 1));
            }}
            aria-label="Kurangi jumlah"
            className="h-9 w-9 font-pixel text-sm text-foreground hover:bg-secondary"
          >
            −
          </button>
          <span
            aria-live="polite"
            className="w-10 text-center font-mono-retro text-xl text-foreground"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => {
              sfx.hover();
              setQty((q) => Math.min(99, q + 1));
            }}
            aria-label="Tambah jumlah"
            className="h-9 w-9 font-pixel text-sm text-foreground hover:bg-secondary"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal + WhatsApp buy */}
      <div className="mt-auto pt-5">
        <div className="mb-2 flex items-baseline justify-between font-mono-retro">
          <span className="text-base text-muted-foreground">Subtotal</span>
          <span className="text-xl text-foreground">
            {formatIDR(item.price * qty)}
          </span>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => sfx.hover()}
          onClick={() => {
            sfx.select();
            emitToast(
              `${item.name} — ${qty}x${size ? ` · ${size}` : ""}${color ? ` · ${color}` : ""} disiapkan. Lanjutkan di WhatsApp!`,
              { kicker: "ORDER", icon: "🛒" },
            );
          }}
          className="pixel-btn w-full !text-[0.62rem]"
          style={{
            background: "#25d366",
            color: "var(--ink)",
            borderColor: "var(--ink)",
          }}
        >
          BELI VIA WHATSAPP
        </a>
      </div>
    </div>
  );
}
