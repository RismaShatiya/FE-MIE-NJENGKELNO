export type OrderStatus = "DIPROSES" | "SIAP_DIAMBIL" | "SELESAI";

export type PaymentStatus = "MENUNGGU" | "LUNAS";

export interface OrderItem {
  id: number;
  nama_menu: string;
  level: number;
  jumlah: number;
  harga: number;
}

export interface Order {
  id: number;
  no_pesanan: string;
  pelanggan: string;
  tanggal: string;
  total: number;
  status: OrderStatus;
  pembayaran: PaymentStatus;
  items: OrderItem[];
}

export interface UpdateOrderPayload {
  status: OrderStatus;
  pembayaran: PaymentStatus;
}

export interface OrderResponse {
  data: Order[];
}