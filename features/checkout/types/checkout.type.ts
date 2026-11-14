
import type { CartItem } from "@/features/keranjang/types/cart.type";

export type { CartItem };

import { z } from "zod";

export const checkoutSchema = z.object({
  nama: z
    .string()
    .trim()
    .min(3, "Nama minimal 3 karakter."),

  noHp: z
    .string()
    .min(10, "Nomor HP minimal 10 digit.")
    .max(15, "Nomor HP maksimal 15 digit.")
    .regex(/^[0-9]+$/, "Nomor HP hanya boleh berisi angka."),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export interface CheckoutPayload {
  nama: string;
  noHp: string;
  metodePembayaran: "QRIS";

  items: {
    menuId: number;
    level: number;
    jumlah: number;
    catatan: string;
  }[];
}

export interface CheckoutResponse {
  nomorPesanan: string;
  total: number;
  qrisUrl?: string | null;
  message?: string;
}

export interface CheckoutState {
  items: CartItem[];
  subtotal: number;
  totalItem: number;
}
