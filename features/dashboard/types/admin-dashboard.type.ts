
export type DashboardStats = {
  totalPesanan: number;
  transaksiSelesai: number;
  pendapatan: number;
  menungguVerifikasi: number;
};

export type WeeklySales = {
  tanggal: string;
  totalPenjualan: number;
};

export type AdminDashboardResponse = {
  harian: DashboardStats;
  trenMingguan: WeeklySales[];
};
