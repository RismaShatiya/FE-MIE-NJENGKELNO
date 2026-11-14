
export type KategoriMenu = "Makanan" | "Minuman" | "Snack";

export type StatusMenu = "Tersedia" | "Habis";

export interface MenuLevelPrice {
  level: number;
  harga: number;
}

export interface Menu {
  id: number;
  nama: string;
  kategori: KategoriMenu;
  deskripsi: string;
  status: StatusMenu;
  foto: string | null;
  levelHarga: MenuLevelPrice[];
  createdAt?: string;
  updatedAt?: string;
}

export type KategoriFilter = "Semua" | KategoriMenu;

export interface CartItem {
  id: number;
  nama: string;
  harga: number;
  foto: string;
  level: number;
  jumlah: number;
  catatan?: string;
}