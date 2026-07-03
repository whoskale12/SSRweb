import kaosputih from "@/assets/kaosputih.png";
import kaoshitam from "@/assets/kaoshitam.png";
import keychain from "@/assets/keychain.png";
import album2 from "@/assets/album-2.jpg";

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
  /** gambar spesifik per warna - key adalah nama warna */
  colorImages?: { [colorName: string]: string };
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
    id: "tshirt-now-i-see",
    name: "T-Shirt NOW I SEE YOU NO I DON'T",
    category: "T-SHIRT",
    price: 165000,
    image: kaoshitam,
    colorImages: {
      Hitam: kaoshitam,
      Putih: kaosputih,
    },
    blurb: "Kaos cotton combed 24s, sablon plastisol design eksklusif.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Hitam", hex: "#06111f" },
      { name: "Putih", hex: "#fffde5" },
    ],
    hasSizeChart: true,
  },
  {
    id: "keychain-ssr",
    name: "SSR Keychain",
    category: "ACCESSORY",
    price: 45000,
    image: keychain,
    blurb: "Gantungan kunci akrilik dengan design logo SSR.",
  },
  {
    id: "cassette-tape",
    name: "SSR Cassette Tape",
    category: "MUSIC",
    price: 85000,
    image: album2,
    colorImages: {
      Hitam: album2,
      Putih: album2,
    },
    blurb: "Kaset tape limited edition dengan tracklist lengkap album SSR.",
    colors: [
      { name: "Hitam", hex: "#06111f" },
      { name: "Putih", hex: "#fffde5" },
    ],
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

/**
 * Helper function untuk mendapatkan image berdasarkan warna yang dipilih
 */
export function getImageForColor(item: MerchItem, colorName?: string): string {
  if (!colorName || !item.colorImages) {
    return item.image;
  }
  return item.colorImages[colorName] || item.image;
}