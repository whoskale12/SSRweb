import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import galery1 from "@/assets/galery1.jpg";
import heroCity from "@/assets/hero-city.png";

/**
 * ======================================================================
 *  GANTI nomor di bawah ini dengan nomor WhatsApp tujuan order.
 *  Format: kode negara + nomor, TANPA "+", spasi, atau "0" di depan.
 *  Contoh Indonesia: 0812-3456-7890  ->  "6281234567890"
 * ======================================================================
 */
export const WHATSAPP_NUMBER = "62881010949870";

export interface MerchColor {
  name: string;
  hex: string;
}

export interface MerchItem {
  id: string;
  name: string;
  category: string;
  /** harga satuan dalam Rupiah */
  price: number;
  image: string;
  blurb: string;
  /** kosong = produk tanpa ukuran (mis. poster / vinyl) */
  sizes?: string[];
  /** kosong = produk tanpa pilihan warna */
  colors?: MerchColor[];
  /** tampilkan tombol "size chart" untuk produk apparel */
  hasSizeChart?: boolean;
}

export const merchItems: MerchItem[] = [
  {
    id: "tee-glitch",
    name: "Glitch Logo Tee",
    category: "T-SHIRT",
    price: 165000,
    image: album1,
    blurb: "Kaos cotton combed 24s, sablon plastisol logo glitch.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Putih", hex: "#fffde5" },
      { name: "Hitam", hex: "#06111f" },
      { name: "Navy", hex: "#0b1e33" },
    ],
    hasSizeChart: true,
  },
  {
    id: "hoodie-static",
    name: "Static Pullover Hoodie",
    category: "HOODIE",
    price: 320000,
    image: album2,
    blurb: "Hoodie fleece tebal, bordir dada kiri + print punggung.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Hitam", hex: "#06111f" },
      { name: "Cream", hex: "#fffde5" },
      { name: "Rust", hex: "#d9533b" },
    ],
    hasSizeChart: true,
  },
  {
    id: "cap-pixel",
    name: "Pixel Dad Cap",
    category: "HEADWEAR",
    price: 120000,
    image: galery1,
    blurb: "Topi baseball unstructured, bordir sprite 8-bit.",
    colors: [
      { name: "Navy", hex: "#0b1e33" },
      { name: "Mustard", hex: "#f2b950" },
    ],
  },
  {
    id: "vinyl-lp",
    name: 'Debut LP — Vinyl 12"',
    category: "VINYL",
    price: 450000,
    image: album3,
    blurb: "Piringan hitam warna teal, gatefold sleeve + poster.",
  },
  {
    id: "poster-tour",
    name: "Tour Poster A2",
    category: "POSTER",
    price: 85000,
    image: heroCity,
    blurb: "Poster art kota pixel, dicetak di art paper 210gsm.",
  },
];

export interface SizeRow {
  size: string;
  chestCm: number;
  lengthCm: number;
  sleeveCm: number;
}

/** Size chart apparel (kaos/hoodie), satuan cm. */
export const apparelSizeChart: SizeRow[] = [
  { size: "S", chestCm: 48, lengthCm: 68, sleeveCm: 20 },
  { size: "M", chestCm: 51, lengthCm: 71, sleeveCm: 21 },
  { size: "L", chestCm: 54, lengthCm: 74, sleeveCm: 22 },
  { size: "XL", chestCm: 57, lengthCm: 76, sleeveCm: 23 },
  { size: "XXL", chestCm: 60, lengthCm: 78, sleeveCm: 24 },
];

/** Rupiah dengan pemisah ribuan titik — tanpa Intl agar aman di Cloudflare Workers. */
export function formatIDR(value: number): string {
  return (
    "Rp" +
    Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

export interface OrderSelection {
  size?: string;
  color?: string;
  qty: number;
}

/**
 * Bangun deep-link WhatsApp berisi pesan order yang sudah terisi otomatis,
 * tersinkron dengan pilihan user (produk, size, warna, qty, subtotal).
 */
export function buildWhatsAppOrderUrl(
  item: MerchItem,
  sel: OrderSelection,
): string {
  const lines = [
    "Halo, saya tertarik untuk order merch SSR SUPREMACY:",
    "",
    `• Produk : ${item.name}`,
  ];
  if (sel.size) lines.push(`• Size   : ${sel.size}`);
  if (sel.color) lines.push(`• Warna  : ${sel.color}`);
  lines.push(`• Qty    : ${sel.qty}`);
  lines.push(`• Subtotal : ${formatIDR(item.price * sel.qty)}`);
  lines.push("", "Apakah masih tersedia?");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
