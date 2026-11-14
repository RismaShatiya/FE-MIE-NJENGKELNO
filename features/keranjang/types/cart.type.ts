import { CartItem, Menu } from "../../menu-kami/types/menu.type";

export type { CartItem };

export interface CartRecommendation {
  id: number;
  nama: string;
  foto: string | null;
  harga: number;
  kategori: string;
  alasan: string;
}

export interface CartState {
  items: CartItem[];
  recommendations: CartRecommendation[];
  subtotal: number;
  totalItem: number;
}