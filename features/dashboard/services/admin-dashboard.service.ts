
import { z } from "zod";
import { api } from "@/lib/axios";

const dashboardSchema = z.object({
  harian: z.object({
    totalPesanan: z.number(),
    transaksiSelesai: z.number(),
    pendapatan: z.number(),
    menungguVerifikasi: z.number(),
  }),
  trenMingguan: z.array(
    z.object({
      tanggal: z.string(),
      totalPenjualan: z.number(),
    }),
  ),
});

export type DashboardData = z.infer<typeof dashboardSchema>;

export const adminDashboardService = {
  async getSummary(): Promise<DashboardData> {
    const response = await api.get("/admin/dashboard");

    const result = response.data?.data ?? response.data;

    return dashboardSchema.parse(result);
  },
};
