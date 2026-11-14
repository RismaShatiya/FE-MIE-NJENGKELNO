
export type MenuCategory = "Makanan" | "Minuman" | "Snack";

export type MenuStatus = "Tersedia" | "Habis";

export interface MenuLevelPrice {
  level: number;
  harga: number;
}

export interface Menu {
  id: number;
  nama: string;
  kategori: MenuCategory;
  deskripsi: string;
  status: MenuStatus;
  foto: string | null;
  levelHarga: MenuLevelPrice[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuPayload {
  nama: string;
  kategori: MenuCategory;
  deskripsi: string;
  status: MenuStatus;
  levelHarga: MenuLevelPrice[];
  foto?: File | null;
}

export interface MenuResponse {
  data: Menu[];
  message?: string;
}

export interface SingleMenuResponse {
  data: Menu;
  message?: string;
}

export interface ApiMessage {
  message: string;
}
